import { Component, OnInit } from '@angular/core';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';
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
        this.router.navigate([CONCAT_PATH.operations]);
    }


    formCancel(): void {
        this.router.navigate([CONCAT_PATH.login]);
    }

}
