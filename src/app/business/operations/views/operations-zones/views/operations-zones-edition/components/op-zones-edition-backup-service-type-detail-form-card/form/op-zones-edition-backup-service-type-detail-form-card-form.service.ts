import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

export class ZoneBackupServiceTypeDetailControlName {
  static state = 'state';
  static customAmount = 'customAmount';
}

@Injectable()
export class OpZonesEditionBackupServiceTypeDetailFormCardFormService
  implements OnDestroy
{
  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _customAmountControl: FormControl = new FormControl('S/ 0.00');

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

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.customAmount]: this._customAmountControl,
    });
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
    this.customAmountControl.patchValue('S/ 0.00');
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
