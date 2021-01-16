import { Component, OnInit } from '@angular/core';
import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router-path.parameter';
import { Router } from '@angular/router';

@Component({
    templateUrl: './recover-password-reset.component.html',
    styleUrls: ['./recover-password-reset.component.scss'],
})
export class RecoverPasswordResetComponent implements OnInit {

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    formSubmit(): void {
        this.router.navigate([`/${BUSINESS_PATH.operations}`]);
    }


    formCancel(): void {
        this.router.navigate([`/${BUSINESS_PATH.login}/${LOGIN_PATH.login}`]);
    }

}
