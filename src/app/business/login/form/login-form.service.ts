import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailControl } from '../controls/email.control';
import { PasswordControl } from '../controls/password.control';

@Injectable()
export class LoginFormService implements OnDestroy {
    private readonly loginForm: FormGroup;

    private _userControl: FormControl = new EmailControl();
    private _passwordControl: FormControl = new PasswordControl();

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.loginForm = this._formBuilder.group({
            user: this._userControl,
            password: this._passwordControl,
        });
    }

    get loginForm$(): FormGroup {
        return this.loginForm;
    }

    public get userControl(): EmailControl {
        return this.loginForm.get('user') as EmailControl;
    }

    get passwordControl(): PasswordControl {
        return this.loginForm$.get('password') as PasswordControl;
    }

    resetForm(): void {
        this.userControl.patchValue(null);
        this.passwordControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
