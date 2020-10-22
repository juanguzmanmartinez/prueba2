import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {OperationsCapacityScheduledStoreService} from './store/operations-capacity-scheduled-store.service';
import {OpCapacitiesStepGroupOrLocalService} from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {OpCapacitiesStepEditionModeService} from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {OpCapacitiesStepCapacityTableService} from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import {OperationsCapacityScheduledService} from './operations-capacity-scheduled.service';
import {IOpCapacitiesServiceTypeQueryParams} from '../../models/operations-capacities-service-type-query-params.model';
import {objectHasElements} from '../../../../../../shared/helpers/objects-equal';

@Component({
  selector: 'app-operations-capacity-scheduled',
  templateUrl: './operations-capacity-scheduled.component.html',
  styleUrls: ['./operations-capacity-scheduled.component.scss'],
  providers: [
    OperationsCapacityScheduledService,
    OperationsCapacityScheduledStoreService,
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService
  ]
})
export class OperationsCapacityScheduledComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityScheduled: OperationsCapacityScheduledService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const subscription = this._activatedRoute.queryParams
      .subscribe((serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityScheduled.serviceQueryParams = serviceTypeQueryParams;
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
