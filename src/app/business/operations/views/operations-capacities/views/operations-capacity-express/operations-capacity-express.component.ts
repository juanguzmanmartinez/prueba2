import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsCapacityExpressStoreService } from './store/operations-capacity-express-store.service';
import { OpCapacitiesStepGroupOrLocalService } from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
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
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepExpressResourceService
  ]
})
export class OperationsCapacityExpressComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityExpress: OperationsCapacityExpressService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const subscription = this._activatedRoute.queryParams
      .subscribe((serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityExpress.serviceQueryParams = serviceTypeQueryParams;
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
