import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OP_STORES_PATH } from '@parameters/router/paths/operations-path.parameter';


@Injectable()
export class OperationsStoresServiceTypeEditionGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _tokenStore: TokenStoreService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const path = route.params[OP_STORES_PATH.storeServiceTypeEdition];
        const serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => CDeliveryServiceTypeRoute[key] === path) as EDeliveryServiceType;

        if (!serviceType) {
            this._router.navigate([ROUTER_PATH.notFound]);
            return false;
        }
        return true;
    }

}
