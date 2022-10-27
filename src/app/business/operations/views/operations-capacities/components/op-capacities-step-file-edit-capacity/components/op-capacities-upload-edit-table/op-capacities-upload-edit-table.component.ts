import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { Observable, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../stores/upload-capacities-store.service';
const DATA_TYPES = {
  ampm: { type: 'ampm', capacity: 'ampmTotalCapacity' },
  ret: { type: 'ret', capacity: 'retTotalCapacity' },
  scheduled: { type: 'scheduled', capacity: 'scheTotalCapacity' },
  express: { type: 'express', capacity: 'expTotalCapacity' },
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
  private fixedSelectedRows: any[] = [];

  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _storageClientService: StorageClientService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
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
    // return this.ampm.reduce((a, { capacity }) => a + capacity, 0);
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
}
