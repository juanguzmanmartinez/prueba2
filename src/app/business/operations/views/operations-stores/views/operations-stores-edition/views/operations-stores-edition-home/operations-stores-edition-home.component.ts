import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsStoresEditionStoreService } from '../../stores/operations-stores-edition-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { parseUrl } from '@helpers/parse-url.helper';
import { IStoreServiceTypeRegister } from '@interfaces/stores/stores.interface';
import { StoreServiceTypeList } from '../../../../models/operations-stores-service-type';

@Component({
    selector: 'app-operations-stores-edition-home',
    templateUrl: './operations-stores-edition-home.component.html',
    styleUrls: ['./operations-stores-edition-home.component.scss']
})
export class OperationsStoresEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public deliveryServiceType = EDeliveryServiceType;
    public storeDetail: StoreDetail;
    public storeServiceTypeList: StoreServiceTypeList;
    private serviceTypeName = CDeliveryServiceTypeName;

    public homeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        const subscription = this._operationsStoresEditionStore.storeDetail$
            .subscribe((storeDetail: StoreDetail) => {
                    this.homeEditionLoader = false;
                    this.saveEditionLoader = false;
                    this.storeDetail = storeDetail;
                    this.storeServiceTypeList = new StoreServiceTypeList(storeDetail.serviceTypeList);
                },
                () => {
                    this.saveEditionLoader = false;
                    this.homeEditionLoader = false;
                    this.storeDetail = null;
                    this.storeServiceTypeList = null;
                });
        this.subscriptions.push(subscription);
    }

    editStore() {
        this._router.navigate([CONCAT_PATH.opStores_StoreEdition(this.storeDetail.code)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const storeCodePath = CONCAT_PATH.opStores_StoreId(this.storeDetail.code);
        const serviceTypePath = `${storeCodePath}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([serviceTypePath]);
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.registerServiceType(serviceType);
                }
            });
        this.subscriptions.push(subscription);
    }

    registerServiceType(serviceType: EDeliveryServiceType) {
        const storeServiceTypRegister = {
            localCode: this.storeDetail.code,
            serviceTypeCode: serviceType,
            startHour: DatesHelper.Date(this.storeDetail.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
            endHour: DatesHelper.Date(this.storeDetail.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
        } as IStoreServiceTypeRegister;

        this._operationsStoresImplement.postStoreServiceType(storeServiceTypRegister)
            .subscribe(() => {
                this.saveEditionLoader = true;
                this._operationsStoresEditionStore.updateStoreDetail = true;
                this._alert.alertSuccess(OperationMessages.successServiceTypeRegistered(this.serviceTypeName[serviceType], this.storeDetail.name));
            }, () => {
                this._alert.alertError(OperationMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType], this.storeDetail.name));
            });
    }

    backRoute() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
