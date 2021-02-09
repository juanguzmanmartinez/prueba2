import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BUSINESS_PATH } from '@parameters/router-path.parameter';
import { UserStoreService } from '@stores/user-store.service';


@Injectable()
export class AccountGuard implements CanActivate {

    constructor(
        private router: Router,
        private userStore: UserStoreService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.userStore.authenticated()) {
            this.router.navigate([BUSINESS_PATH.operations]);
            return false;
        }
        return true;
    }

}
