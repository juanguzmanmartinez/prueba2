import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {OperationsCapacityAmPmStoreService} from './store/operations-capacity-am-pm-store.service';
import {OpCapacitiesStepGroupOrLocalService} from '../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {OpCapacitiesStepEditionModeService} from '../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {OpCapacitiesStepAmPmCapacityService} from '../../components/op-capacities-step-am-pm-capacity/op-capacities-step-am-pm-capacity.service';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss'],
  providers: [
    OperationsCapacityAmPmStoreService,
    OpCapacitiesStepGroupOrLocalService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepAmPmCapacityService,
  ]
})
export class OperationsCapacityAmPmComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityAmPmStore: OperationsCapacityAmPmStoreService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    const subscription = combineLatest([
      this._operationsCapacityAmPmStore.operationsCapacityAmPmCancel$,
      this._operationsCapacityAmPmStore.operationsCapacityAmPmSave$
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
