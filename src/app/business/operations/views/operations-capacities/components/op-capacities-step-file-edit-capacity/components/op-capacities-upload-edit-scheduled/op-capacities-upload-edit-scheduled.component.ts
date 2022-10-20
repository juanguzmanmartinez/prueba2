import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-upload-edit-scheduled',
  templateUrl: './op-capacities-upload-edit-scheduled.component.html',
  styleUrls: ['./op-capacities-upload-edit-scheduled.component.sass'],
})
export class OpCapacitiesUploadEditScheduledComponent implements OnInit {
  @ViewChild('inputScheduled') inputScheduled;
  @Input() fromParent: Observable<void>;
  private subscriptions = new Subscription();

  scheduled = [];
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  elementToEdit;
  datos;
  showData: any = [];
  selection = new SelectionModel(true, []);
  disabledBtn = true;
  private fixedSelectedRows: any[] = [];

  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.scheduled = element.scheduled;
          // this.ret = element.ret;
          // this.scheduled = element.scheduled;
        }
      );
    this.subscriptions.add(subscription);
    const subscription1 = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription1);

    const parentEvent = this.fromParent.subscribe(() =>
      this.setElementToEdit()
    );
    this.subscriptions.add(parentEvent);
  }

  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.id
    );
    this.showData = orderIdsSelected;
    this.scheduled.forEach((orderTable) => {
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
      : this.scheduled.forEach((row) => {
          this.showData = [];
          this.selection.select(row);
        });
  }

  selectRoiw(row) {
    this.selection.toggle(row);
  }

  changeScheduled(e, row) {
    this.scheduled = this.scheduled.map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          capacity:
            e.target.value != undefined && e.target.value != ''
              ? Number(e.target.value)
              : 0,
        };
      } else {
        return item;
      }
    });
    // this.setElementToEdit();
  }
  setManyScheduled() {
    this.scheduled.map((item) => {
      this.showData.map((pla) => {
        if (pla == item.id) {
          return (item.capacity = this.inputScheduled.inputValue);
        }
      });
    });
    // this.setElementToEdit();
  }

  setElementToEdit() {
    this.elementToEdit.scheduled = this.scheduled;
    this.elementToEdit.scheTotalCapacity = this.getTotalCapacityAmpm;
    !isNaN(this.getTotalCapacityAmpm)
      ? (this.elementToEdit.status = false)
      : null;
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    this.subscriptions.add(subscription);
  }
  get getTotalCapacityAmpm() {
    return this.scheduled.reduce((a, { capacity }) => a + capacity, 0);
  }
  changeInput(e) {
    if (this.inputScheduled.inputValue) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
