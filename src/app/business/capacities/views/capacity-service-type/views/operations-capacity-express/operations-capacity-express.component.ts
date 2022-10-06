import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsCapacityExpressStoreService } from './store/operations-capacity-express-store.service';
import { OpCapacitiesStepGroupOrDrugstoreService } from '../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepExpressResourceService } from '../../components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { objectHasElements } from '@helpers/objects-equal.helper';
import { OperationsCapacityExpressService } from './operations-capacity-express.service';

@Component({
  selector: 'app-operations-capacity-express',
  templateUrl: './operations-capacity-express.component.html',
  styleUrls: ['./operations-capacity-express.component.scss'],
  providers: [
    OperationsCapacityExpressService,
    OperationsCapacityExpressStoreService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepExpressResourceService,
  ],
})
export class CapacityExpressComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  isConfigBase: boolean;
  drugStoreName: string;

  constructor(
    private _operationsCapacityExpress: OperationsCapacityExpressService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const subscription = this._activatedRoute.queryParams.subscribe(
      (serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        this.mode = serviceTypeQueryParams.mode == undefined ? false : true;
        this.isConfigBase = serviceTypeQueryParams.configBase;
        this.drugStoreName = serviceTypeQueryParams.drugstoreName;
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityExpress.serviceQueryParams =
            serviceTypeQueryParams;
        }
      }
    );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
