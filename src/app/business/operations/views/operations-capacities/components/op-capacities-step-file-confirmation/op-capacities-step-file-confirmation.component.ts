import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@molecules/alert/alert.service';
import { Subscription } from 'rxjs';
import { TABS } from '../../constants/step-tabs.constants';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { OpCapacitiesUploadDeleteDialogService } from './components/op-capacities-upload-delete-dialog/op-capacities-upload-delete-dialog.service';
interface ILocal {}
interface ILocalsProcessed {
  code: string;
  local: string;
  ampm?: any;
  express?: any;
  ret?: any;
  scheduled?: any;
  ampmTotalCapacity?: number;
  expTotalCapacity?: number;
  scheTotalCapacity?: number;
  retTotalCapacity?: number;
}
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

  // dataSource: ILocalsProcessed;
  dataSource;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _opCapacitiesUploadDeleteDialogService: OpCapacitiesUploadDeleteDialogService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    TABS[2].flow = 'done';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    const subscription =
      this._uploadCapacitiesStoreService.getDataSource$.subscribe((locals) => {
        if (locals && locals.length > 0) this.dataSource = locals;
        else this.getListFromStore();
      });
    this.subscriptions.add(subscription);
  }

  getListFromStore() {
    const subscription =
      this._uploadCapacitiesStoreService.getStoreList$.subscribe((localsw) => {
        this.convert(localsw);
      });
    this.subscriptions.add(subscription);
  }
  convert(locals) {
    let dataProcessed: any[] = [];

    locals.forEach((local) => {
      let locaolFounded = dataProcessed.some((it) => it.code == local.CodLocal);
      if (!locaolFounded) {
        dataProcessed.push({
          code: local.CodLocal,
          local: local.Local,
          ampm: [],
          scheduled: [],
          express: [],
          ret: [],
        });
      }
      let type = dataProcessed.find((item) => item.local === local.Local);

      if (type) {
        switch (local.Servicio) {
          case 'PROG':
            type.scheduled.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
              id: local.id,
            });
            break;
          case 'AM/PM':
            type.ampm.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
              id: local.id,
            });
            break;
          case 'EXP':
            type.express.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
              id: local.id,
            });
            break;
          case 'RET':
            type.ret.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
              id: local.id,
            });
            break;
        }
      }
    });

    let ampmCap = 0;
    let expCap = 0;
    let scheCap = 0;
    let retCap = 0;

    dataProcessed.forEach((data: any) => {
      ampmCap = data.ampm.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      expCap = data.express.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      scheCap = data.scheduled.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      retCap = data.ret.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      data.ampmTotalCapacity = ampmCap;
      data.expTotalCapacity = expCap;
      data.scheTotalCapacity = scheCap;
      data.retTotalCapacity = retCap;
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
    TABS[1].flow = 'pending';
    TABS[2].flow = 'pending';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.setCurrentStep('1');
    let dataToUpload = this.rawData(this.dataSource);
    this._router.navigate(['/operaciones/capacidades']);
    this._alertService.alertSuccess(
      'Se realizó la carga de capacidades con éxito.'
    );
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
            service: 'EXPRESS',
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
            service: 'SCHEDULED',
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
  cancelStep(e) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
