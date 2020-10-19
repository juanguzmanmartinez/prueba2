import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OperationsCapacityRetStoreService } from './store/operations-capacity-ret-store.service';
import { OpCapacitiesStepGroupOrLocalService } from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { OpCapacitiesStepEditionModeService } from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepCapacityTableService } from '../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';

@Component({
  selector: 'app-operations-capacity-ret',
  templateUrl: './operations-capacity-ret.component.html',
  styleUrls: ['./operations-capacity-ret.component.scss'],
  providers: [
    OperationsCapacityRetStoreService,
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepCapacityTableService
  ]
})
export class OperationsCapacityRetComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityRetStore: OperationsCapacityRetStoreService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    const subscription = combineLatest([
      this._operationsCapacityRetStore.operationsCapacityRetCancel$,
      this._operationsCapacityRetStore.operationsCapacityRetSave$
    ])
      .subscribe(([save, cancel]) => {
        if (save || cancel) {
          this._router.navigate(['/operaciones/capacidades']);
        }
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
