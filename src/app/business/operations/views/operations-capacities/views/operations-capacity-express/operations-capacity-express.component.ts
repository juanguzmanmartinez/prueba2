import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {OperationsCapacityExpressStoreService} from './store/operations-capacity-express-store.service';
import {OperationsCapacitiesStepGroupOrLocalService} from '../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {OperationsCapacitiesStepEditionModeService} from '../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {OperationsCapacitiesStepExpressResourceService} from '../../components/operations-capacities-step-express-resource/operations-capacities-step-express-resource.service';

@Component({
  selector: 'app-operations-capacity-express',
  templateUrl: './operations-capacity-express.component.html',
  styleUrls: ['./operations-capacity-express.component.scss'],
  providers: [
    OperationsCapacityExpressStoreService,
    OperationsCapacitiesStepGroupOrLocalService,
    OperationsCapacitiesStepEditionModeService,
    OperationsCapacitiesStepExpressResourceService
  ]
})
export class OperationsCapacityExpressComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityExpressStore: OperationsCapacityExpressStoreService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    const subscription = combineLatest([
      this._operationsCapacityExpressStore.operationsCapacityExpressCancel$,
      this._operationsCapacityExpressStore.operationsCapacityExpressSave$
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
