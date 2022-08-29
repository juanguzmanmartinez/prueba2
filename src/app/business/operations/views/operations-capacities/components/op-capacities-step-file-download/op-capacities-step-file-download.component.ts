import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { TABS } from '../../constants/step-tabs.constants';
import { Router } from '@angular/router';
import { CapacitiesDrugstore } from '../../models/operations-capacities-responses.model';
import { Subscription } from 'rxjs';
import { OpCapacitiesDrugstoreDefaultCapacityService } from '../op-capacities-drugstore-default-capacity/op-capacities-drugstore-default-capacity.service';
import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';

@Component({
  selector: 'app-op-capacities-step-file-download',
  templateUrl: './op-capacities-step-file-download.component.html',
  styleUrls: ['./op-capacities-step-file-download.component.scss'],
})
export class OpCapacitiesStepFileDownloadComponent implements OnInit {
  public capacitiesDrugstoreList: CapacitiesDrugstore[] = [];
  private subscriptions = new Subscription();
  public capacitiesDrugstoreSelection: CapacitiesDrugstore;
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

  fg: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _opCapacitiesDrugstoreDefaultCapacity: OpCapacitiesDrugstoreDefaultCapacityService
  ) {}

  ngOnInit(): void {
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
  }

  @Input() data: any[] = [];

  selectionChange(ev) {
    console.log('e', ev);
  }

  nextStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('2');
  }
  cancelStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('1');
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._router.navigate(['/operaciones/capacidades']);
  }

  updateDefaultCapacityDrugstoreList(): void {
    const subscription =
      this._opCapacitiesDrugstoreDefaultCapacity.drugstoreList$.subscribe(
        (capacitiesDrugstoreList) => {
          this.capacitiesDrugstoreList = capacitiesDrugstoreList;
          this.changeCapacitiesDrugstoreSelection(capacitiesDrugstoreList[0]);
        }
      );
    this.subscriptions.add(subscription);
  }
  changeCapacitiesDrugstoreSelection(
    capacitiesDrugstore: CapacitiesDrugstore
  ): void {
    this.capacitiesDrugstoreSelection = capacitiesDrugstore;
    this._opCapacitiesDrugstoreDefaultCapacity.drugstoreSelection =
      capacitiesDrugstore;
  }
  downloadData() {
    ExportTableSelection.exportArrayToExcel(this.dataDownload, 'locales');
  }
}
