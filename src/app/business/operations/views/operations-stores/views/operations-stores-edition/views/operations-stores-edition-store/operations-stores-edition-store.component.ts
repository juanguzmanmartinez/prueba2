import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { parseUrl } from '@helpers/parse-url.helper';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { OperationsStoresEditionStoreService } from '../../stores/operations-stores-edition-store.service';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { ECompany } from '@models/company/company.model';
import { IStoreDetailUpdate } from '@interfaces/stores/stores.interface';

@Component({
    selector: 'app-operations-stores-edition-store',
    templateUrl: './operations-stores-edition-store.component.html',
    styleUrls: ['./operations-stores-edition-store.component.scss']
})
export class OperationsStoresEditionStoreComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public storeDetail: StoreDetail;
    public companyList: ECompany[] = [];

    public storeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsStoresEditionStore: OperationsStoresEditionStoreService,
        private _operationsStoresImplement: OperationsStoresImplementService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getStoreDetail();
        this.getCompanyList();
    }

    getStoreDetail() {
        const subscription = this._operationsStoresEditionStore.storeDetail$
            .subscribe((storeDetail: StoreDetail) => {
                this.storeDetail = storeDetail;
                this.storeEditionLoader = false;
            }, () => {
                this.storeDetail = null;
                this.storeEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    putStoreDetail(storeDetailUpdate: IStoreDetailUpdate) {
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

    getCompanyList() {
        this._operationsStoresImplement.companyList
            .subscribe((companyList: ECompany[]) => {
                this.companyList = companyList;
            });
    }

    cancelEdition() {
        this.backRoute();
    }

    saveEdition(storeDetailUpdate: IStoreDetailUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogConfirmChanges.open()
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
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

    storeListRoute() {
        this._router.navigate([CONCAT_PATH.operationStores]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
