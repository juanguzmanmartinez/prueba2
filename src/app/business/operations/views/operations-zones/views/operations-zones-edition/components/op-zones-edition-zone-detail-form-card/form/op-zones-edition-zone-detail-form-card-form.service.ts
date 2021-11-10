import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { CheckboxGroupControl, CheckboxGroupControlName } from '../controls/checkbox-group.control';
import { GenericValidator } from '@validators/generic-validator';
import { LabelControl } from '../controls/label.control';

export class ZoneDetailControlName {
  static state = 'state';
  static assignedStore = 'assignedStore';
  static company = 'company';
  static channel = 'channel';
  static label = 'label';

  static companyName = CheckboxGroupControlName.value;
  static companyChecked = CheckboxGroupControlName.checked;
  static channelName = CheckboxGroupControlName.value;
  static channelChecked = CheckboxGroupControlName.checked;
}

@Injectable()
export class OpZonesEditionZoneDetailFormCardFormService implements OnDestroy {

  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _assignedStoreControl: FormControl = new FormControl(null);
  private _companyArray: FormArray = new FormArray([], [GenericValidator.validateAtLeastOneCheckboxChecked()]);
  private _channelArray: FormArray = new FormArray([], [GenericValidator.validateAtLeastOneCheckboxChecked()]);
  private _labelControl: LabelControl = new LabelControl(null);

  private _controlNameList = ZoneDetailControlName;

  get form$(): FormGroup {
    return this.formGroup;
  }

  get stateControl(): AbstractControl {
    return this.form$.get(this._controlNameList.state);
  }

  get assignedStoreControl(): FormControl {
    return this.form$.get(this._controlNameList.assignedStore) as FormControl;
  }

  get companyArray(): FormArray {
    return this.form$.get(this._controlNameList.company) as FormArray;
  }

  get channelArray(): FormArray {
    return this.form$.get(this._controlNameList.channel) as FormArray;
  }

  get labelControl(): LabelControl {
    return this.form$.get(this._controlNameList.label) as LabelControl;
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.assignedStore]: this._assignedStoreControl,
      [this._controlNameList.company]: this._companyArray,
      [this._controlNameList.channel]: this._channelArray,
      [this._controlNameList.label]: this._labelControl,
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
    this.assignedStoreControl.patchValue(null);
    this.companyArray.patchValue([]);
    this.channelArray.patchValue([]);
    this.labelControl.patchValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}

