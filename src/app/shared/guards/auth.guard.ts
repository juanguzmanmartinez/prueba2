import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@models/auth/role.model';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private userStore: UserStoreService,
        private tokenStore: TokenStoreService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userStore.authenticated() || this.tokenExpired()) {
            this.userStore.logout();
            return false;
        }

        const roles = route.data.roles as Role[];
        if (roles && !roles.some(role => this.userStore.hasRole(role))) {
            this.router.navigate(['error', 'not-found']);
            return false;
        }

        return true;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userStore.authenticated()) {
            return false;
        }

        const roles = route.data && route.data.roles as Role[];
        return !(roles && !roles.some(role => this.userStore.hasRole(role)));
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
