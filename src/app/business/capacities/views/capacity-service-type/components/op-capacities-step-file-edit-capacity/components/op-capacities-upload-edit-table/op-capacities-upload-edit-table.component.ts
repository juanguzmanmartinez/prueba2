import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { EventEmitter } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../store/upload-capacities-store.service';
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
  selector: 'app-op-capacities-upload-edit-table',
  templateUrl: './op-capacities-upload-edit-table.component.html',
  styleUrls: ['./op-capacities-upload-edit-table.component.sass'],
})
export class OpCapacitiesUploadEditTableComponent implements OnInit {
  @ViewChild('inputAmpm') inputAmpm;
  @Input() fromParent: Observable<void>;
  @Input() data;
  @Input() type;
  @Input() message: string = 'Edita capacidades';
  @Input() onlyOne = false;
  private subscriptions = new Subscription();
  dataSource: any = [];
  ampm = [];
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  elementToEdit;
  datos;
  showData: any = [];
  selection = new SelectionModel(true, []);
  disabledBtn = true;
  dataStorage: any = [];
  disabledSave: any = {};
  private fixedSelectedRows: any[] = [];
  expressValue: number = 0;
  // fg: FormGroup;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _storageClientService: StorageClientService // private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.fg = this._formBuilder.group({
    //   capacity: [0],
    // });
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          if (element.express.length > 0) {
            this.expressValue = element.express[0].capacity;
          }
        }
      );
    this.dataSource = this.data;
    const subscription1 = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription1);
    const parentEvent = this.fromParent.subscribe(() => {
      this.setElementToEdit();
    });
    this.subscriptions.add(parentEvent);
    this.dataStorage =
      this._storageClientService.getStorageCrypto('data-source');
    this._uploadCapacitiesStoreService.getDiableEdit$.subscribe(
      (res) => (this.disabledSave = res)
    );
  }

  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.id
    );
    this.showData = orderIdsSelected;

    this.dataSource.forEach((orderTable) => {
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
      : this.dataSource.forEach((row) => {
          this.showData = [];
          this.selection.select(row);
        });
  }

  selectRoiw(row) {
    this.selection.toggle(row);
  }

  changeAmpm(e, row) {
    this.dataSource = this.dataSource.map((item) => {
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
  }
  changeExpress(e) {
    this.dataSource[0].capacity = this.expressValue;
  }
  setManyAmpm() {
    this.dataSource.map((item) => {
      this.showData.map((pla) => {
        if (pla == item.id) {
          return (item.capacity = this.inputAmpm.inputValue);
        }
      });
    });
    this.selection.clear();
  }
  selectRow() {}
  setElementToEdit() {
    this.elementToEdit[DATA_TYPES[this.type].type] = this.dataSource;
    this.elementToEdit[DATA_TYPES[this.type].capacity] =
      this.getTotalCapacityAmpm;
    !isNaN(this.getTotalCapacityAmpm)
      ? (this.elementToEdit.status = false)
      : null;
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    const target = this.dataStorage.findIndex((obj) => {
      return obj.local === this.elementToEdit.local;
    });
    if (target !== -1) this.dataStorage[target] = this.elementToEdit;

    this._uploadCapacitiesStoreService.setDataSource(this.dataStorage);
    this._storageClientService.setStorageCrypto(
      'data-source',
      this.dataStorage
    );

    this.subscriptions.add(subscription);
  }
  get getTotalCapacityAmpm() {
    this.disabledSave[this.type] =
      this.dataSource.reduce((a, { capacity }) => a + capacity, 0) > 99999
        ? true
        : false;
    this._uploadCapacitiesStoreService.setDiableEdit(this.disabledSave);

    return this.dataSource.reduce((a, { capacity }) => a + capacity, 0);
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
  get getType() {
    return DATA_TYPES[this.type].service;
  }
}
