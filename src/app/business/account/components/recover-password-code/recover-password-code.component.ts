import { Component, OnInit } from '@angular/core';
import { RecoverPasswordCodeForm } from '../../form/recover-password-code.form';
import { Router } from '@angular/router';
import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router-path.parameter';

@Component({
    templateUrl: './recover-password-code.component.html',
    styleUrls: ['./recover-password-code.component.scss'],
    providers: [RecoverPasswordCodeForm]
})
export class RecoverPasswordCodeComponent implements OnInit {

    constructor(
        public recoverPasswordCodeForm: RecoverPasswordCodeForm,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }


    formSubmit() {
        // this.recoverPasswordCodeForm.codeControl.settingWrongDataValidator();
        this.router.navigate(
            [`/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordReset}`],
            {skipLocationChange: true});
    }


    formCancel() {
        this.router.navigate([`/${BUSINESS_PATH.login}/${LOGIN_PATH.login}`]);
    }

    resetFormValidators() {
        const subscription = this.recoverPasswordCodeForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.recoverPasswordCodeForm.resetFormValidators();
        });
    }
}
