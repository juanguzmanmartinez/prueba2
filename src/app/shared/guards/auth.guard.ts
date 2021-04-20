import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@parameters/auth/role.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _tokenStore: TokenStoreService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const roles = route.data && route.data.roles as Role[];
        return this.guardValidation(roles);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const roles = route.data && route.data.roles as Role[];
        return this.guardValidation(roles);
    }


    guardValidation(roles: Role[]) {
        if (!this._userStore.authenticated() || this.tokenExpired()) {
            this._userStore.logout();
            return false;
        }
        if (roles && !roles.some(role => this._userStore.hasRole(role))) {
            this._router.navigate([ROUTER_PATH.notFound]);
            return false;
        }
        return true;
    }

    tokenExpired() {
        if (this._tokenStore.tokenDetail) {
            const date = DatesHelper.Date();
            const expirationDate = DatesHelper.Date(this._tokenStore.tokenDetail.expirationDate, DATES_FORMAT.millisecond);
            return date.isSameOrAfter(expirationDate);
        }
        return false;
    }

}
