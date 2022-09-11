import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { TABS } from '../../constants/step-tabs.constants';
import { Router } from '@angular/router';

import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';

@Component({
  selector: 'app-op-capacities-step-file-download',
  templateUrl: './op-capacities-step-file-download.component.html',
  styleUrls: ['./op-capacities-step-file-download.component.scss'],
  providers: [OperationsCapacitiesImplementService],
})
export class OpCapacitiesStepFileDownloadComponent implements OnInit {
  public capacitiesDrugstoreList: any[] = [
    {
      code: '01',
      name: 'lima',
      desc: 'lima',
      hidden: false,
    },
    {
      code: '02',
      name: 'arequipa',
      desc: 'arequipa',
      hidden: false,
    },
    {
      code: '03',
      name: 'cuzco',
      desc: 'cuzco',
      hidden: false,
    },
    {
      code: '04',
      name: 'piura',
      desc: 'piura',
      hidden: false,
    },
    {
      code: '05',
      name: 'iquitos',
      desc: 'iquitos',
      hidden: false,
    },
  ];
  departaments = [];
  provinces: [];
  districts = [];
  dataDownload = [
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
  filtros = [
    {
      code: '1',
      icon: 'local_mall',
      name: 'Nº de pedido',
      maxLength: '11',
      alphanumeric: false,
      desc: 'string',
      hidden: true,
    },
    {
      code: '2',
      icon: 'call',
      name: 'Nº de teléfono',
      maxLength: '9',
      alphanumeric: false,
      desc: 'string',
      hidden: true,
    },
    {
      code: '3',
      icon: 'assignment_ind',
      name: 'Doc. Identidad',
      maxLength: '12',
      alphanumeric: true,
      desc: 'string',
      hidden: true,
    },
  ];
  stores: string[] = [];
  disabled: boolean = true;
  fg: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService
  ) {}

  ngOnInit(): void {
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this.fg = this._formBuilder.group({
      ampm: [false],
      scheduled: [false],
      express: [false],
      ret: [false],
      departamento: [''],
      provincia: [''],
      distrito: [''],
      local: [''],
    });
    let plin = this._operationsCapacitiesImplementService
      .getDepartamentClient$()
      .subscribe((res) => {});
  }

  @Input() data: any[] = [];

  nextStep(e: any) {
    if (this.stores.length == 0) return;
    this.disabled = false;
    this._uploadCapacitiesStoreService.setCurrentStep('2');
  }
  cancelStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('1');
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._router.navigate(['/operaciones/capacidades']);
  }

  downloadData() {
    const ampm = this.fg.controls.ampm.value ? 'AM/PM,' : '';
    const ret = this.fg.controls.ret.value ? 'RET,' : '';
    const exp = this.fg.controls.express.value ? 'EXP,' : '';
    const prog = this.fg.controls.scheduled.value ? 'PROG,' : '';
    const params = `${ampm}${ret}${exp}${prog}`;

    this._operationsCapacitiesImplementService
      .getCapcitiesTemplateClient$(this.stores, params)
      .subscribe((res) => {});
    ExportTableSelection.exportArrayToExcel(
      this.dataDownload,
      'Plantilla descarga capacidades'
    );
  }
  getlistDepartaments(e) {
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getProvincesClient$(code)
      .subscribe((res) => console.log(res));
  }
  getlistProvinces(e) {
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getDistrictsClient$(code)
      .subscribe((res) => console.log(res));
  }
  getlistDistricts(e) {
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getStoresClient$(code)
      .subscribe((res) => console.log(res));
  }
  getlistStores(e) {
    this.stores = e;
    if (this.stores.length == 0) return;
    this.disabled = false;
    this.fg.controls;
  }
}
