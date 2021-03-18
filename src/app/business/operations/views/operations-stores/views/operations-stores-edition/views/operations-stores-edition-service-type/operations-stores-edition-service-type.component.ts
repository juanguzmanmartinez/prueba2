import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { parseUrl } from '@helpers/parse-url.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsStoresEditionStoreService } from '../../stores/operations-stores-edition-store.service';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { Subscription } from 'rxjs';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { StoreServiceType } from '../../../../models/operations-stores-service-type';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { IStoreServiceTypeUpdate } from '@interfaces/stores/stores.interface';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

@Component({
    selector: 'app-operations-stores-edition-service-type',
    templateUrl: './operations-stores-edition-service-type.component.html',
    styleUrls: ['./operations-stores-edition-service-type.component.scss']
})
export class OperationsStoresEditionServiceTypeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public storeDetail: StoreDetail;
    public serviceType: EDeliveryServiceType;
    public storeServiceType: StoreServiceType;
    public paymentMethodList: EPaymentMethod[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;

    public serviceTypeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @SkipSelf() private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getStoreDetail();
        this.getPaymentMethodList();
        const path = this._activatedRoute.snapshot.routeConfig.path;
        this.serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => CDeliveryServiceTypeRoute[key] === path) as EDeliveryServiceType;
        this.setStoreServiceType();
    }

    getStoreDetail() {
        const subscription = this._operationsStoresEditionStore.storeDetail$
            .subscribe((storeDetail: StoreDetail) => {
                this.storeDetail = storeDetail;
                this.setStoreServiceType();
            }, () => {
                this.storeDetail = null;
                this.serviceTypeEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    getPaymentMethodList() {
        this._operationsStoresImplement.paymentMethodList
            .subscribe((paymentMethodList: EPaymentMethod[]) => {
                this.paymentMethodList = paymentMethodList;
            });
    }


    private setStoreServiceType() {
        this.storeServiceType = this.storeDetail?.serviceTypeList
            .find((serviceType: StoreServiceType) => serviceType.code === this.serviceType);
        this.serviceTypeEditionLoader = !this.storeDetail;
    }

    putServiceType(storeServiceTypeUpdate: IStoreServiceTypeUpdate) {
        this._operationsStoresImplement.putStoreServiceType(
            `${this.storeServiceType.id}`, storeServiceTypeUpdate)
            .subscribe(() => {
                this._operationsStoresEditionStore.updateStoreDetail = true;
                this._alert.alertSuccess(OperationMessages.successServiceTypeEdition(
                    this.serviceTypeName[this.storeServiceType.code], this.storeDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorServiceTypeEdition(
                    this.serviceTypeName[this.storeServiceType.code], this.storeDetail.name));
                this.backRoute();
            });
    }

    cancelEdition() {
        this.backRoute();
    }

    saveEdition(storeServiceTypeUpdate: IStoreServiceTypeUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putServiceType(storeServiceTypeUpdate);
                } else {
                    this.saveEditionLoader = false;
                }
            });
        this.subscriptions.push(subscription);
    }

    backRoute() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

    storeListRoute() {
        this._router.navigate([CONCAT_PATH.operationZones]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
