import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { OpCapacitiesStepGroupOrLocalService } from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OperationsCapacityScheduledStoreService } from './store/operations-capacity-scheduled-store.service';

@Injectable()
export class OperationsCapacityScheduledService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityScheduledStore: OperationsCapacityScheduledStoreService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _router: Router,
  ) {
    this.updateWhenSaveOrCancelService();
  }

  updateWhenSaveOrCancelService() {
    const subscription = combineLatest([
      this._operationsCapacityScheduledStore.operationsCapacityScheduledCancel$,
      this._operationsCapacityScheduledStore.operationsCapacityScheduledSave$
    ])
      .subscribe(([save, cancel]) => {
        if (save || cancel) {
          this._router.navigate(['/operaciones/capacidades']);
        }
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
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
