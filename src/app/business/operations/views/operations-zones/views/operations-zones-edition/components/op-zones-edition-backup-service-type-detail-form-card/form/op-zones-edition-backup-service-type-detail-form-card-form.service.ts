import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class ZoneBackupServiceTypeDetailControlName {
    static state = 'state';
}

@Injectable()
export class OpZonesEditionBackupServiceTypeDetailFormCardFormService implements OnDestroy {

    private readonly formGroup: FormGroup;

    private _stateControl: FormControl = new FormControl(null);

    private _controlNameList = ZoneBackupServiceTypeDetailControlName;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            [this._controlNameList.state]: this._stateControl,
        });
    }

    get form$() {
        return this.formGroup;
    }

    get stateControl() {
        return this.form$.get(this._controlNameList.state);
    }

    resetForm() {
        this.stateControl.patchValue(null);
    }

    ngOnDestroy() {
        this.resetForm();
    }
}

