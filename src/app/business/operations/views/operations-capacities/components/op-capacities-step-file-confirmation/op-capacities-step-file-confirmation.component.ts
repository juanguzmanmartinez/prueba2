import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-confirmation',
  templateUrl: './op-capacities-step-file-confirmation.component.html',
  styleUrls: ['./op-capacities-step-file-confirmation.component.scss'],
})
export class OpCapacitiesStepFileConfirmationComponent implements OnInit {
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
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.convert();
  }

  dataSource: any[] = [];

  convert() {
    let datoss: any[] = [];

    this.data.forEach((item) => {
      let found = datoss.some((it) => it.code == item.CodLocal);
      if (!found) {
        datoss.push({
          code: item.CodLocal,
          local: item.Local,
          ampm: [],
          scheduled: [],
          express: [],
          ret: [],
        });
      }
      let finddd = datoss.find((ol) => ol.local === item.Local);

      if (finddd) {
        switch (item.Servicio) {
          case 'PROG':
            finddd.scheduled.push({
              segment: item.SegmentoHorario,
              capacity: item.Capacidad,
            });
            break;
          case 'AM/PM':
            finddd.ampm.push({
              segment: item.SegmentoHorario,
              capacity: item.Capacidad,
            });
            break;
          case 'EXP':
            finddd.express.push({
              segment: item.SegmentoHorario,
              capacity: item.Capacidad,
            });
            break;
          case 'RET':
            finddd.ret.push({
              segment: item.SegmentoHorario,
              capacity: item.Capacidad,
            });
            break;
        }
      }
    });

    let ampmCap = 0;
    let expCap = 0;
    let scheCap = 0;
    let retCap = 0;
    console.log('datos', datoss);

    datoss.forEach((pla: any) => {
      ampmCap = pla.ampm.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      expCap = pla.express.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      scheCap = pla.scheduled.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      retCap = pla.ret.reduce((a, { capacity }) => {
        return a + capacity;
      }, 0);
      pla.ampmTotalCapacity = ampmCap;
      pla.expTotalCapacity = expCap;
      pla.scheTotalCapacity = scheCap;
      pla.retTotalCapacity = retCap;
    });
    this.dataSource = datoss;
  }
  editRow(id) {
    this._uploadCapacitiesStoreService.setCurrentStep('0');
  }
  deleteRow(el) {}
}
