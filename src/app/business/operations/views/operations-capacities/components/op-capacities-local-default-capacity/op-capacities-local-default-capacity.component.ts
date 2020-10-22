import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {OpCapacitiesLocalDefaultCapacityService} from './op-capacities-local-default-capacity.service';
import {Subscription} from 'rxjs';
import {CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType} from '../../models/operations-capacities-responses.model';
import {CCapacitiesServiceTypeRoute, ECapacitiesServiceType} from '../../../../../../shared/models/capacities/capacities-service-type.model';
import {OpCapacitiesLocalDefaultCapacityDialogService} from '../op-capacities-local-default-capacity-dialog/op-capacities-local-default-capacity-dialog.service';
import {Router} from '@angular/router';
import {ECapacityStepGroupOrLocal} from '../op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode} from '../op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {IOpCapacitiesServiceTypeQueryParams} from '../../models/operations-capacities-service-type-query-params.model';

@Component({
  selector: 'app-op-capacities-local-default-capacity',
  templateUrl: './op-capacities-local-default-capacity.component.html',
  styleUrls: ['./op-capacities-local-default-capacity.component.scss'],
  providers: [
    OpCapacitiesLocalDefaultCapacityDialogService
  ]
})
export class OpCapacitiesLocalDefaultCapacityComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public capacitiesServiceType = ECapacitiesServiceType;
  public capacitiesLocalList: CapacitiesLocal[] = [];
  public capacitiesLocalSelection: CapacitiesLocal;
  public localDefaultCapacitySelection: CapacitiesLocalServiceDefaultCapacity;
  public capacitiesServiceTypeSelection: CapacitiesServiceType;

  public capacityLocalServiceAmPm: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceExpress: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceScheduled: CapacitiesLocalServiceDefaultCapacity;
  public capacityLocalServiceRet: CapacitiesLocalServiceDefaultCapacity;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesLocalDefaultCapacity: OpCapacitiesLocalDefaultCapacityService,
    private _opCapacitiesLocalDefaultCapacityDialog: OpCapacitiesLocalDefaultCapacityDialogService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateDefaultCapacityLocalList();
    this.updateDefaultCapacityLocalServiceList();
    this.updateLocalCapacitiesServiceType();
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
    this.capacitiesLocalSelection = capacitiesLocal;
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

  updateLocalCapacitiesServiceType() {
    const subscription = this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityList$
      .subscribe((capacitiesServiceType: CapacitiesServiceType) => {
        this.capacitiesServiceTypeSelection = capacitiesServiceType;
        this.openServiceDefaultCapacity();
      });
    this.subscriptions.push(subscription);
  }

  openServiceDefaultCapacity() {
    const serviceDefaultCapacityDialogRef = this._opCapacitiesLocalDefaultCapacityDialog
      .openServiceDefaultCapacityDialog(
        this.capacitiesLocalSelection,
        this.localDefaultCapacitySelection,
        this.capacitiesServiceTypeSelection
      );
    const subscription = serviceDefaultCapacityDialogRef.afterClosed()
      .subscribe((editService) => {
        if (editService) {
          this.localDefaultCapacityEditService(this.localDefaultCapacitySelection);
        }
      });
    this.subscriptions.push(subscription);
  }


  localDefaultCapacityViewMore(localService: CapacitiesLocalServiceDefaultCapacity) {
    this.localDefaultCapacitySelection = localService;
    this._opCapacitiesLocalDefaultCapacity.localDefaultCapacityLocalServiceTypeSelection = localService;
  }

  localDefaultCapacityEditService(localService: CapacitiesLocalServiceDefaultCapacity) {
    const localServiceTypePath = `/operaciones/capacidades/${CCapacitiesServiceTypeRoute[localService.serviceType]}`;
    const localServiceTypeParams = {
      groupOrLocal: ECapacityStepGroupOrLocal.local,
      localCode: this.capacitiesLocalSelection.localCode,
      editionMode: ECapacitiesStepEditionMode.default
    } as IOpCapacitiesServiceTypeQueryParams;
    this._router.navigate([localServiceTypePath], {queryParams: localServiceTypeParams});
  }
}
