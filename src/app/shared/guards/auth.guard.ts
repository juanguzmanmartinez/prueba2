import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@models/auth/role.model';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';
import { UserStoreService } from '@stores/user-store.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private userStore: UserStoreService
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userStore.authenticated()) {
            this.router.navigate([CONCAT_PATH.login]);
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

}
