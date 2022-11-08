import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../store/upload-capacities-store.service';
import { OpCapacitiesStepFileEditFormService } from '../../form/op-capacities-step-file-edit-form.service';

@Component({
  selector: 'app-op-capacities-upload-edit-express',
  templateUrl: './op-capacities-upload-edit-express.component.html',
  styleUrls: ['./op-capacities-upload-edit-express.component.sass'],
})
export class OpCapacitiesUploadEditExpressComponent implements OnInit {
  expressValue: number = 0;
  @ViewChild('inputExpress') inputExpress;
  @Input() fromParent: Observable<void>;
  @Input() onlyOne = false;
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
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    public _opCapacitiesStepFileEditForm: OpCapacitiesStepFileEditFormService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.express = element.express;
          this._opCapacitiesStepFileEditForm.expressList.clear();
          this.express.forEach((item) => {
            const capacitySegmentListGroup =
              this._opCapacitiesStepFileEditForm.expressListGroup;

            this._opCapacitiesStepFileEditForm
              .expressIdByGroup(capacitySegmentListGroup)
              .setValue(item.id);
            this._opCapacitiesStepFileEditForm
              .expressSegmentByGroup(capacitySegmentListGroup)
              .setValue(item.segment);
            this._opCapacitiesStepFileEditForm
              .expressCapacityByGroup(capacitySegmentListGroup)
              .setValue(item.capacity);

            this._opCapacitiesStepFileEditForm.expressList.push(
              capacitySegmentListGroup
            );
          });
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

  // changeExpress(e, row) {
  // this.express = this.express.map((item) => {
  //   if (item.id === row.id) {
  //     return {
  //       ...item,
  //       capacity:
  //         e.target.value != undefined && e.target.value != ''
  //           ? Number(e.target.value)
  //           : 0,
  //     };
  //   } else {
  //     return item;
  //   }
  // });
  // this.setElementToEdit();
  // }
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
  changeExpress(e) {
    // this.express[0].capacity = this.expressValue;
  }
}
