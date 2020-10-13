import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {OperationsCapacityAmPmStoreService} from './store/operations-capacity-am-pm-store.service';
import {OperationsCapacitiesStepGroupOrLocalService} from '../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {OperationsCapacitiesStepEditionModeService} from '../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {OperationsCapacitiesStepAmPmCapacityService} from '../../components/operations-capacities-step-am-pm-capacity/operations-capacities-step-am-pm-capacity.service';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss'],
  providers: [
    OperationsCapacityAmPmStoreService,
    OperationsCapacitiesStepGroupOrLocalService,
    OperationsCapacitiesStepEditionModeService,
    OperationsCapacitiesStepAmPmCapacityService,
  ]
})
export class OperationsCapacityAmPmComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityAmPmStoreService: OperationsCapacityAmPmStoreService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    const subscription = combineLatest([
      this._operationsCapacityAmPmStoreService.operationsCapacityAmPmCancel$,
      this._operationsCapacityAmPmStoreService.operationsCapacityAmPmSave$
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
