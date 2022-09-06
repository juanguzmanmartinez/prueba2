import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-edit-capacity',
  templateUrl: './op-capacities-step-file-edit-capacity.component.html',
  styleUrls: ['./op-capacities-step-file-edit-capacity.component.scss'],
})
export class OpCapacitiesStepFileEditCapacityComponent
  implements OnInit, OnDestroy
{
  @ViewChild('inputAmpm') inputAmpm;
  private subscriptions = new Subscription();

  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router
  ) {}
  dataSource = {
    code: 'AF8',
    local: 'LOS OLIVOS',
    ampm: [
      {
        segment: '08:00 am - 02:00 pm',
        capacity: 6,
      },
      {
        segment: '02:00 pm - 08:00 pm',
        capacity: 10,
      },
      {
        segment: '08:00 pm - 08:30 pm',
        capacity: 2,
      },
    ],
    scheduled: [
      {
        segment: '08:00 am - 11:00 am',
        capacity: 1,
      },
      {
        segment: '02:00 pm - 05:00 pm',
        capacity: 3,
      },
      {
        segment: '05:00 pm - 08:00 pm',
        capacity: 4,
      },
      {
        segment: '08:00 pm - 11:00 pm',
        capacity: 5,
      },
    ],
    express: [
      {
        segment: '-',
        capacity: 1,
      },
    ],
    ret: [
      {
        segment: '08:00 am - 11:00 am',
        capacity: 23,
      },
      {
        segment: '11:00 am - 02:00 pm',
        capacity: 2,
      },
      {
        segment: '02:00 pm - 05:00 pm',
        capacity: 5,
      },
      {
        segment: '05:00 pm - 08:00 pm',
        capacity: 0,
      },
    ],
    ampmTotalCapacity: 18,
    expTotalCapacity: 1,
    scheTotalCapacity: 13,
    retTotalCapacity: 30,
  };
  ampm = [
    { id: 0, segment: '08:00 am - 02:00 pm', capacity: 6 },
    { id: 1, segment: '02:00 pm - 08:00 pm', capacity: 10 },
    { id: 2, segment: '08:00 pm - 08:30 pm', capacity: 2 },
  ];
  ret = [
    { id: 0, segment: '08:00 am - 11:00 am', capacity: 23 },
    { id: 1, segment: '11:00 am - 02:00 pm', capacity: 2 },
    { id: 2, segment: '02:00 pm - 05:00 pm', capacity: 5 },
    { id: 3, segment: '05:00 pm - 08:00 pm', capacity: 0 },
  ];
  scheduled = [
    { id: 0, segment: '08:00 am - 11:00 am', capacity: 1 },
    { id: 1, segment: '02:00 pm - 05:00 pm', capacity: 3 },
    { id: 2, segment: '05:00 pm - 08:00 pm', capacity: 4 },
    { id: 3, segment: '08:00 pm - 11:00 pm', capacity: 5 },
  ];
  express = [
    {
      segment: '-',
      capacity: 1,
    },
  ];

  mostrar: any = [];
  selection = new SelectionModel(true, []);

  private fixedSelectedRows: any[] = [];

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          console.log('elementen', element);

          // this.dataSource = element;
          // this.ampm = element.ampm;
          // this.ret = element.ret;
          // this.scheduled = element.scheduled;
        }
      );
    this.subscriptions.add(subscription);

    const subscription1 = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription1);
  }

  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.id
    );
    this.mostrar = orderIdsSelected;
    this.ampm.forEach((orderTable) => {
      if (!orderIdsSelected.includes(orderTable.id)) {
        allSelected = false;
        return;
      }
    });

    return allSelected;
  }

  masterToggle(data): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.ampm.forEach((row) => {
          this.mostrar = [];
          this.selection.select(row);
        });
    this.isAllSelected() ? console.log('si') : console.log('no');
  }

  selectRoiw(row) {
    console.log('row', row);
    this.selection.toggle(row);
  }

  changeAmpm(e, row) {
    this.ampm = this.ampm.map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          capacity:
            e.target.value != undefined && e.target.value != ''
              ? e.target.value
              : 0,
        };
      } else {
        return item;
      }
    });
  }
  setManyAmpm() {
    console.log('input', this.inputAmpm.inputValue);

    this.ampm.map((item) => {
      this.mostrar.map((pla) => {
        if (pla == item.id) {
          console.log('iguales');

          return (item.capacity = this.inputAmpm.inputValue);
        }
      });
    });
  }

  nextStep(e) {
    this.dataSource = { ...this.dataSource, ampm: this.ampm };
    const subscription =
      this._uploadCapacitiesStoreService.getDataSource$.subscribe((element) => {
        console.log('elementen', element);

        element.map((item) => this.dataSource.code === item.code);
        // this.dataSource = element;
        // this.ampm = element.ampm;
        // this.ret = element.ret;
        // this.scheduled = element.scheduled;
      });
    this.subscriptions.add(subscription);
    // this._uploadCapacitiesStoreService.setCurrentStep('3');
  }
  cancelStep(e) {}

  get getTotalCapacityAmpm() {
    return this.ampm.reduce((a, { capacity }) => a + capacity, 0);
  }

  get getTitle() {
    return `${this.dataSource.code} - ${this.dataSource.local}: Editar capacidad`;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
