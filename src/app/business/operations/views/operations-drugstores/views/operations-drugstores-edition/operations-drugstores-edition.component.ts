import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsDrugstoresEditionStoreService } from './stores/operations-drugstores-edition-store.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsDrugstoresImplementService } from '../../implements/operations-drugstores-implement.service';
import { DrugstoreDetail } from '../../models/operations-drugstores.model';
import { OperationsDrugstoresEditionActionsStoreService } from './stores/operations-drugstores-edition-actions-store.service';
import { OP_DRUGSTORES_PATH } from '@parameters/router/routing/operations/operations-router.parameter';

@Component({
  template: '<router-outlet></router-outlet>',
  providers: [
    OperationsDrugstoresEditionStoreService,
    OperationsDrugstoresEditionActionsStoreService
  ]
})
export class OperationsDrugstoresEditionComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  private drugstoreCode: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _operationsStoresImplement: OperationsDrugstoresImplementService,
    private _operationsDrugstoresEditionStore: OperationsDrugstoresEditionStoreService,
    private _operationsDrugstoresEditionActionsStore: OperationsDrugstoresEditionActionsStoreService,
  ) {
  }

  ngOnInit(): void {
    const subscription = this._activatedRoute.paramMap.subscribe(() => {
      this.drugstoreCode = this._activatedRoute.snapshot.params[OP_DRUGSTORES_PATH.drugstoreCode];
      this._operationsDrugstoresEditionStore.updateDrugstoreDetail = true;
      this._operationsDrugstoresEditionActionsStore.resetStore();
    });
    this.updateDrugstoreDetail();
    this.subscriptions.add(subscription);
  }

  getDrugstoreDetail(drugstoreCode: string): void {
    this._operationsStoresImplement.getDrugstoreDetail(drugstoreCode)
      .subscribe((drugstoreDetail: DrugstoreDetail) => {
        this._operationsDrugstoresEditionStore.drugstoreDetail = drugstoreDetail;
      }, (error) => {
        this._operationsDrugstoresEditionStore.drugstoreDetailError = error;
      });
  }

  updateDrugstoreDetail(): void {
    const subscription = this._operationsDrugstoresEditionStore.updateDrugstoreDetail$
      .subscribe(() => {
        this.getDrugstoreDetail(this.drugstoreCode);
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
