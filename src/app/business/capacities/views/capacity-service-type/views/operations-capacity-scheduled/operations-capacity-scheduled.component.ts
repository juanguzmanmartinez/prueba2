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

@Component({
  selector: 'app-operations-capacity-scheduled',
  templateUrl: './operations-capacity-scheduled.component.html',
  styleUrls: ['./operations-capacity-scheduled.component.scss'],
})
export class CapacityScheduledComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  isConfigBase: boolean;
  drugStoreName: string;

  constructor(
    private _operationsCapacityScheduled: OperationsCapacityScheduledService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
