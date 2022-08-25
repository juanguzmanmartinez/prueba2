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

@Component({
  selector: 'app-op-capacities-step-file-download',
  templateUrl: './op-capacities-step-file-download.component.html',
  styleUrls: ['./op-capacities-step-file-download.component.scss'],
})
export class OpCapacitiesStepFileDownloadComponent implements OnInit {
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
    private _router: Router
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
}
