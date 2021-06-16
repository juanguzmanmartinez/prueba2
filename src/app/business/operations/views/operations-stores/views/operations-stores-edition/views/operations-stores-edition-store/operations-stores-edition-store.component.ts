import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { OperationsStoresEditionStoreService } from '../../stores/operations-stores-edition-store.service';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { ECompany } from '@models/company/company.model';
import { IDrugstoreDetailUpdate } from '@interfaces/drugstores/drugstores.interface';
import { RouterHelperService } from '@helpers/router-helper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-operations-stores-edition-store',
    templateUrl: './operations-stores-edition-store.component.html',
    styleUrls: ['./operations-stores-edition-store.component.scss']
})
export class OperationsStoresEditionStoreComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public storeDetail: StoreDetail;
    public companyList: ECompany[] = [];

    public errorResponse: HttpErrorResponse;
    public storeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _dialogTwoActions: DialogTwoActionsService,
        private _alert: AlertService,
        private _routerHelper: RouterHelperService
    ) {
    }

    ngOnInit(): void {
        this.getStoreDetail();
    }

    getStoreDetail() {
        const subscription = this._operationsStoresEditionStore.storeDetail$
            .subscribe((storeDetail: StoreDetail) => {
                this.storeDetail = storeDetail;
                this.storeEditionLoader = false;
                if (storeDetail instanceof StoreDetail) {
                    this.storeDetail = storeDetail;
                    this.settingData();
                } else {
                    this.storeDetail = null;
                    this.storeEditionLoader = false;
                    this.errorResponse = storeDetail;
                }

            });
        this.subscriptions.push(subscription);
    }

    settingData() {
        this._operationsStoresImplement.companyList
            .subscribe((companyList: ECompany[]) => {
                this.companyList = companyList;
            }, (error) => {
                this.errorResponse = error;
            }, () => {
                this.storeEditionLoader = false;
            });
    }

    putStoreDetail(storeDetailUpdate: IDrugstoreDetailUpdate) {
        this._operationsStoresImplement.putStoreDetail(
            this.storeDetail.code, storeDetailUpdate)
            .subscribe(() => {
                this._operationsStoresEditionStore.updateStoreDetail = true;
                this._alert.alertSuccess(OperationMessages.successOperationEdition(this.storeDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorOperationEdition(this.storeDetail.name));
                this.backRoute();
            });
    }

    cancelEdition() {
        this.backRoute();
    }

    saveEdition(storeDetailUpdate: IDrugstoreDetailUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogTwoActions.openConfirmChanges()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putStoreDetail(storeDetailUpdate);
                } else {
                    this.saveEditionLoader = false;
                }
            });
        this.subscriptions.push(subscription);
    }

    backRoute() {
        this._routerHelper.backRoute();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
