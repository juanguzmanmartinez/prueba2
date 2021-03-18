import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import { CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity } from '../../../models/operations-capacities-responses.model';
import { OpCapacitiesLocalDefaultCapacityService } from '../../../components/op-capacities-local-default-capacity/op-capacities-local-default-capacity.service';
import { ECapacitiesStepEditionMode } from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';


@Injectable()
export class OperationsCapacityHomeStoreService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  private capacitiesLocalSelection: CapacitiesLocal;

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    private _opCapacitiesLocalDefaultCapacity: OpCapacitiesLocalDefaultCapacityService,
    private  _alertService: AlertService,
  ) {
    this.getLocalList();
    this.getLocalSelection();
    this.getLocalServiceTypeSelection();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getLocalList() {
    this._operationsCapacityImplement.getLocalImplement$()
      .subscribe((capacitiesLocalList: CapacitiesLocal[]) => {
        this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalList = capacitiesLocalList;
      });
  }

  getLocalSelection() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalSelection$
      .subscribe((capacityLocalSelection: CapacitiesLocal) => {
        this.capacitiesLocalSelection = capacityLocalSelection;
        this.getLocalAvailableServices(capacityLocalSelection);
      });
    this.subscriptions.push(subscription);
  }


  getLocalAvailableServices(capacityLocal: CapacitiesLocal) {
    this._operationsCapacityImplement.getCalendarDefaultCapacitiesImplement$(capacityLocal)
      .subscribe((serviceDefaultCapacityList: CapacitiesLocalServiceDefaultCapacity[]) => {
        this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalServiceList = serviceDefaultCapacityList;
      });

  }

  getLocalServiceTypeSelection() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalServiceTypeSelection$
      .subscribe((localService: CapacitiesLocalServiceDefaultCapacity) => {
        const localSelection = {fulfillmentCenterCode: this.capacitiesLocalSelection.localCode} as ICustomSelectOption;

        this._operationsCapacityImplement.getTypeOperationImplements$(
          ECapacitiesStepEditionMode.default, localSelection, localService.serviceType)
          .subscribe((capacitiesServiceType) => {
            this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityList = capacitiesServiceType;
          });
      });
    this.subscriptions.push(subscription);
  }

}
