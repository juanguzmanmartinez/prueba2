import { Component, OnInit, SkipSelf } from '@angular/core';
import { RecoverPasswordUserForm } from '../../form/recover-password-user.form';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Router } from '@angular/router';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { RecoveryPasswordStoreService } from '../../stores/recovery-password-store.service';

@Component({
    templateUrl: './recover-password-user.component.html',
    styleUrls: ['./recover-password-user.component.scss'],
    providers: [RecoverPasswordUserForm]
})
export class RecoverPasswordUserComponent implements OnInit {

    submitForm: boolean;

    constructor(
        private _router: Router,
        private authImplement: AuthImplementService,
        public recoverPasswordUserForm: RecoverPasswordUserForm,
        @SkipSelf() private recoveryPasswordStore: RecoveryPasswordStoreService
    ) {
    }

    ngOnInit(): void {
    }

    formSubmitted() {
        this.submitForm = true;
        this.authImplement.sendPasswordCode(this.recoverPasswordUserForm.usernameControl.value)
            .subscribe(
                () => this.validUsername(),
                () => this.invalidUsername());
    }

    validUsername() {
        this.recoveryPasswordStore.username = this.recoverPasswordUserForm.usernameControl.value;
        this._router.navigate(
            [ROUTER_PATH.recoverPasswordCode],
            {skipLocationChange: true});
    }

    invalidUsername() {
        this.submitForm = false;
        this.recoverPasswordUserForm.usernameControl.settingWrongDataValidator();
        this.resetFormValidators();
    }

    resetFormValidators() {
        const subscription = this.recoverPasswordUserForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.recoverPasswordUserForm.resetFormValidators();
        });
    }

    formCancel() {
        this._router.navigate([ROUTER_PATH.login]);
    }
}
