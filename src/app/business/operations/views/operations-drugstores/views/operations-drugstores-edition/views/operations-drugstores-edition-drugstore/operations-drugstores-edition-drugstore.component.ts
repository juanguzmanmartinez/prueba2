import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsDrugstoresImplementService } from '../../../../implements/operations-drugstores-implement.service';
import { OperationsDrugstoresEditionStoreService } from '../../stores/operations-drugstores-edition-store.service';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { ECompany } from '@models/company/company.model';
import { IDrugstoreDetailUpdate } from '@interfaces/drugstores/drugstores.interface';
import { RouterHelperService } from '@helpers/router-helper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operations-drugstores-edition-drugstore',
  templateUrl: './operations-drugstores-edition-drugstore.component.html',
  styleUrls: ['./operations-drugstores-edition-drugstore.component.scss']
})
export class OperationsDrugstoresEditionDrugstoreComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public drugstoreDetail: DrugstoreDetail;
  public companyList: ECompany[] = [];

  public errorResponse: HttpErrorResponse;
  public drugstoreEditionLoader = true;
  public saveEditionLoader: boolean;

  constructor(
    private _router: Router,
    @SkipSelf() private _operationsDrugstoresEditionStore: OperationsDrugstoresEditionStoreService,
    private _operationsDrugstoresImplement: OperationsDrugstoresImplementService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _alert: AlertService,
    private _routerHelper: RouterHelperService
  ) { }

  ngOnInit(): void {
    this.getDrugstoreDetail();
  }

  getDrugstoreDetail(): void {
    const subscription = this._operationsDrugstoresEditionStore.storeDetail$
      .subscribe((drugstoreDetail: DrugstoreDetail) => {
        this.drugstoreDetail = drugstoreDetail;
        this.drugstoreEditionLoader = false;
        if (drugstoreDetail instanceof DrugstoreDetail) {
          this.drugstoreDetail = drugstoreDetail;
          this.settingData();
        } else {
          this.drugstoreDetail = null;
          this.drugstoreEditionLoader = false;
          this.errorResponse = drugstoreDetail;
        }

      });
    this.subscriptions.add(subscription);
  }

  settingData(): void {
    this._operationsDrugstoresImplement.companyList
      .subscribe((companyList: ECompany[]) => {
        this.companyList = companyList;
      }, (error) => {
        this.errorResponse = error;
      }, () => {
        this.drugstoreEditionLoader = false;
      });
  }

  putStoreDetail(iDrugstoreDetailUpdate: IDrugstoreDetailUpdate): void {
    this._operationsDrugstoresImplement.putDrugstoreDetail(
      this.drugstoreDetail.code, iDrugstoreDetailUpdate)
      .subscribe(() => {
        this._operationsDrugstoresEditionStore.updateDrugstoreDetail = true;
        this._alert.alertSuccess(OperationMessages.successOperationEdition(this.drugstoreDetail.name));
        this.backRoute();
      }, () => {
        this._alert.alertError(OperationMessages.errorOperationEdition(this.drugstoreDetail.name));
        this.backRoute();
      });
  }

  cancelEdition(): void {
    this.backRoute();
  }

  saveEdition(iDrugstoreDetailUpdate: IDrugstoreDetailUpdate): void {
    this.saveEditionLoader = true;
    const subscription = this._dialogTwoActions.openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.putStoreDetail(iDrugstoreDetailUpdate);
        } else {
          this.saveEditionLoader = false;
        }
      });
    this.subscriptions.add(subscription);
  }

  backRoute(): void {
    this._routerHelper.backRoute();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
