import { Component, OnInit, SkipSelf } from '@angular/core';
import { RecoverPasswordUserForm } from '../../form/recover-password-user.form';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';
import { Router } from '@angular/router';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { RecoveryPasswordStore } from '../../stores/recovery-password.store';

@Component({
    templateUrl: './recover-password-user.component.html',
    styleUrls: ['./recover-password-user.component.scss'],
    providers: [RecoverPasswordUserForm]
})
export class RecoverPasswordUserComponent implements OnInit {

    submitForm: boolean;

    constructor(
        private router: Router,
        private authImplement: AuthImplementService,
        public recoverPasswordUserForm: RecoverPasswordUserForm,
        @SkipSelf() private recoveryPasswordStore: RecoveryPasswordStore
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
        this.router.navigate(
            [CONCAT_PATH.recoverPasswordCode],
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
        this.router.navigate([CONCAT_PATH.login]);
    }
}
