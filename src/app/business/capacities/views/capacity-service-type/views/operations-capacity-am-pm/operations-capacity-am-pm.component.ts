import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { OperationsCapacityAmPmService } from './operations-capacity-am-pm.service';
import { objectHasElements } from '@helpers/objects-equal.helper';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss'],
})
export class CapacityAmPmComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  mode: boolean = false;
  isConfigBase: boolean;
  drugStoreName: string;

  constructor(
    private _operationsCapacityAmPm: OperationsCapacityAmPmService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const subscription = this._activatedRoute.queryParams.subscribe(
      (serviceTypeQueryParams: IOpCapacitiesServiceTypeQueryParams) => {
        this.mode = serviceTypeQueryParams.mode == undefined ? false : true;
        this.isConfigBase = serviceTypeQueryParams.configBase;
        this.drugStoreName = serviceTypeQueryParams.drugstoreName;

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
