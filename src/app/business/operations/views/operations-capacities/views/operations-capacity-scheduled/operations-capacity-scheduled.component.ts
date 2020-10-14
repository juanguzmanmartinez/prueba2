import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {OperationsCapacityScheduledStoreService} from './store/operations-capacity-scheduled-store.service';
import {OperationsCapacitiesStepGroupOrLocalService} from '../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {OperationsCapacitiesStepEditionModeService} from '../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {OperationsCapacitiesStepScheduledCapacityService} from '../../components/operations-capacities-step-scheduled-capacity/operations-capacities-step-scheduled-capacity.service';

@Component({
  selector: 'app-operations-capacity-scheduled',
  templateUrl: './operations-capacity-scheduled.component.html',
  styleUrls: ['./operations-capacity-scheduled.component.scss'],
  providers: [
    OperationsCapacityScheduledStoreService,
    OperationsCapacitiesStepGroupOrLocalService,
    OperationsCapacitiesStepEditionModeService,
    OperationsCapacitiesStepScheduledCapacityService
  ]
})
export class OperationsCapacityScheduledComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityScheduledStore: OperationsCapacityScheduledStoreService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    const subscription = combineLatest([
      this._operationsCapacityScheduledStore.operationsCapacityScheduledCancel$,
      this._operationsCapacityScheduledStore.operationsCapacityScheduledSave$
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
