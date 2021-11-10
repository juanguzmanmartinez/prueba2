import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ZoneBackupControl } from '../controls/zone-backup.control';

export class ZoneBackupDetailControlName {
  static state = 'state';
  static zoneType = 'zoneType';
  static zoneBackup = 'zoneBackup';
  static assignedStore = 'assignedStore';
}

@Injectable()
export class OpZonesEditionBackupDetailFormCardFormService implements OnDestroy {

  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _zoneTypeControl: FormControl = new FormControl(null);
  private _zoneBackupControl: FormControl = new ZoneBackupControl();
  private _assignedStoreControl: FormControl = new FormControl('');

  private _controlNameList = ZoneBackupDetailControlName;

  get form$(): FormGroup {
    return this.formGroup;
  }

  get stateControl(): FormControl {
    return this.form$.get(this._controlNameList.state) as FormControl;
  }

  get zoneTypeControl(): FormControl {
    return this.form$.get(this._controlNameList.zoneType) as FormControl;
  }

  get zoneBackupControl(): FormControl {
    return this.form$.get(this._controlNameList.zoneBackup) as FormControl;
  }

  get assignedStoreControl(): FormControl {
    return this.form$.get(this._controlNameList.assignedStore) as FormControl;
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.zoneType]: this._zoneTypeControl,
      [this._controlNameList.zoneBackup]: this._zoneBackupControl,
      [this._controlNameList.assignedStore]: this._assignedStoreControl,
    });
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
    this.zoneTypeControl.patchValue(null);
    this.zoneBackupControl.patchValue(null);
    this.assignedStoreControl.patchValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}

