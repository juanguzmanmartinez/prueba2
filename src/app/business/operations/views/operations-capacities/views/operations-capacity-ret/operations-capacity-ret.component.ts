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

@Component({
  selector: 'app-operations-capacity-ret',
  templateUrl: './operations-capacity-ret.component.html',
  styleUrls: ['./operations-capacity-ret.component.scss'],
  providers: [
    OperationsCapacityRetService,
    OperationsCapacityRetStoreService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService
  ]
})
export class OperationsCapacityRetComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  constructor(
    private _operationsCapacityRet: OperationsCapacityRetService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const subscription = this._activatedRoute.queryParams
      .subscribe((serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        if (objectHasElements(serviceTypeQueryParams)) {
          this._operationsCapacityRet.serviceQueryParams = serviceTypeQueryParams;
        }
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
