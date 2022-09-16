import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IStoreProcessed,
  IStoreUpload,
} from '@interfaces/capacities/upload-capacities.interface';
import { AlertService } from '@molecules/alert/alert.service';
import { Subscription } from 'rxjs';
import { TABS } from '../../constants/step-tabs.constants';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { OpCapacitiesUploadDeleteDialogService } from './components/op-capacities-upload-delete-dialog/op-capacities-upload-delete-dialog.service';
interface ILocal {}

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

  dataSource;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _opCapacitiesUploadDeleteDialogService: OpCapacitiesUploadDeleteDialogService,
    private _alertService: AlertService,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService
  ) {}

  ngOnInit(): void {
    TABS[2].flow = 'done';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    const subscription =
      this._uploadCapacitiesStoreService.getDataSource$.subscribe(
        (store: IStoreProcessed[]) => {
          if (store && store.length > 0) this.dataSource = store;
          else this.getListFromStore();
        }
      );
    this.subscriptions.add(subscription);
  }

  getListFromStore() {
    const subscription =
      this._uploadCapacitiesStoreService.getStoreList$.subscribe(
        (stores: IStoreUpload[]) => {
          this.convert(stores);
        }
      );
    this.subscriptions.add(subscription);
  }
  convert(locals: IStoreUpload[]) {
    let dataProcessed = [];
    let warningNumber = false;
    locals.forEach((local: IStoreUpload) => {
      // if (isNaN(local.capacity)) warningNumber = true;
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
      if (type) {
        switch (local.service) {
          case 'PROG':
            type.scheduled.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'AM/PM':
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
      // if (warningNumber) {
      //   console.log('si');

      //   dataProcessed.map((item: any) => {
      //     if (item.code == local.storeCode) {
      //       return {
      //         ...item,
      //         status: true,
      //       };
      //     } else {
      //       return item;
      //     }
      //   });
      // }
      // console.log(dataProcessed);
    });

    dataProcessed.map((data: any) => {
      data.ampmTotalCapacity = this.getTotal(data.ampm);
      data.expTotalCapacity = this.getTotal(data.express);
      data.scheTotalCapacity = this.getTotal(data.scheduled);
      data.retTotalCapacity = this.getTotal(data.ret);
      return data;
    });

    this._uploadCapacitiesStoreService.setDataSource(dataProcessed);
    this.dataSource = dataProcessed;
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
        if (edition)
          this.dataSource = this.dataSource.filter(
            (item) => item.code !== local.code
          );
      });
    this.subscriptions.add(subscription);
  }
  submit(e) {
    let dataToUpload: IStoreUpload[] = this.rawData(this.dataSource);
    this._operationsCapacitiesImplementService
      .updateCapacitiesStores$(dataToUpload)
      .subscribe((res: any) => {
        console.log('res', res);
        if (res.processStatus) {
          TABS[1].flow = 'pending';
          TABS[2].flow = 'pending';
          this._uploadCapacitiesStoreService.setStepsTabs(TABS);
          this._uploadCapacitiesStoreService.setCurrentStep('1');
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
            service: 'AM/PM',
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
    TABS[2].flow = 'pending';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.setStoreList([]);
    this._uploadCapacitiesStoreService.setCurrentStep('2');
  }
  getTotal(array) {
    if (array.length == 0) return 0;
    return array.reduce((a, { capacity }) => {
      let sum = a + capacity;
      return sum;
    }, 0);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
