import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { OpCapacitiesStepGroupOrDrugstoreService } from '../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OperationsCapacityExpressStoreService } from './store/operations-capacity-express-store.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Injectable()
export class OperationsCapacityExpressService implements OnDestroy {

  private subscriptions = new Subscription();

  set serviceQueryParams(serviceQueryParams: IOpCapacitiesServiceTypeQueryParams) {
    if (serviceQueryParams.groupOrDrugstore) {
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreTabSelection = serviceQueryParams.groupOrDrugstore;
    }
    if (serviceQueryParams.groupOrDrugstore && serviceQueryParams.drugstoreCode) {
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection = {fulfillmentCenterCode: serviceQueryParams.drugstoreCode, text: serviceQueryParams.drugstoreName} as ICustomSelectOption;
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelectionSaved = true;
    }
    if (serviceQueryParams.groupOrDrugstore && serviceQueryParams.drugstoreCode && serviceQueryParams.editionMode) {
      this._opCapacitiesStepEditionMode.defaultEditionModeSelection = serviceQueryParams.editionMode;
      this._opCapacitiesStepEditionMode.defaultEditionModeSelectionSaved = true;
    }
  }

  constructor(
    private _operationsCapacityExpressStore: OperationsCapacityExpressStoreService,
    private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _router: Router,
  ) {
    this.updateWhenSaveOrCancelService();
  }

  updateWhenSaveOrCancelService() {
    const subscription = combineLatest([
      this._operationsCapacityExpressStore.operationsCapacityExpressCancel$,
      this._operationsCapacityExpressStore.operationsCapacityExpressSave$
    ])
      .subscribe(([save, cancel]) => {
        if (save || cancel) {
          this._router.navigate([ROUTER_PATH.capacities]);
        }
      });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
