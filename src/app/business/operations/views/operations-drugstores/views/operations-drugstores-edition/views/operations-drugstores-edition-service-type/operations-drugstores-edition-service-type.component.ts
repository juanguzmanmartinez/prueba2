import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsDrugstoresEditionStoreService } from '../../stores/operations-drugstores-edition-store.service';
import { OperationsDrugstoresImplementService } from '../../../../implements/operations-drugstores-implement.service';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { Subscription } from 'rxjs';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { DrugstoreServiceType } from '../../../../models/operations-drugstores-service-type.model';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { IDrugstoreServiceTypeUpdate } from '@interfaces/drugstores/drugstores.interface';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';
import { RouterHelperService } from '@helpers/router-helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OP_DRUGSTORES_PATH } from '@parameters/router/routing/operations-routing.parameter';

@Component({
    selector: 'app-operations-drugstores-edition-service-type',
    templateUrl: './operations-drugstores-edition-service-type.component.html',
    styleUrls: ['./operations-drugstores-edition-service-type.component.scss']
})
export class OperationsDrugstoresEditionServiceTypeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public drugstoreDetail: DrugstoreDetail;
    public serviceType: EDeliveryServiceType;
    public drugstoreServiceType: DrugstoreServiceType;
    public paymentMethodList: EPaymentMethod[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;

    public errorResponse: HttpErrorResponse;
    public serviceTypeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @SkipSelf() private _operationsDrugstoresEditionStore: OperationsDrugstoresEditionStoreService,
        private _operationsDrugstoresImplement: OperationsDrugstoresImplementService,
        private _dialogTwoActions: DialogTwoActionsService,
        private _alert: AlertService,
        private _routerHelper: RouterHelperService,
    ) {
    }

    ngOnInit(): void {
        const serviceTypeCode = this._activatedRoute.snapshot.params[OP_DRUGSTORES_PATH.drugstoreServiceTypeEdition];
        this.serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => CDeliveryServiceTypeRoute[key] === serviceTypeCode) as EDeliveryServiceType;

        this.getDrugstoreDetail();
        this.setDrugstoreServiceType();
    }

    getDrugstoreDetail() {
        const subscription = this._operationsDrugstoresEditionStore.storeDetail$
            .subscribe((drugstoreDetail: DrugstoreDetail) => {
                if (drugstoreDetail instanceof DrugstoreDetail) {
                    this.drugstoreDetail = drugstoreDetail;
                    this.setDrugstoreServiceType();
                    this.getPaymentMethodList();
                } else {
                    this.drugstoreDetail = null;
                    this.serviceTypeEditionLoader = false;
                    this.errorResponse = drugstoreDetail;
                }
            });
        this.subscriptions.push(subscription);
    }

    getPaymentMethodList() {
        this._operationsDrugstoresImplement.paymentMethodList
            .subscribe((paymentMethodList: EPaymentMethod[]) => {
                this.paymentMethodList = paymentMethodList;
            }, (error) => {
                this.errorResponse = error;
                this.serviceTypeEditionLoader = false;
            });
    }

    putServiceType(iDrugstoreServiceTypeUpdate: IDrugstoreServiceTypeUpdate) {
        this._operationsDrugstoresImplement.putDrugstoreServiceType(
            `${this.drugstoreServiceType.id}`, iDrugstoreServiceTypeUpdate)
            .subscribe(() => {
                this._operationsDrugstoresEditionStore.updateDrugstoreDetail = true;
                this._alert.alertSuccess(OperationMessages.successServiceTypeEdition(
                    this.serviceTypeName[this.drugstoreServiceType.code], this.drugstoreDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorServiceTypeEdition(
                    this.serviceTypeName[this.drugstoreServiceType.code], this.drugstoreDetail.name));
                this.backRoute();
            });
    }

    saveEdition(iDrugstoreServiceTypeUpdate: IDrugstoreServiceTypeUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogTwoActions.openConfirmChanges()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putServiceType(iDrugstoreServiceTypeUpdate);
                } else {
                    this.saveEditionLoader = false;
                }
            });
        this.subscriptions.push(subscription);
    }

    cancelEdition() {
        this.backRoute();
    }

    private setDrugstoreServiceType() {
        this.drugstoreServiceType = this.drugstoreDetail?.serviceTypeList
            .find((serviceType: DrugstoreServiceType) => serviceType.code === this.serviceType);
        this.serviceTypeEditionLoader = !this.drugstoreDetail;

        if (!this.drugstoreServiceType && !this.serviceTypeEditionLoader) {
            this.errorResponse = new HttpErrorResponse({});
        }
    }

    backRoute() {
        this._routerHelper.backRoute();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
