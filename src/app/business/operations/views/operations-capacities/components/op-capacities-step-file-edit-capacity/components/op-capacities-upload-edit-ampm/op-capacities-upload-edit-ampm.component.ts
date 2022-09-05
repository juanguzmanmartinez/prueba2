import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-upload-edit-ampm',
  templateUrl: './op-capacities-upload-edit-ampm.component.html',
  styleUrls: ['./op-capacities-upload-edit-ampm.component.sass'],
})
export class OpCapacitiesUploadEditAmpmComponent implements OnInit {
  @ViewChild('inputAmpm') inputAmpm;
  private subscriptions = new Subscription();

  ampm = [
    { id: 0, segment: '08:00 am - 02:00 pm', capacity: 6 },
    { id: 1, segment: '02:00 pm - 08:00 pm', capacity: 10 },
    { id: 2, segment: '08:00 pm - 08:30 pm', capacity: 2 },
  ];
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];

  mostrar: any = [];
  selection = new SelectionModel(true, []);

  private fixedSelectedRows: any[] = [];

  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

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

  get getTotalCapacityAmpm() {
    return this.ampm.reduce((a, { capacity }) => a + capacity, 0);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
