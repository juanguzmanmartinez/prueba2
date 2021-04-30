import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OP_STORES_PATH } from '@parameters/router/router-path.parameter';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { Store } from '../../../../models/operations-stores.model';

@Component({
    selector: 'app-operations-stores-edition-home',
    templateUrl: './operations-stores-edition-home.component.html',
    styleUrls: ['./operations-stores-edition-home.component.scss']
})
export class OperationsStoresEditionHomeComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    public store: Store;
    public deliveryServiceType = EDeliveryServiceType;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _operationsStoresImplement: OperationsStoresImplementService
    ) {
    }

    ngOnInit(): void {
        const subscription = this._activatedRoute.paramMap.subscribe(() => {
            const storeId = this._activatedRoute.snapshot.params[OP_STORES_PATH.storeId];
            // this.store = this._operationsStoresImplement.getStoreDetail(storeId);
        });
        this.subscriptions.push(subscription);
    }

    editionHomeEditStore() {
        this._router.navigate([CONCAT_PATH.opStores_StoreEdition(this.store.code)]);
    }

    editionHomeEditService(serviceType: EDeliveryServiceType) {
        const storeServiceTypePath = `${CONCAT_PATH.opStores_StoreId(this.store.code)}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([storeServiceTypePath]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
