import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsStoresEditionStoreService } from './stores/operations-stores-edition-store.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsStoresImplementService } from '../../implements/operations-stores-implement.service';
import { StoreDetail } from '../../models/operations-stores.model';
import { OperationsStoresEditionActionsStoreService } from './stores/operations-stores-edition-actions-store.service';
import { OP_STORES_PATH } from '@parameters/router/routing/operations-routing.parameter';

@Component({
    template: '<router-outlet></router-outlet>',
    providers: [
        OperationsStoresEditionStoreService,
        OperationsStoresEditionActionsStoreService
    ]
})
export class OperationsStoresEditionComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private storeCode: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        private _operationsStoresEditionActionsStore: OperationsStoresEditionActionsStoreService,
    ) {
    }

    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            this.storeCode = this._activatedRoute.snapshot.params[OP_STORES_PATH.storeCode];
            this._operationsStoresEditionStore.updateStoreDetail = true;
            this._operationsStoresEditionActionsStore.resetStore();
        });
        this.updateStoreDetail();
        this.subscriptions.push(subscription);
    }

    getStoreDetail(storeCode: string) {
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
                this.getStoreDetail(this.storeCode);
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
