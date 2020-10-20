import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {OpCapacitiesLocalDefaultCapacityService} from './op-capacities-local-default-capacity.service';
import {Subscription} from 'rxjs';
import {CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity} from '../../models/operations-capacities-responses.model';
import {ECapacitiesServiceType} from '../../../../../../shared/models/capacities/capacities-service-type.model';

@Component({
  selector: 'app-op-capacities-local-default-capacity',
  templateUrl: './op-capacities-local-default-capacity.component.html',
  styleUrls: ['./op-capacities-local-default-capacity.component.scss']
})
export class OpCapacitiesLocalDefaultCapacityComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public capacitiesLocalList: CapacitiesLocal[] = [];
  public capacitiesLocalSelected: CapacitiesLocal;

  public capacityLocalServiceAmPm: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceExpress: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceScheduled: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceRet: CapacitiesLocalServiceDefaultCapacity;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesLocalDefaultCapacity: OpCapacitiesLocalDefaultCapacityService
  ) {
  }

  ngOnInit(): void {
    this.updateDefaultCapacityLocalList();
    this.updateDefaultCapacityLocalServiceList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateDefaultCapacityLocalList() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalList$
      .subscribe((capacitiesLocalList) => {
        this.capacitiesLocalList = capacitiesLocalList;
        this.changeCapacitiesLocalSelection(capacitiesLocalList[0]);
      });
    this.subscriptions.push(subscription);
  }

  changeCapacitiesLocalSelection(capacitiesLocal: CapacitiesLocal) {
    this.capacitiesLocalSelected = capacitiesLocal;
    this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalSelection = capacitiesLocal;
    this.resetLocalServiceList();
  }

  updateDefaultCapacityLocalServiceList() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalServiceList$
      .subscribe((localServiceList: CapacitiesLocalServiceDefaultCapacity[]) => {
        this.resetLocalServiceList();
        localServiceList.forEach((localService) => {
          switch (localService.serviceType) {
            case ECapacitiesServiceType.amPm:
              this.capacityLocalServiceAmPm = localService;
              break;
            case ECapacitiesServiceType.express:
              this.capacityLocalServiceExpress = localService;
              break;
            case ECapacitiesServiceType.scheduled:
              this.capacityLocalServiceScheduled = localService;
              break;
            case ECapacitiesServiceType.ret:
              this.capacityLocalServiceRet = localService;
              break;
          }
        });
      });
    this.subscriptions.push(subscription);
  }

  resetLocalServiceList() {
    this.capacityLocalServiceAmPm = null;
    this.capacityLocalServiceExpress = null;
    this.capacityLocalServiceScheduled = null;
    this.capacityLocalServiceRet = null;
  }
}
