import { Component, OnInit } from '@angular/core';
import { RecoverPasswordUserForm } from '../../form/recover-password-user.form';
import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router-path.parameter';
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
            [`/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordCode}`],
            {skipLocationChange: true});
    }

    formCancel() {
        this.router.navigate([`/${BUSINESS_PATH.login}/${LOGIN_PATH.login}`]);
    }
}
