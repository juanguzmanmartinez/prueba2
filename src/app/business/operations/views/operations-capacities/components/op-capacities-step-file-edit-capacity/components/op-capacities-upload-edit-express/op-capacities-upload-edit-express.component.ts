import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-upload-edit-express',
  templateUrl: './op-capacities-upload-edit-express.component.html',
  styleUrls: ['./op-capacities-upload-edit-express.component.sass'],
})
export class OpCapacitiesUploadEditExpressComponent implements OnInit {
  @ViewChild('inputExpress') inputExpress;
  @Input() fromParent: Observable<void>;
  private subscriptions = new Subscription();

  express = [];
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
          this.express = element.express;
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
    this.express.forEach((orderTable) => {
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
      : this.express.forEach((row) => {
          this.showData = [];
          this.selection.select(row);
        });
  }

  selectRoiw(row) {
    this.selection.toggle(row);
  }

  changeExpress(e, row) {
    this.express = this.express.map((item) => {
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
  setManyExpress() {
    this.express.map((item) => {
      this.showData.map((pla) => {
        if (pla == item.id) {
          return (item.capacity = this.inputExpress.inputValue);
        }
      });
    });
    // this.setElementToEdit();
  }

  setElementToEdit() {
    this.elementToEdit.express = this.express;
    this.elementToEdit.expTotalCapacity = this.getTotalCapacityAmpm;
    !isNaN(this.getTotalCapacityAmpm)
      ? (this.elementToEdit.status = false)
      : null;
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    this.subscriptions.add(subscription);
  }
  get getTotalCapacityAmpm() {
    return this.express.reduce((a, { capacity }) => a + capacity, 0);
  }
  changeInput(e) {
    if (this.inputExpress.inputValue) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
