import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { Role } from '@models/auth/role.model';
import { BUSINESS_PATH } from '@parameters/router-path.parameter';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            this.router.navigate([BUSINESS_PATH.login]);
            return false;
        }

        const roles = route.data.roles as Role[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            this.router.navigate(['error', 'not-found']);
            return false;
        }

        return true;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            return false;
        }

        const roles = route.data && route.data.roles as Role[];
        return !(roles && !roles.some(role => this.authService.hasRole(role)));
    }

}
