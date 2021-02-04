import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailControl } from '../controls/email.control';
import { LoginPasswordControl } from '../controls/login-password.control';

@Injectable()
export class LoginForm implements OnDestroy {
    private readonly form: FormGroup;

    private _usernameControl: FormControl = new EmailControl();
    private _passwordControl: FormControl = new LoginPasswordControl();

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            username: this._usernameControl,
            password: this._passwordControl,
        });
    }

    get form$(): FormGroup {
        return this.form;
    }

    public get usernameControl(): EmailControl {
        return this.form$.get('username') as EmailControl;
    }

    get passwordControl(): LoginPasswordControl {
        return this.form$.get('password') as LoginPasswordControl;
    }

    resetFormValidators() {
        this.passwordControl.settingValidators();
        this.usernameControl.settingValidators();
    }

    resetForm(): void {
        this.usernameControl.patchValue(null);
        this.passwordControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
