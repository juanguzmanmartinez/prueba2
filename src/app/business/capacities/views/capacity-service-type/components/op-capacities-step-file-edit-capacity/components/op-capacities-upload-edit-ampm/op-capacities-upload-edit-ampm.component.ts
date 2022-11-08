import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../store/upload-capacities-store.service';
import { OpCapacitiesStepFileEditFormService } from '../../form/op-capacities-step-file-edit-form.service';

const DATA_TYPES = {
  ampm: { type: 'ampm', capacity: 'ampmTotalCapacity', service: 'AM/PM' },
  ret: { type: 'ret', capacity: 'retTotalCapacity', service: 'RET' },
  scheduled: {
    type: 'scheduled',
    capacity: 'scheTotalCapacity',
    service: 'programado',
  },
  express: {
    type: 'express',
    capacity: 'expTotalCapacity',
    service: 'express',
  },
};
@Component({
  selector: 'app-op-capacities-upload-edit-ampm',
  templateUrl: './op-capacities-upload-edit-ampm.component.html',
  styleUrls: ['./op-capacities-upload-edit-ampm.component.sass'],
})
export class OpCapacitiesUploadEditAmpmComponent implements OnInit {
  @ViewChild('inputAmpm') inputAmpm;
  @Input() fromParent: Observable<void>;
  @Input() form: FormGroup;
  @Input() type;
  @Input() message: string = 'Edita capacidades';
  @Input() onlyOne = false;
  private subscriptions = new Subscription();

  ampm = [];
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  elementToEdit;
  datos;
  showData: any = [];
  selection = new SelectionModel<FormGroup>(true, []);
  disabledBtn = true;
  private fixedSelectedRows: any[] = [];
  capacityTableSelection = new SelectionModel<FormGroup>(true, []);
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    public _opCapacitiesStepFileEditForm: OpCapacitiesStepFileEditFormService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.ampm = element.ampm;
          this._opCapacitiesStepFileEditForm.ampmList.clear();
          this.ampm.forEach((item) => {
            const capacitySegmentListGroup =
              this._opCapacitiesStepFileEditForm.ampmListGroup;

            this._opCapacitiesStepFileEditForm
              .ampmIdByGroup(capacitySegmentListGroup)
              .setValue(item.id);
            this._opCapacitiesStepFileEditForm
              .ampmSegmentByGroup(capacitySegmentListGroup)
              .setValue(item.segment);
            this._opCapacitiesStepFileEditForm
              .ampmCapacityByGroup(capacitySegmentListGroup)
              .setValue(item.capacity);

            this._opCapacitiesStepFileEditForm.ampmList.push(
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
    this.ampm.forEach((orderTable) => {
      if (!orderIdsSelected.includes(orderTable.id)) {
        allSelected = false;
        return;
      }
    });

    return allSelected;
  }

  masterToggle(data?): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.ampm.forEach((row) => {
          this.showData = [];
          this.selection.select(row);
        });
  }

  selectRoiw(row) {
    this.selection.toggle(row);
  }

  changeAmpm(e, row) {
    this.ampm = this.ampm.map((item) => {
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
  setManyAmpm() {
    this.selection.selected.forEach((row: any) => {
      this._opCapacitiesStepFileEditForm.ampmList.controls.forEach((item) => {
        if (row.id == item.value.id) {
          item.setValue({
            ...item.value,
            capacity: this.inputAmpm.inputValue,
          });
        }
      });
    });
    this.selection.clear();

    // this.setElementToEdit();
  }
  selectRow() {}
  setElementToEdit() {
    this.elementToEdit.ampm = this.ampm;
    this.elementToEdit.ampmTotalCapacity = this.getTotalCapacityAmpm;
    !isNaN(this.getTotalCapacityAmpm)
      ? (this.elementToEdit.status = false)
      : null;
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    this.subscriptions.add(subscription);
  }
  get getTotalCapacityAmpm() {
    return this.ampm.reduce((a, { capacity }) => a + capacity, 0);
  }
  changeInput(e) {
    if (this.inputAmpm.inputValue) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }
  get statusButtonAplly(): boolean {
    let validate =
      this.fixedSelectedRows.length > 0 && this.inputAmpm.inputValue;
    return !validate;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get totalCapacity() {
    return this._opCapacitiesStepFileEditForm.ampmList.controls
      .map((formGroup: FormGroup) => {
        return this._opCapacitiesStepFileEditForm.ampmCapacityByGroup(
          formGroup
        );
      })
      .reduce((acc, value: any) => acc + value.value, 0);
  }
  get getType() {
    return DATA_TYPES[this.type].service;
  }
}
