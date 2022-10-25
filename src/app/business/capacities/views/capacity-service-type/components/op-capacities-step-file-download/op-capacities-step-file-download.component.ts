import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TABS } from '../../constants/step-tabs.constants';
import { Router } from '@angular/router';

import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../store/upload-capacities-store.service';
import { StorageClientService } from '@clients/storage/storage-client.service';

@Component({
  selector: 'app-op-capacities-step-file-download',
  templateUrl: './op-capacities-step-file-download.component.html',
  styleUrls: ['./op-capacities-step-file-download.component.scss'],
  providers: [OperationsCapacitiesImplementService],
})
export class OpCapacitiesStepFileDownloadComponent implements OnInit {
  private subscriptions = new Subscription();

  stores: string[] = [];
  disabled: boolean = true;
  fg: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService,
    private _storageClientService: StorageClientService
  ) {}

  ngOnInit(): void {
    TABS[0].icon = 'done';
    TABS[0].left = '';
    TABS[0].rigth = 'pending';
    TABS[1].icon = 'pending';
    TABS[1].left = 'pending';
    TABS[1].rigth = 'pending';

    TABS[2].icon = 'pending';
    TABS[2].left = 'pending';
    TABS[2].rigth = 'pending';

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
    const subscription = this._operationsCapacitiesImplementService
      .getDepartamentClient$()
      .subscribe((res) => {
        let newDepartaments: any[] = res.map((item) => {
          return {
            ...item,
            hidden: false,
            desc: item.name,
          };
        });

        this._uploadCapacitiesStoreService.setDepartamentsFilter(
          newDepartaments
        );
        this._uploadCapacitiesStoreService.setProvincesFilter([]);
        this._uploadCapacitiesStoreService.setDistrictsFilter([]);
        this._uploadCapacitiesStoreService.setStoresFilter([]);
      });
    this.subscriptions.add(subscription);
  }

  @Input() data: any[] = [];

  nextStep(e: any) {
    if (this.validations) return;
    this.disabled = false;
    this._uploadCapacitiesStoreService.setCurrentStep('2');
    this._storageClientService.setStorageCrypto('current-step', 2);
  }
  cancelStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('1');
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._router.navigate(['/operaciones/capacidades']);
  }

  downloadData() {
    const ampm = this.fg.controls.ampm.value ? 'AM_PM,' : '';
    const ret = this.fg.controls.ret.value ? 'RET,' : '';
    const exp = this.fg.controls.express.value ? 'EXP,' : '';
    const prog = this.fg.controls.scheduled.value ? 'PROG,' : '';
    const params = `${ampm}${ret}${exp}${prog}`;

    this._operationsCapacitiesImplementService
      .getCapcitiesTemplateClient$(this.stores, params)
      .subscribe((res) => {
        this._uploadCapacitiesStoreService.setDataRaw(res);
        this._storageClientService.setStorageCrypto('data-raw', res);
        let data = [];
        res.forEach((store: any) => {
          const { value, ...rest } = store;
          if (store.service == 'EXP') data.push({ ...rest, timeRange: '-' });
          else data.push({ ...rest });
        });

        let toExport = [];
        data.forEach((item: any) => {
          let store = {};
          store['Servicio'] = item.service;
          store['Cod. Local'] = item.storeCode;
          store['Local'] = item.storeName;
          store['SegmentoHorario'] = item.timeRange;
          store['Capacidad'] = item.capacity;
          toExport.push(store);
        });

        let dataSort = toExport.sort((a, b) => {
          let fa = a['Cod. Local'].toLowerCase(),
            fb = b['Cod. Local'].toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        ExportTableSelection.exportArrayToExcel(
          dataSort,
          'Plantilla descarga capacidades',
          true
        );
        this.disabled = false;
      });
  }
  getlistDepartaments(e) {
    if (e.length <= 0) {
      this._uploadCapacitiesStoreService.setDistrictsFilter([]);
      this._uploadCapacitiesStoreService.setProvincesFilter([]);
      this._uploadCapacitiesStoreService.setStoresFilter([]);
      return;
    }
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getProvincesClient$(code)
      .subscribe((res) => {
        let newDepartaments: any[] = res.map((item) => {
          return {
            ...item,
            hidden: false,
            desc: item.name,
          };
        });
        this._uploadCapacitiesStoreService.setProvincesFilter(newDepartaments);
      });
  }
  getlistProvinces(e) {
    if (e.length <= 0) {
      this._uploadCapacitiesStoreService.setDistrictsFilter([]);
      this._uploadCapacitiesStoreService.setStoresFilter([]);
      return;
    }
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getDistrictsClient$(code)
      .subscribe((res) => {
        let newDepartaments: any[] = res.map((item) => {
          return {
            ...item,
            hidden: false,
            desc: item.name,
          };
        });
        this._uploadCapacitiesStoreService.setDistrictsFilter(newDepartaments);
      });
  }
  getlistDistricts(e) {
    if (e.length <= 0)
      return this._uploadCapacitiesStoreService.setStoresFilter([]);
    let code = e.join(',');
    this._operationsCapacitiesImplementService
      .getStoresClient$(code)
      .subscribe((res) => {
        let newDepartaments: any[] = res.map((item) => {
          return {
            ...item,
            hidden: false,
            desc: item.code + '-' + item.name,
          };
        });
        this._uploadCapacitiesStoreService.setStoresFilter(newDepartaments);
      });
  }
  getlistStores(e) {
    this.stores = e;
    if (this.stores.length == 0) this.disabled = true;
    // this.disabled = false;
    this.fg.controls;
  }
  get getListServices(): string {
    const ampm = this.fg.controls.ampm.value ? 'AM_PM,' : '';
    const ret = this.fg.controls.ret.value ? 'RET,' : '';
    const exp = this.fg.controls.express.value ? 'EXP,' : '';
    const prog = this.fg.controls.scheduled.value ? 'PROG,' : '';
    return `${ampm}${ret}${exp}${prog}`;
  }
  get validations(): boolean {
    return this.stores.length == 0 || this.getListServices == '';
  }
}
