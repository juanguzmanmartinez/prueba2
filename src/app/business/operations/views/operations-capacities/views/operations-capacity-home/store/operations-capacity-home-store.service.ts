import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {OperationsCapacitiesImplementService} from '../../../services/operations-capacities-implement.service';
import {CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity} from '../../../models/operations-capacities-responses.model';
import {OpCapacitiesLocalDefaultCapacityService} from '../../../components/op-capacities-local-default-capacity/op-capacities-local-default-capacity.service';


@Injectable()
export class OperationsCapacityHomeStoreService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    private _opCapacitiesLocalDefaultCapacity: OpCapacitiesLocalDefaultCapacityService,
    private  _alertService: AlertService,
  ) {
    this.getLocalList();
    this.getLocalSelection();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getLocalList() {
    this._operationsCapacityImplement.getLocalImplement$()
      .subscribe((capacitiesLocalList: CapacitiesLocal[]) => {
        this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalList = capacitiesLocalList;
      });
  }

  getLocalSelection() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalSelection$
      .subscribe((capacityLocal: CapacitiesLocal) => {
        this.getLocalAvailableServices(capacityLocal);
      });
    this.subscriptions.push(subscription);
  }


  getLocalAvailableServices(capacityLocal: CapacitiesLocal) {
    this._operationsCapacityImplement.getCalendarDefaultCapacitiesImplement$(capacityLocal)
      .subscribe((serviceDefaultCapacityList: CapacitiesLocalServiceDefaultCapacity[]) => {
        this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalServiceList = serviceDefaultCapacityList;
      });

  }

}
