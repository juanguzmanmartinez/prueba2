import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsCapacityScheduledStoreService } from './store/operations-capacity-scheduled-store.service';
import { OpCapacitiesStepGroupOrDrugstoreService } from '../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepCapacityTableService } from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { OperationsCapacityScheduledService } from './operations-capacity-scheduled.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { objectHasElements } from '@helpers/objects-equal.helper';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import { OpCapacitiesStepExpressResourceService } from '../../components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';

@Component({
  selector: 'app-operations-capacity-scheduled',
  templateUrl: './operations-capacity-scheduled.component.html',
  styleUrls: ['./operations-capacity-scheduled.component.scss'],
  providers: [
    OperationsCapacityScheduledService,
    OperationsCapacityScheduledStoreService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService,
  ],
})
export class CapacityScheduledComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  isConfigBase: boolean;
  drugStoreName: string;
  serviceType = EDeliveryServiceType.scheduled;

  constructor(
    private _operationsCapacityScheduled: OperationsCapacityScheduledService,
    private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    private _opCapacitiesStepAmPmCapacity: OpCapacitiesStepCapacityTableService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initConfig();
    const subscription = this._activatedRoute.queryParams.subscribe(
      (serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        this.mode = serviceTypeQueryParams.mode == undefined ? false : true;
        this.isConfigBase = serviceTypeQueryParams.configBase;
        this.drugStoreName = serviceTypeQueryParams.drugstoreName;
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityScheduled.serviceQueryParams =
            serviceTypeQueryParams;
        }
      }
    );
    this.subscriptions.add(subscription);
  }

  initConfig() {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus =
      ECapacityStepStatus.open;
    this._opCapacitiesStepEditionMode.editionModeStepStatus =
      ECapacityStepStatus.disabled;
    this._opCapacitiesStepExpressResource.expressResourceStepStatus =
      ECapacityStepStatus.disabled;
    this._opCapacitiesStepAmPmCapacity.capacityTableStepStatus =
      ECapacityStepStatus.disabled;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
