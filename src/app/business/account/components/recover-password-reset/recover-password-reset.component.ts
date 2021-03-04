import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { Router } from '@angular/router';
import { CUpdatePasswordMessages } from '@organisms/update-password-form/parameters/update-password-messages.parameter';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { AlertService } from '@molecules/alert/alert.service';
import { RecoveryPasswordStoreService } from '../../stores/recovery-password-store.service';
import { UpdatePasswordFormComponent } from '@organisms/update-password-form/update-password-form.component';

@Component({
    templateUrl: './recover-password-reset.component.html',
    styleUrls: ['./recover-password-reset.component.scss'],
})
export class RecoverPasswordResetComponent implements OnInit {

    submitForm: boolean;
    newPassword: string;

    @ViewChild('updatePasswordForm', {static: false}) updatePasswordForm: UpdatePasswordFormComponent;

    constructor(
        private _router: Router,
        private _authImplement: AuthImplementService,
        private  _alertService: AlertService,
        @SkipSelf() private recoveryPasswordStore: RecoveryPasswordStoreService,
    ) {
    }

    ngOnInit(): void {
    }

    formSubmitted(password: string): void {
        this.submitForm = true;
        this.newPassword = password;
        this._authImplement.resetPassword({
            email: this.recoveryPasswordStore.username,
            code: this.recoveryPasswordStore.code,
            password
        }).subscribe(
            () => this.internSignIn(),
            () => this.invalidResetPassword());
    }

    invalidResetPassword() {
        this.submitForm = false;
        this.newPassword = '';
        this.updatePasswordForm.resetPasswordForm();
        this._alertService.alertError(CUpdatePasswordMessages.error);
    }

    internSignIn() {
        this._authImplement.signIn(
            this.recoveryPasswordStore.username,
            this.newPassword,
        ).subscribe(
            () => this.validSignIn(),
            () => this.invalidSignIn());
    }

    validSignIn() {
        this._alertService.alertSuccess(CUpdatePasswordMessages.success);
        this.recoveryPasswordStore.resetStore();
        this.updatePasswordForm.resetPasswordForm();
        this._router.navigate([CONCAT_PATH.operations]);
    }

    invalidSignIn() {
        this._alertService.alertSuccess(CUpdatePasswordMessages.success);
        this.formCancelled();
    }

    formCancelled(): void {
        this.recoveryPasswordStore.resetStore();
        this.updatePasswordForm.resetPasswordForm();
        this._router.navigate([CONCAT_PATH.login]);
    }

}
