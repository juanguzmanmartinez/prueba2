import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsCapacityRetStoreService } from './store/operations-capacity-ret-store.service';
import { OpCapacitiesStepGroupOrDrugstoreService } from '../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepCapacityTableService } from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { OperationsCapacityRetService } from './operations-capacity-ret.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { objectHasElements } from '@helpers/objects-equal.helper';
import { OpCapacitiesStepExpressResourceService } from '../../components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

@Component({
  selector: 'app-operations-capacity-ret',
  templateUrl: './operations-capacity-ret.component.html',
  styleUrls: ['./operations-capacity-ret.component.scss'],
  providers: [
    OperationsCapacityRetService,
    OperationsCapacityRetStoreService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService,
  ],
})
export class CapacityRetComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  isConfigBase: boolean;
  drugStoreName: string;

  constructor(
    private _operationsCapacityRet: OperationsCapacityRetService,
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
          this._operationsCapacityRet.serviceQueryParams =
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
