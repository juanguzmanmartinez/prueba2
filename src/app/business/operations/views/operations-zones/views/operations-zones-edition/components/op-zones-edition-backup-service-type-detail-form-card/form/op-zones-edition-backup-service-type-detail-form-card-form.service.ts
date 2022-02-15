import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class ZoneBackupServiceTypeDetailControlName {
  static state = 'state';
}

@Injectable()
export class OpZonesEditionBackupServiceTypeDetailFormCardFormService implements OnDestroy {

  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);

  private _controlNameList = ZoneBackupServiceTypeDetailControlName;

  get form$(): FormGroup {
    return this.formGroup;
  }

  get stateControl(): AbstractControl {
    return this.form$.get(this._controlNameList.state);
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
    });
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}

