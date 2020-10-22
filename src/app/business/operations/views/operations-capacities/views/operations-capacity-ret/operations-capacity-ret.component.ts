import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { OperationsCapacityRetStoreService } from './store/operations-capacity-ret-store.service';
import { OpCapacitiesStepGroupOrLocalService } from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepCapacityTableService } from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import {OperationsCapacityRetService} from './operations-capacity-ret.service';
import {IOpCapacitiesServiceTypeQueryParams} from '../../models/operations-capacities-service-type-query-params.model';
import {objectHasElements} from '../../../../../../shared/helpers/objects-equal';

@Component({
  selector: 'app-operations-capacity-ret',
  templateUrl: './operations-capacity-ret.component.html',
  styleUrls: ['./operations-capacity-ret.component.scss'],
  providers: [
    OperationsCapacityRetService,
    OperationsCapacityRetStoreService,
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService
  ]
})
export class OperationsCapacityRetComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityRet: OperationsCapacityRetService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const subscription = this._activatedRoute.queryParams
      .subscribe((serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityRet.serviceQueryParams = serviceTypeQueryParams;
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
