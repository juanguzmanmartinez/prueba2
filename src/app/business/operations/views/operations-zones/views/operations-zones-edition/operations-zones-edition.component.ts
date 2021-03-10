import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsZonesEditionStoreService } from './stores/operations-zones-edition-store.service';
import { ActivatedRoute } from '@angular/router';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { OP_ZONES_PATH } from '@parameters/router/router-path.parameter';
import { ZoneDetail } from '../../models/operations-zones.model';
import { Subscription } from 'rxjs';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [OperationsZonesEditionStoreService]
})
export class OperationsZonesEditionComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private zoneId: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    ) {
    }


    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            this.zoneId = this._activatedRoute.snapshot.params[OP_ZONES_PATH.zoneId];
            this.getZoneById(this.zoneId);
        });
        this.updateZoneById();
        this.subscriptions.push(subscription);
    }

    getZoneById(zoneId: string) {
        this._operationsZonesImplement.getZoneDetail(zoneId)
            .subscribe((zoneDetail: ZoneDetail) => {
                this._operationsZonesEditionStore.zoneDetail = zoneDetail;
            }, (error) => {
                this._operationsZonesEditionStore.zoneDetailError = error;
            });
    }

    updateZoneById() {
        const subscription = this._operationsZonesEditionStore.updateZoneDetail$
            .subscribe(() => {
                this.getZoneById(this.zoneId);
            });
        this.subscriptions.push(subscription);
    }


    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
