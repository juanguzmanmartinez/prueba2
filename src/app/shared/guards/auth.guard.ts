import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@parameters/auth/role.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private userStore: UserStoreService,
        private tokenStore: TokenStoreService,
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
        if (!this.userStore.authenticated() || this.tokenExpired()) {
            this.userStore.logout();
            return false;
        }
        if (roles && !roles.some(role => this.userStore.hasRole(role))) {
            this.router.navigate([CONCAT_PATH.notFound]);
            return false;
        }
        return true;
    }

    tokenExpired() {
        if (this.tokenStore.tokenDetail) {
            const date = DatesHelper.Date();
            const expirationDate = DatesHelper.Date(this.tokenStore.tokenDetail.expirationDate, DATES_FORMAT.millisecond);
            return date.isSameOrAfter(expirationDate);
        }
        return false;
    }

}
