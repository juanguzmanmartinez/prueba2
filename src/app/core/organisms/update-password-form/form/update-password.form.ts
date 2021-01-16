import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PasswordControl } from '../controls/password.control';
import { ConfirmPasswordControl } from '../controls/confirm-password.control';
import { Subscription } from 'rxjs';

@Injectable()
export class UpdatePasswordForm implements OnDestroy {
    private readonly form: FormGroup;

    private _passwordControl: FormControl = new PasswordControl();
    private _confirmPasswordControl: FormControl = new ConfirmPasswordControl('password');

    private passwordSubscription: Subscription;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            password: this._passwordControl,
            confirmPassword: this._confirmPasswordControl,
        });

        this.passwordSubscription = this.passwordControl.valueChanges.subscribe(() => {
            this.confirmPasswordControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
        });
    }

    get form$(): FormGroup {
        return this.form;
    }

    public get passwordControl(): PasswordControl {
        return this.form$.get('password') as PasswordControl;
    }

    public get confirmPasswordControl(): ConfirmPasswordControl {
        return this.form$.get('confirmPassword') as ConfirmPasswordControl;
    }


    resetForm(): void {
        this.passwordControl.patchValue(null);
        this.confirmPasswordControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
        this.passwordSubscription.unsubscribe();
    }
}
