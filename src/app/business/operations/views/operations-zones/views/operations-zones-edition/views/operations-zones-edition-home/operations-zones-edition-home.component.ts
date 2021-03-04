import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';

@Component({
    selector: 'app-operations-zones-edition-home',
    templateUrl: './operations-zones-edition-home.component.html',
    styleUrls: ['./operations-zones-edition-home.component.sass']
})
export class OperationsZonesEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public deliveryServiceType = EDeliveryServiceType;
    public zoneDetail: ZoneDetail;
    public zonesServiceTypeList: ZonesServiceTypeList;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    ) {
    }

    ngOnInit(): void {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail) => {
                this.zoneDetail = zoneDetail;
                this.zonesServiceTypeList = new ZonesServiceTypeList(zoneDetail.serviceTypeList);
            });
        this.subscriptions.push(subscription);
    }

    editStore() {
        this._router.navigate([CONCAT_PATH.opZones_ZoneEdition(`${this.zoneDetail.id}`)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const zoneIdPath = CONCAT_PATH.opZones_ZoneId(`${this.zoneDetail.id}`);
        const serviceTypePath = `${zoneIdPath}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([serviceTypePath]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
