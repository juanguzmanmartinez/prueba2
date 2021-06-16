import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '@stores/user-store.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { LocalPermissions } from '@models/auth/permissions.model';

@Injectable()
export class PermissionsGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const permissions = route.data && route.data.permissions as LocalPermissions;
        return this.guardValidation(permissions);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const permissions = route.data && route.data.permissions as LocalPermissions;
        return this.guardValidation(permissions);
    }


    guardValidation(permissions: LocalPermissions) {
        let hasAccess = this._userStore.hasAccess(permissions?.access);
        let access = permissions?.access;
        let hasRole = false;

        if (!hasAccess && permissions?.parent) {
            const hasParentAccess = this._userStore.hasAccess(permissions.parent.access);
            const hasSiblingAccess = !!permissions.parent.children
                .find((childrenAccess) => this._userStore.hasAccess(childrenAccess));

            hasAccess = hasParentAccess && !hasSiblingAccess;
            access = hasAccess ? permissions.parent.access : access;
        }

        if (!hasAccess && permissions?.children) {
            const hasChildrenAccess = permissions.children
                .find((children) => this._userStore.hasAccess(children));
            hasAccess = !!hasChildrenAccess;
            access = hasAccess ? hasChildrenAccess : access;
        }

        if (hasAccess) {
            hasRole = permissions.roles.some(role => this._userStore.hasAccessByRole(role, access));
        }

        const hasPermissions = hasAccess && hasRole;
        if (!hasPermissions) {
            this._router.navigate([ROUTER_PATH.notFound]);
            return false;
        }
        return true;
    }
}
