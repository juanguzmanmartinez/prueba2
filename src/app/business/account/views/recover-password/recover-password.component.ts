import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOGIN_PATH } from '@parameters/router-path.parameter';
import { RecoveryPasswordStore } from '../../stores/recovery-password.store';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [RecoveryPasswordStore]
})
export class RecoverPasswordComponent {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.router.navigate(
            [LOGIN_PATH.recoverPasswordUser],
            {skipLocationChange: true, relativeTo: activatedRoute});
    }
}
