import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { UserStoreService } from '@stores/user-store.service';


@Injectable()
export class AccountGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._userStore.authenticated()) {
            this._router.navigate([ROUTER_PATH.operations]);
            return false;
        }
        return true;
    }

}
