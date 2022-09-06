import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  data = [
    {
      Servicio: 'PROG',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '08:00 am - 11:00 am',
      Capacidad: 1,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '02:00 pm - 05:00 pm',
      Capacidad: 3,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '05:00 pm - 08:00 pm',
      Capacidad: 4,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '08:00 pm - 11:00 pm',
      Capacidad: 5,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '08:00 am - 02:00 pm',
      Capacidad: 6,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '02:00 pm - 08:00 pm',
      Capacidad: 10,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '08:00 pm - 08:30 pm',
      Capacidad: 2,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '08:00 am - 11:00 am',
      Capacidad: 23,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '11:00 am - 02:00 pm',
      Capacidad: 2,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '02:00 pm - 05:00 pm',
      Capacidad: 5,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '05:00 pm - 08:00 pm',
      Capacidad: 0,
    },
    {
      Servicio: 'EXP',
      CodLocal: 'AF8',
      Local: 'LOS OLIVOS',
      SegmentoHorario: '-',
      Capacidad: 1,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '08:00 am - 11:00 am',
      Capacidad: 1,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '02:00 pm - 05:00 pm',
      Capacidad: 3,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '05:00 pm - 08:00 pm',
      Capacidad: 4,
    },
    {
      Servicio: 'PROG',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '08:00 pm - 11:00 pm',
      Capacidad: 5,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '08:00 am - 02:00 pm',
      Capacidad: 0,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '02:00 pm - 08:00 pm',
      Capacidad: 10,
    },
    {
      Servicio: 'AM/PM',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '08:00 pm - 08:30 pm',
      Capacidad: 2,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '08:00 am - 11:00 am',
      Capacidad: 23,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '11:00 am - 02:00 pm',
      Capacidad: 2,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '02:00 pm - 05:00 pm',
      Capacidad: 5,
    },
    {
      Servicio: 'RET',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '05:00 pm - 08:00 pm',
      Capacidad: 0,
    },
    {
      Servicio: 'EXP',
      CodLocal: 'AF9',
      Local: 'MIRAFLORES',
      SegmentoHorario: '-',
      Capacidad: 1,
    },
  ];
  // dataSource: ILocalsProcessed;
  dataSource;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _opCapacitiesUploadDeleteDialogService: OpCapacitiesUploadDeleteDialogService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getStoreList$.subscribe((locals) => {
        this.convert(locals);
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
            });
            break;
          case 'AM/PM':
            type.ampm.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
            });
            break;
          case 'EXP':
            type.express.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
            });
            break;
          case 'RET':
            type.ret.push({
              segment: local.SegmentoHorario,
              capacity: local.Capacidad,
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
    let dataToUpload = [];
    console.log(this.dataSource);
    this.dataSource.forEach((local) => {
      if (local?.ampm.length > 0) {
        console.log('local', local);
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
        console.log('local', local);
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
      if (local?.express.length > 0) {
        console.log('local', local);
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
      if (local?.scheduled.length > 0) {
        console.log('local', local);
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
    });
    console.log('prioceasdo', dataToUpload);
  }
  cancelStep(e) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
