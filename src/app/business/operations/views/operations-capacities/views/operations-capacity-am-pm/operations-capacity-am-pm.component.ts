import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {OperationsCapacityAmPmStoreService} from './store/operations-capacity-am-pm-store.service';
import {OpCapacitiesStepGroupOrLocalService} from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {OpCapacitiesStepEditionModeService} from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {OpCapacitiesStepAmPmCapacityService} from '../../components/op-capacities-step-am-pm-capacity/op-capacities-step-am-pm-capacity.service';
import {IOpCapacitiesServiceTypeQueryParams} from '../../models/operations-capacities-service-type-query-params.model';
import {OperationsCapacityAmPmService} from './operations-capacity-am-pm.service';
import {objectHasElements} from '../../../../../../shared/helpers/objects-equal';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss'],
  providers: [
    OperationsCapacityAmPmService,
    OperationsCapacityAmPmStoreService,
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepAmPmCapacityService,
  ]
})
export class OperationsCapacityAmPmComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityAmPm: OperationsCapacityAmPmService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const subscription = this._activatedRoute.queryParams
      .subscribe((serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityAmPm.serviceQueryParams = serviceTypeQueryParams;
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
