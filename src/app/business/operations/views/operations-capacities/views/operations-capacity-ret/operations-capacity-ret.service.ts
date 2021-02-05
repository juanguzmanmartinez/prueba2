import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { OpCapacitiesStepGroupOrLocalService } from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OperationsCapacityRetStoreService } from './store/operations-capacity-ret-store.service';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';

@Injectable()
export class OperationsCapacityRetService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityRetStore: OperationsCapacityRetStoreService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _router: Router,
  ) {
    this.updateWhenSaveOrCancelService();
  }

  updateWhenSaveOrCancelService() {
    const subscription = combineLatest([
      this._operationsCapacityRetStore.operationsCapacityRetCancel$,
      this._operationsCapacityRetStore.operationsCapacityRetSave$
    ])
      .subscribe(([save, cancel]) => {
        if (save || cancel) {
          this._router.navigate([CONCAT_PATH.operationCapacities]);
        }
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  set serviceQueryParams(serviceQueryParams: IOpCapacitiesServiceTypeQueryParams) {
    if (serviceQueryParams.groupOrLocal) {
      this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalTabSelection = serviceQueryParams.groupOrLocal;
    }
    if (serviceQueryParams.groupOrLocal && serviceQueryParams.localCode) {
      this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalSelection = {fulfillmentCenterCode: serviceQueryParams.localCode} as ICustomSelectOption;
      this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalSelectionSaved = true;
    }
    if (serviceQueryParams.groupOrLocal && serviceQueryParams.localCode && serviceQueryParams.editionMode) {
      this._opCapacitiesStepEditionMode.defaultEditionModeSelection = serviceQueryParams.editionMode;
      this._opCapacitiesStepEditionMode.defaultEditionModeSelectionSaved = true;
    }
  }
}
