import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export class ZoneBackupServiceTypeDetailControlName {
  static state = 'state';
  static customAmount = 'customAmount';
  static customAmountRadio = 'customAmountRadio';
}

@Injectable()
export class OpZonesEditionBackupServiceTypeDetailFormCardFormService
  implements OnDestroy
{
  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _customAmountControl: FormControl = new FormControl('S/ 0.00');
  private _customAmountRadioControl: FormControl = new FormControl(null);

  private _controlNameList = ZoneBackupServiceTypeDetailControlName;

  get form$(): FormGroup {
    return this.formGroup;
  }

  get stateControl(): AbstractControl {
    return this.form$.get(this._controlNameList.state);
  }

  get customAmountControl(): FormControl {
    return this.form$.get(this._controlNameList.customAmount) as FormControl;
  }

  get customAmountRadioControl(): FormControl {
    return this.form$.get(this._controlNameList.customAmountRadio) as FormControl;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.customAmount]: this._customAmountControl,
      [this._controlNameList.customAmountRadio]: this._customAmountRadioControl,
    });
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
    this.customAmountControl.patchValue('S/ 0.00');
    this.customAmountRadioControl.patchValue(null);
  }

  setServiceCostValidator() {
    this.customAmountControl.setValidators([this.serviceCostValidator()]);
    this.customAmountControl.updateValueAndValidity();
  }

  clearServiceCostValidator() {
    this.customAmountControl.clearValidators();
    this.customAmountControl.updateValueAndValidity();
  }

  serviceCostValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value &&
        control.value !== 'S/ 0.0' &&
        control.value !== '0' &&
        control.value !== 'S/ 0.00'
        ? null
        : { require: control.value };
    };
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
