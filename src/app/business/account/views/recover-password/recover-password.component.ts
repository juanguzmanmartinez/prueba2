import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AC_CHILDREN_PATH } from '@parameters/router/routing/account/account-router.parameter';
import { RecoveryPasswordStoreService } from '../../stores/recovery-password-store.service';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [RecoveryPasswordStoreService]
})
export class RecoverPasswordComponent {

    constructor(
        private _router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this._router.navigate(
            [AC_CHILDREN_PATH.recoverPasswordUser],
            {skipLocationChange: true, relativeTo: activatedRoute});
    }
}
