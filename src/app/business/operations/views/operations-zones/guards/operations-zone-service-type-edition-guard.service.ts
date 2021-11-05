import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { CChannelRoute, EChannel } from '@models/channel/channel.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OP_ZONES_PATH } from '@parameters/router/paths/operations-path.parameter';
import { CCompanyRoute, ECompany } from '@models/company/company.model';


@Injectable()
export class OperationsZoneServiceTypeEditionGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _tokenStore: TokenStoreService,
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const path = route.params[OP_ZONES_PATH.zoneServiceTypeEdition];
        const param = route.params[OP_ZONES_PATH.zoneServiceTypeChannelEdition];
      const paramCompany = route.params[OP_ZONES_PATH.zoneServiceTypeCompanyEdition];
        const serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => CDeliveryServiceTypeRoute[key] === path) as EDeliveryServiceType;
        const channel = Object.keys(CChannelRoute)
            .find((key) => CChannelRoute[key] === param) as EChannel;
      const company = Object.keys(CCompanyRoute)
        .find((key) => CCompanyRoute[key] === paramCompany) as ECompany;
        if (!serviceType || !channel ||!company) {
            this._router.navigate([ROUTER_PATH.notFound]);
            return false;
        }
        return true;
    }

}
