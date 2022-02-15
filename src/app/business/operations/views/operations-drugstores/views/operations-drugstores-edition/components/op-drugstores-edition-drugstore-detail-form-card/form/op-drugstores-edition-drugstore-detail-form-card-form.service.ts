import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ECompany } from '@models/company/company.model';
import { GenericValidator } from '@validators/generic-validator';
import {
  CheckboxGroupControl,
  CheckboxGroupControlName
} from '../../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';
import { EChannel } from '@models/channel/channel.model';

export class DrugstoreDetailControlName {
  static state = 'state';
  static company = 'company';
  static startHour = 'startHour';
  static endHour = 'endHour';
  static latitude = 'latitude';
  static longitude = 'longitude';

  static companyName = CheckboxGroupControlName.value;
  static companyChecked = CheckboxGroupControlName.checked;
}

@Injectable()
export class OpDrugstoresEditionDrugstoreDetailFormCardFormService implements OnDestroy {

  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _startHourControl: FormControl = new FormControl(null);
  private _endHourControl: FormControl = new FormControl(null);
  private _companyArray: FormArray = new FormArray([], [GenericValidator.validateAtLeastOneCheckboxChecked()]);
  private _latitudeControl: FormControl = new FormControl(null);
  private _longitudeControl: FormControl = new FormControl(null);

  private _controlNameList = DrugstoreDetailControlName;

  get form$() {
    return this.formGroup;
  }

  get stateControl(): FormControl {
    return this.form$.get(this._controlNameList.state) as FormControl;
  }

  get startHourControl(): FormControl {
    return this.form$.get(this._controlNameList.startHour) as FormControl;
  }

  get endHourControl(): FormControl {
    return this.form$.get(this._controlNameList.endHour) as FormControl;
  }

  get companyArray(): FormArray {
    return this.form$.get(this._controlNameList.company) as FormArray;
  }

  get latitudeControl(): FormControl {
    return this.form$.get(this._controlNameList.latitude) as FormControl;
  }

  get longitudeControl(): FormControl {
    return this.form$.get(this._controlNameList.longitude) as FormControl;
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.startHour]: this._startHourControl,
      [this._controlNameList.endHour]: this._endHourControl,
      [this._controlNameList.company]: this._companyArray,
      [this._controlNameList.latitude]: this._latitudeControl,
      [this._controlNameList.longitude]: this._longitudeControl,
    });
  }

  createCompanyGroup(companyName: ECompany): CheckboxGroupControl {
    return new CheckboxGroupControl(companyName);
  }

  createChannelGroup(channelName: EChannel): CheckboxGroupControl {
    return new CheckboxGroupControl(channelName);
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
    this.startHourControl.patchValue(null);
    this.endHourControl.patchValue(null);
    this.companyArray.patchValue([]);
    this.latitudeControl.patchValue(null);
    this.longitudeControl.patchValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}

