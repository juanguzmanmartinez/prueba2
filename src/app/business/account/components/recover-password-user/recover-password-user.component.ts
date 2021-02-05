import { Component, OnInit } from '@angular/core';
import { RecoverPasswordUserForm } from '../../form/recover-password-user.form';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';
import { Router } from '@angular/router';

@Component({
    templateUrl: './recover-password-user.component.html',
    styleUrls: ['./recover-password-user.component.scss'],
    providers: [RecoverPasswordUserForm]
})
export class RecoverPasswordUserComponent implements OnInit {

    constructor(
        public recoverPasswordUserForm: RecoverPasswordUserForm,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    formSubmit() {
        this.router.navigate(
            [CONCAT_PATH.recoverPasswordCode],
            {skipLocationChange: true});
    }

    formCancel() {
        this.router.navigate([CONCAT_PATH.login]);
    }
}
