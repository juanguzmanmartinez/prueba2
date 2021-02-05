import { Component, OnInit } from '@angular/core';
import { RecoverPasswordCodeForm } from '../../form/recover-password-code.form';
import { Router } from '@angular/router';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';

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
            [CONCAT_PATH.recoverPasswordReset],
            {skipLocationChange: true});
    }


    formCancel() {
        this.router.navigate([CONCAT_PATH.login]);
    }

    resetFormValidators() {
        const subscription = this.recoverPasswordCodeForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.recoverPasswordCodeForm.resetFormValidators();
        });
    }
}
