import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OperationsCapacityAmPmStoreService } from './store/operations-capacity-am-pm-store.service';
import { OpCapacitiesStepGroupOrDrugstoreService } from '../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepCapacityTableService } from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { OperationsCapacityAmPmService } from './operations-capacity-am-pm.service';
import { objectHasElements } from '@helpers/objects-equal.helper';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss'],
  providers: [
    OperationsCapacityAmPmService,
    OperationsCapacityAmPmStoreService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService,
  ],
})
export class CapacityAmPmComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  constructor(
    private _operationsCapacityAmPm: OperationsCapacityAmPmService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const subscription = this._activatedRoute.queryParams.subscribe(
      (serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        this.mode = serviceTypeQueryParams.mode == undefined ? false : true;
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityAmPm.serviceQueryParams =
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
