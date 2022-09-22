import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
import { TABS } from '../../constants/step-tabs.constants';
import { Router } from '@angular/router';

import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { Subscription } from 'rxjs';

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
      });
    this.subscriptions.add(subscription);
  }

  @Input() data: any[] = [];

  nextStep(e: any) {
    if (this.validations) return;
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
      .subscribe((res) => {
        ExportTableSelection.exportArrayToExcel(
          res,
          'Plantilla descarga capacidades'
        );
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
            desc: item.code +"-"+item.name,
          };
        });
        this._uploadCapacitiesStoreService.setStoresFilter(newDepartaments);
      });
  }
  getlistStores(e) {
    this.stores = e;
    if (this.stores.length == 0) return;
    this.disabled = false;
    this.fg.controls;
  }
  get getListServices(): string {
    const ampm = this.fg.controls.ampm.value ? 'AM/PM,' : '';
    const ret = this.fg.controls.ret.value ? 'RET,' : '';
    const exp = this.fg.controls.express.value ? 'EXP,' : '';
    const prog = this.fg.controls.scheduled.value ? 'PROG,' : '';
    return `${ampm}${ret}${exp}${prog}`;
  }
  get validations(): boolean {
    return this.stores.length == 0 || this.getListServices == '';
  }
}
