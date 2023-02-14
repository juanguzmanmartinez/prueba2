import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageClientService } from '@clients/storage/storage-client.service';
import {
  IStoreProcessed,
  IStoreUpload,
} from '@interfaces/capacities/upload-capacities.interface';
import { AlertService } from '@molecules/alert/alert.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Subscription } from 'rxjs';
import { TABS } from '../../constants/step-tabs.constants';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { OpCapacitiesUploadBackDialogService } from '../op-capacities-upload-back-dialog/op-capacities-upload-back-dialog.service';
import { OpCapacitiesUploadDeleteDialogService } from './components/op-capacities-upload-delete-dialog/op-capacities-upload-delete-dialog.service';

@Component({
  selector: 'app-op-capacities-step-file-confirmation',
  templateUrl: './op-capacities-step-file-confirmation.component.html',
  styleUrls: ['./op-capacities-step-file-confirmation.component.scss'],
  providers: [OpCapacitiesUploadDeleteDialogService],
})
export class OpCapacitiesStepFileConfirmationComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();
  disableButton: boolean = false;
  dataLength = 0;
  pageSize = 10;
  page = 1;
  startCount = 0;
  pageIndex = 0;
  displayedColumns: string[] = [
    'code',
    'name',
    'ampm',
    'programado',
    'express',
    'ret',
    'estado',
    'actions',
  ];
  dataWithValue: any[] = [];
  dataSource: IStoreProcessed[] = [];
  datatoShow: IStoreProcessed[] = [];
  uploadPathAccess: string;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _opCapacitiesUploadDeleteDialogService: OpCapacitiesUploadDeleteDialogService,
    private _alertService: AlertService,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService,
    private _storageClientService: StorageClientService,
    private _opCapacitiesUploadBackDialogService: OpCapacitiesUploadBackDialogService
  ) {
    this.uploadPathAccess = `${ROUTER_PATH.operationCapacities}/upload`;
  }

  ngOnInit(): void {
    TABS[0].icon = 'check';
    TABS[0].left = 'done';
    TABS[0].rigth = 'done';
    TABS[1].icon = 'check';
    TABS[1].left = 'done';
    TABS[1].rigth = 'done';

    TABS[2].icon = 'done';
    TABS[2].left = 'done';
    TABS[2].rigth = 'done';
    this.startCount = this.pageSize;
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    const subscription =
      this._uploadCapacitiesStoreService.getDataSource$.subscribe(
        (store: IStoreProcessed[]) => {
          let dataSourceFromStorage =
            this._storageClientService.getStorageCrypto('data-source');

          if (store && store.length > 0) {
            this.dataSource = store;
            this.orderData();
          } else if (
            dataSourceFromStorage &&
            dataSourceFromStorage.length > 0 &&
            (!store || store.length == 0)
          ) {
            this.dataSource = dataSourceFromStorage;
            this.orderData();
          } else this.getListFromStore();
        }
      );
    this.subscriptions.add(subscription);
    this._uploadCapacitiesStoreService.getDataRaw$.subscribe((dataRaw) => {
      this.dataWithValue = dataRaw;
    });
  }

  getListFromStore() {
    const subscription =
      this._uploadCapacitiesStoreService.getStoreList$.subscribe(
        (stores: IStoreUpload[]) => {
          if (stores && stores.length > 0) {
            this.convert(stores);
          } else {
            const storesFromStorage =
              this._storageClientService.getStorageCrypto('list-stores');
            this.convert(storesFromStorage);
          }
        }
      );
    this.subscriptions.add(subscription);
  }
  convert(locals: IStoreUpload[]) {
    let dataProcessed = [];
    locals.forEach((local: IStoreUpload) => {
      let locaolFounded = dataProcessed.some(
        (it) => it.code == local.storeCode
      );

      if (!locaolFounded) {
        dataProcessed.push({
          code: local.storeCode,
          local: local.storeName,
          ampm: [],
          scheduled: [],
          express: [],
          ret: [],
          status: false,
        });
      }

      let type = dataProcessed.find((item) => item.local === local.storeName);

      isNaN(local.capacity) ? (type.status = true) : null;
      if (type) {
        switch (local.service) {
          case 'PROG':
            type.scheduled.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'AM_PM':
            type.ampm.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'EXP':
            type.express.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'RET':
            type.ret.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
        }
      }
      dataProcessed.map((item) => item.code == type.code ?? type);
    });

    dataProcessed.map((data: any) => {
      data.ampmTotalCapacity = this.getTotal(data.ampm);
      data.expTotalCapacity = this.getTotal(data.express);
      data.scheTotalCapacity = this.getTotal(data.scheduled);
      data.retTotalCapacity = this.getTotal(data.ret);
      return data;
    });

    this._uploadCapacitiesStoreService.setDataSource(dataProcessed);
    this._storageClientService.setStorageCrypto('data-source', dataProcessed);
    this.dataSource = dataProcessed;
    this.orderData();
    this.dataLength = dataProcessed.length;
  }
  editRow(element) {
    this._uploadCapacitiesStoreService.setElementToEdit(element);
    this._uploadCapacitiesStoreService.setCurrentStep('0');
  }
  deleteRow(local) {
    const subscription = this._opCapacitiesUploadDeleteDialogService
      .open(local)
      .afterClosed()
      .subscribe((edition: boolean) => {
        if (edition) {
          const data = this.dataSource.filter(
            (item) => item.code !== local.code
          );
          this._uploadCapacitiesStoreService.setDataSource(data);
          this._storageClientService.setStorageCrypto('data-source', data);
        }
      });
    this.subscriptions.add(subscription);
  }
  submit(e) {
    let dataToUpload: IStoreUpload[] = this.rawData(this.dataSource);

    dataToUpload.map((item: any) => {
      this.dataWithValue.forEach((dat: any) => {
        if (item.service != 'EXP' && item.timeRange == dat.timeRange)
          item.value = dat.value;
        else if (item.service == 'EXP') {
          if (
            dat.storeCode == item.storeCode &&
            dat.timeRange == undefined &&
            dat.value == undefined
          ) {
            delete item.timeRange;
            delete item.value;
            item = {
              service: item.service,
              storeCode: item.storeCode,
              storeName: item.storeName,
              capacity: item.capacity,
            };
          } else {
            item.value = '-';
            item.timeRange = '-';
          }
        }
      });

      return item;
    });

    this._operationsCapacitiesImplementService
      .updateCapacitiesStores$(dataToUpload)
      .subscribe((res: any) => {
        if (res.processStatus) {
          this._uploadCapacitiesStoreService.setStepsTabs(TABS);
          this._uploadCapacitiesStoreService.setCurrentStep('1');
          this._storageClientService.setStorageCrypto('current-step', '1');
          this._router.navigate(['/operaciones/capacidades']);
          this._alertService.alertSuccess(
            'Se realizó la carga de capacidades con éxito.'
          );
        }
      });
  }
  rawData(data) {
    let dataToUpload = [];
    data.forEach((local) => {
      if (local?.ampm.length > 0) {
        local?.ampm.forEach((row) => {
          dataToUpload.push({
            service: 'AM_PM',
            storeCode: local.code,
            storeName: local.local,
            timeRange: row.segment,
            capacity: row.capacity,
          });
        });
      }
      if (local?.ret.length > 0) {
        local?.ret.forEach((row) => {
          dataToUpload.push({
            service: 'RET',
            storeCode: local.code,
            storeName: local.local,
            timeRange: row.segment,
            capacity: row.capacity,
          });
        });
      }
      if (local?.express.length > 0) {
        local?.express.forEach((row) => {
          dataToUpload.push({
            service: 'EXP',
            storeCode: local.code,
            storeName: local.local,
            timeRange: row.segment,
            capacity: row.capacity,
          });
        });
      }
      if (local?.scheduled.length > 0) {
        local?.scheduled.forEach((row) => {
          dataToUpload.push({
            service: 'PROG',
            storeCode: local.code,
            storeName: local.local,
            timeRange: row.segment,
            capacity: row.capacity,
          });
        });
      }
    });
    return dataToUpload;
  }
  cancelStep(e) {
    const subscription = this._opCapacitiesUploadBackDialogService
      .open(e)
      .afterClosed()
      .subscribe((back: boolean) => {
        if (back) {
          this._storageClientService.setStorageCrypto('current-step', 2);
          this._uploadCapacitiesStoreService.setStepsTabs(TABS);
          this._uploadCapacitiesStoreService.setStoreList([]);
          this._uploadCapacitiesStoreService.setCurrentStep('2');
          this._storageClientService.setStorageCrypto('current-step', '2');
          this._storageClientService.setStorageCrypto('data-source', null);
          this._storageClientService.setStorageCrypto('list-stores', null);
        }
      });
    this.subscriptions.add(subscription);
  }
  getTotal(array) {
    if (array.length == 0) return 0;
    return array.reduce((a, { capacity }) => {
      let sum = a + capacity;
      return sum;
    }, 0);
  }
  getStatus() {}
  checkStatus(stores: IStoreProcessed[]) {
    if (stores.length == 0) return;
    this.disableButton = stores
      .map((item: IStoreProcessed) => item.status)
      .every((item) => item == false);
  }
  getStatusService(element) {
    if (isNaN(element)) return -1;
    if (element == 0) return '-';
    return element;
  }
  onChangePage(e) {
    if (e.pageIndex == 0) {
      this.page = 1;
      this.startCount = this.pageSize;
      this.pageIndex = 0;
      this.orderData();
    } else {
      this.page = this.page + this.pageSize;
      this.startCount += this.pageSize;
      this.pageIndex = 1;
      this.orderData();
    }
  }

  changeDataFilter() {
    this.startCount = this.pageSize;
    this.orderData();
  }
  orderData() {
    this.datatoShow = this.dataSource.slice(this.page - 1, this.startCount);
    this.dataLength = this.dataSource.length;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._uploadCapacitiesStoreService.setDataSource([]);
  }
}
