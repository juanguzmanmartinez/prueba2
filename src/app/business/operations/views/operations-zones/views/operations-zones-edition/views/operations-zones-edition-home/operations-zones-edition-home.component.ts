import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OP_ZONES_PATH } from '@parameters/router/router-path.parameter';
import { Subscription } from 'rxjs';
import { Zone } from '../../../../modals/operation-zones-responses.modal';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';

@Component({
    selector: 'app-operations-zones-edition-home',
    templateUrl: './operations-zones-edition-home.component.html',
    styleUrls: ['./operations-zones-edition-home.component.sass']
})
export class OperationsZonesEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public deliveryServiceType = EDeliveryServiceType;
    public zone: Zone;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _operationsZonesImplement: OperationsZonesImplementService
    ) {
    }

    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            const zoneId = this._activatedRoute.snapshot.params[OP_ZONES_PATH.zoneId];
            this.getZoneById(zoneId);
        });
        this.subscriptions.push(subscription);
    }

    getZoneById(zoneId: string) {
        this._operationsZonesImplement.getZoneDetail(zoneId)
            .subscribe((zone) => {
                this.zone = zone;
            });
    }

    editStore() {
        this._router.navigate([CONCAT_PATH.opZones_ZoneId(`${this.zone.id}`)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const zoneIdPath = CONCAT_PATH.opZones_ZoneId(`${this.zone.id}`);
        const serviceTypePath = `${zoneIdPath}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([serviceTypePath]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
