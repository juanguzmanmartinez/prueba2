import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailControl } from '../controls/email.control';

@Injectable()
export class RecoverPasswordUserForm implements OnDestroy {
    private readonly form: FormGroup;

    private _usernameControl: FormControl = new EmailControl();

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            username: this._usernameControl,
        });
    }

    get form$(): FormGroup {
        return this.form;
    }

    public get usernameControl(): EmailControl {
        return this.form$.get('username') as EmailControl;
    }

    resetFormValidators() {
        this.usernameControl.settingValidators();
    }

    resetForm(): void {
        this.usernameControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
