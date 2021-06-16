import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsStoresEditionStoreService } from '../../stores/operations-stores-edition-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { IDrugstoreServiceTypeRegister } from '@interfaces/drugstores/drugstores.interface';
import { StoreServiceTypeList } from '../../../../models/operations-stores-service-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationsStoresEditionActionsStoreService } from '../../stores/operations-stores-edition-actions-store.service';

@Component({
    selector: 'app-operations-stores-edition-home',
    templateUrl: './operations-stores-edition-home.component.html',
    styleUrls: ['./operations-stores-edition-home.component.scss']
})
export class OperationsStoresEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private serviceTypeName = CDeliveryServiceTypeName;
    public deliveryServiceType = EDeliveryServiceType;

    public storeDetail: StoreDetail;
    public storeServiceTypeList: StoreServiceTypeList;

    public errorResponse: HttpErrorResponse;
    public homeEditionLoader = true;
    public saveEditionLoader: boolean;
    public updateEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        @SkipSelf() private _operationsStoresEditionActionsStore: OperationsStoresEditionActionsStoreService,
        private _dialogTwoActions: DialogTwoActionsService,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _alert: AlertService,
    ) {
    }

    ngOnInit(): void {
        this.updateStoreDetail();
        this.getStoreDetail();
    }

    updateStoreDetail() {
        const subscription = this._operationsStoresEditionStore.updateStoreDetail$
            .subscribe(() => {
                this.updateEditionLoader = true;
            });
        this.subscriptions.push(subscription);
    }

    getStoreDetail() {
        const subscription = this._operationsStoresEditionStore.storeDetail$
            .subscribe((storeDetail: StoreDetail) => {
                if (storeDetail instanceof StoreDetail) {
                    this.storeDetail = storeDetail;
                    this.storeServiceTypeList = new StoreServiceTypeList(storeDetail.serviceTypeList);
                } else {
                    this.storeDetail = null;
                    this.storeServiceTypeList = null;
                    this.errorResponse = storeDetail;
                }
                this.homeEditionLoader = false;
                this.saveEditionLoader = false;
                this.updateEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    setTabSettingsSelectionIndex(index) {
        this._operationsStoresEditionActionsStore.tabSettingSelection = index;
    }

    get tabSettingsSelectionIndex(): number {
        return this._operationsStoresEditionActionsStore.tabSettingSelection;
    }

    editStore() {
        this._router.navigate([ROUTER_PATH.opStores_StoreEdition(this.storeDetail.code)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const serviceTypePath = ROUTER_PATH.opStores_StoreServiceTypeEdition(
            this.storeDetail.code,
            CDeliveryServiceTypeRoute[serviceType],
        );
        this._router.navigate([serviceTypePath]);
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        const subscription = this._dialogTwoActions.openInfo({
                title: `Añadir servicio ${this.serviceTypeName[serviceType]}`,
                description: `¿Deseas añadir ${this.serviceTypeName[serviceType]} al local ${this.storeDetail.name}?`,
                primaryAction: 'Añadir servicio',
                secondaryAction: 'Cancelar'
            }
        )
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
        } as IDrugstoreServiceTypeRegister;

        this._operationsStoresImplement.postStoreServiceType(storeServiceTypRegister)
            .subscribe(() => {
                this.saveEditionLoader = true;
                this._operationsStoresEditionStore.updateStoreDetail = true;
                this._alert.alertSuccess(OperationMessages.successServiceTypeRegistered(this.serviceTypeName[serviceType], this.storeDetail.name));
            }, () => {
                this._alert.alertError(OperationMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType], this.storeDetail.name));
            });
    }

    editAffiliatedZone(zoneCode: string) {
        this._router.navigate([ROUTER_PATH.opZones_Zone(zoneCode)]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
