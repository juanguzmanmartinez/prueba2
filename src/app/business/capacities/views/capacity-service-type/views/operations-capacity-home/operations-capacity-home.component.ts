import { Component, OnDestroy } from '@angular/core';
import { OperationsCapacityHomeStoreService } from './store/operations-capacity-home-store.service';
import { OpCapacitiesDrugstoreDefaultCapacityService } from '../../components/op-capacities-drugstore-default-capacity/op-capacities-drugstore-default-capacity.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { DrugStoreServiceStore } from '../../store/drug-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations-capacity-home',
  templateUrl: './operations-capacity-home.component.html',
  styleUrls: ['./operations-capacity-home.component.scss'],
  providers: [
    OperationsCapacityHomeStoreService,
    OpCapacitiesDrugstoreDefaultCapacityService,
  ],
})
export class CapacityHomeComponent {
  public routerPath = ROUTER_PATH;

  constructor(
    private _router: Router,
    private _operationsCapacityHomeStoreService: OperationsCapacityHomeStoreService
  ) {}

  chargeCapacities() {
    this._router.navigate([`${ROUTER_PATH.capacitiesServiceType}/upload`]);
  }
}
