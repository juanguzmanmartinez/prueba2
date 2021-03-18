import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CodeControl } from '../controls/code.control';

@Injectable()
export class RecoverPasswordCodeForm implements OnDestroy {
    private readonly form: FormGroup;

    private _codeControl: FormControl = new CodeControl();

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            code: this._codeControl,
        });
    }

    get form$(): FormGroup {
        return this.form;
    }

    public get codeControl(): CodeControl {
        return this.form$.get('code') as CodeControl;
    }


    resetFormValidators() {
        this.codeControl.settingValidators();
    }

    resetForm(): void {
        this.codeControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
