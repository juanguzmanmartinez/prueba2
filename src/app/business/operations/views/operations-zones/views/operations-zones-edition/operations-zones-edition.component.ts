import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsZonesEditionStoreService } from './stores/operations-zones-edition-store.service';
import { ActivatedRoute } from '@angular/router';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { OP_ZONES_PATH } from '@parameters/router/routing-module-path.parameter';
import { ZoneDetail } from '../../models/operations-zones.model';
import { Subscription } from 'rxjs';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [OperationsZonesEditionStoreService]
})
export class OperationsZonesEditionComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private zoneCode: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    ) {
    }

    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            this.zoneCode = this._activatedRoute.snapshot.params[OP_ZONES_PATH.zoneCode];
            this._operationsZonesEditionStore.updateZoneDetail = true;
        });
        this.updateZoneDetail();
        this.subscriptions.push(subscription);
    }

    getZoneDetail(zoneCode: string) {
        this._operationsZonesImplement.getZoneDetail(zoneCode)
            .subscribe((zoneDetail: ZoneDetail) => {
                this._operationsZonesEditionStore.zoneDetail = zoneDetail;
                if (zoneDetail.zoneBackup) {
                    this.getZoneBackup(zoneDetail.zoneBackup.code);
                }
            }, (error) => {
                this._operationsZonesEditionStore.zoneDetailError = error;
            });
    }

    updateZoneDetail() {
        const subscription = this._operationsZonesEditionStore.updateZoneDetail$
            .subscribe(() => {
                this.getZoneDetail(this.zoneCode);
            });
        this.subscriptions.push(subscription);
    }

    getZoneBackup(zoneCode: string) {
        this._operationsZonesImplement.getZoneDetail(zoneCode)
            .subscribe((zoneDetail: ZoneDetail) => {
                this._operationsZonesEditionStore.zoneBackup = zoneDetail;
            }, (error) => {
                this._operationsZonesEditionStore.zoneBackupError = error;
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
