import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsStoresEditionStoreService } from './stores/operations-stores-edition-store.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsStoresImplementService } from '../../implements/operations-stores-implement.service';
import { OP_STORES_PATH } from '@parameters/router/routing-module-path.parameter';
import { StoreDetail } from '../../models/operations-stores.model';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [OperationsStoresEditionStoreService]
})
export class OperationsStoresEditionComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private storeId: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
    ) {
    }

    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            this.storeId = this._activatedRoute.snapshot.params[OP_STORES_PATH.storeId];
            this.getZoneDetail(this.storeId);
        });
        this.updateStoreDetail();
        this.subscriptions.push(subscription);
    }

    getZoneDetail(storeCode: string) {
        this._operationsStoresImplement.getStoreDetail(storeCode)
            .subscribe((storeDetail: StoreDetail) => {
                this._operationsStoresEditionStore.storeDetail = storeDetail;
            }, (error) => {
                this._operationsStoresEditionStore.storeDetailError = error;
            });
    }

    updateStoreDetail() {
        const subscription = this._operationsStoresEditionStore.updateStoreDetail$
            .subscribe(() => {
                this.getZoneDetail(this.storeId);
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
