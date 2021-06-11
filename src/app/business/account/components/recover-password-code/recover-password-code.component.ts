import { Component, OnInit, SkipSelf } from '@angular/core';
import { RecoverPasswordCodeForm } from '../../form/recover-password-code.form';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { RecoveryPasswordStoreService } from '../../stores/recovery-password-store.service';
import { emailMasking } from '@helpers/email-mask.helper';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { AlertService } from '@molecules/alert/alert.service';
import { RecoveryPasswordAlertMessages } from '../../parameters/recovery-password-alert-messages.parameter';

@Component({
    templateUrl: './recover-password-code.component.html',
    styleUrls: ['./recover-password-code.component.scss'],
    providers: [RecoverPasswordCodeForm]
})
export class RecoverPasswordCodeComponent implements OnInit {

    submitForm: boolean;

    constructor(
        private _router: Router,
        private authImplement: AuthImplementService,
        private  alertService: AlertService,
        public recoverPasswordCodeForm: RecoverPasswordCodeForm,
        @SkipSelf() private recoveryPasswordStore: RecoveryPasswordStoreService,
    ) {
    }

    ngOnInit(): void {
    }

    get emailMasked() {
        return emailMasking(this.recoveryPasswordStore.username);
    }


    formSubmitted() {
        this.submitForm = true;
        this.authImplement.validPasswordCode(
            this.recoveryPasswordStore.username,
            this.recoverPasswordCodeForm.codeControl.value
        ).subscribe(
            (validCode) => validCode ? this.validCode() : this.invalidCode(),
            () => this.invalidUsername());
    }

    validCode() {
        this.recoveryPasswordStore.code = this.recoverPasswordCodeForm.codeControl.value;
        this._router.navigate(
            [ROUTER_PATH.recoverPasswordReset],
            {skipLocationChange: true});
    }

    invalidCode() {
        this.submitForm = false;
        this.recoverPasswordCodeForm.codeControl.settingWrongDataValidator();
        this.resetFormValidators();
    }

    invalidUsername() {
        this.recoveryPasswordStore.resetStore();
        this.alertService.alertError(RecoveryPasswordAlertMessages.invalidUserName);
        this._router.navigate([ROUTER_PATH.recoverPasswordUser]);
    }

    formCancel() {
        this.recoveryPasswordStore.resetStore();
        this._router.navigate([ROUTER_PATH.login]);
    }

    resetFormValidators() {
        const subscription = this.recoverPasswordCodeForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.recoverPasswordCodeForm.resetFormValidators();
        });
    }
}
