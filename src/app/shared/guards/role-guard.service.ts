import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@parameters/auth/role.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Injectable()
export class RoleGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
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
        if (roles && !roles.some(role => this._userStore.hasRole(role))) {
            this._router.navigate([ROUTER_PATH.notFound]);
            return false;
        }
        return true;
    }
}
