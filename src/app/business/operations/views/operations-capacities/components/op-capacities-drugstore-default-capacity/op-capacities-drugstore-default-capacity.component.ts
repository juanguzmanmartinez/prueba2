import {
  Component,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { OpCapacitiesDrugstoreDefaultCapacityService } from './op-capacities-drugstore-default-capacity.service';
import { Subscription } from 'rxjs';
import {
  CapacitiesDrugstore,
  CapacitiesDrugstoreServiceDefaultCapacity,
  CapacitiesServiceType,
} from '../../models/operations-capacities-responses.model';
import {
  CDeliveryServiceTypeRoute,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import { OpCapacitiesDrugstoreDefaultCapacityDialogService } from '../op-capacities-drugstore-default-capacity-dialog/op-capacities-drugstore-default-capacity-dialog.service';
import { Router } from '@angular/router';
import { ECapacityStepGroupOrDrugstore } from '../op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ECapacitiesStepEditionMode } from '../op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-op-capacities-drugstore-default-capacity',
  templateUrl: './op-capacities-drugstore-default-capacity.component.html',
  styleUrls: ['./op-capacities-drugstore-default-capacity.component.scss'],
  providers: [OpCapacitiesDrugstoreDefaultCapacityDialogService],
})
export class OpCapacitiesDrugstoreDefaultCapacityComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  public capacitiesServiceType = EDeliveryServiceType;
  public capacitiesDrugstoreList: CapacitiesDrugstore[] = [];
  public capacitiesDrugstoreSelection: CapacitiesDrugstore;
  public drugstoreDefaultCapacitySelection: CapacitiesDrugstoreServiceDefaultCapacity;
  public capacitiesServiceTypeSelection: CapacitiesServiceType;
  public capacityDrugstoreServiceAmPm: CapacitiesDrugstoreServiceDefaultCapacity;
  public capacityDrugstoreServiceExpress: CapacitiesDrugstoreServiceDefaultCapacity;
  public capacityDrugstoreServiceScheduled: CapacitiesDrugstoreServiceDefaultCapacity;
  public capacityDrugstoreServiceRet: CapacitiesDrugstoreServiceDefaultCapacity;

  constructor(
    @Optional()
    @SkipSelf()
    private _opCapacitiesDrugstoreDefaultCapacity: OpCapacitiesDrugstoreDefaultCapacityService,
    private _opCapacitiesDrugstoreDefaultCapacityDialog: OpCapacitiesDrugstoreDefaultCapacityDialogService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.updateDefaultCapacityDrugstoreList();
    this.updateDefaultCapacityDrugstoreServiceList();
    this.updateDrugstoreCapacitiesServiceType();
  }

  updateDefaultCapacityDrugstoreList(): void {
    const subscription =
      this._opCapacitiesDrugstoreDefaultCapacity.drugstoreList$.subscribe(
        (capacitiesDrugstoreList) => {
          this.capacitiesDrugstoreList = capacitiesDrugstoreList;
          this.changeCapacitiesDrugstoreSelection(capacitiesDrugstoreList[0]);
        }
      );
    this.subscriptions.add(subscription);
  }

  changeCapacitiesDrugstoreSelection(
    capacitiesDrugstore: CapacitiesDrugstore
  ): void {
    this.capacitiesDrugstoreSelection = capacitiesDrugstore;
    this._opCapacitiesDrugstoreDefaultCapacity.drugstoreSelection =
      capacitiesDrugstore;
    this.resetDrugstoreServiceList();
  }

  updateDefaultCapacityDrugstoreServiceList(): void {
    const subscription =
      this._opCapacitiesDrugstoreDefaultCapacity.drugstoreServiceList$.subscribe(
        (drugstoreServiceList: CapacitiesDrugstoreServiceDefaultCapacity[]) => {
          this.resetDrugstoreServiceList();
          drugstoreServiceList.forEach((drugstoreService) => {
            switch (drugstoreService.serviceType) {
              case EDeliveryServiceType.amPm:
                this.capacityDrugstoreServiceAmPm = drugstoreService;
                break;
              case EDeliveryServiceType.express:
                this.capacityDrugstoreServiceExpress = drugstoreService;
                break;
              case EDeliveryServiceType.scheduled:
                this.capacityDrugstoreServiceScheduled = drugstoreService;
                break;
              case EDeliveryServiceType.ret:
                this.capacityDrugstoreServiceRet = drugstoreService;
                break;
            }
          });
        }
      );
    this.subscriptions.add(subscription);
  }

  resetDrugstoreServiceList(): void {
    this.capacityDrugstoreServiceAmPm = null;
    this.capacityDrugstoreServiceExpress = null;
    this.capacityDrugstoreServiceScheduled = null;
    this.capacityDrugstoreServiceRet = null;
  }

  updateDrugstoreCapacitiesServiceType(): void {
    const subscription =
      this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityList$.subscribe(
        (capacitiesServiceType: CapacitiesServiceType) => {
          this.capacitiesServiceTypeSelection = capacitiesServiceType;
          this.openServiceDefaultCapacity();
        }
      );
    this.subscriptions.add(subscription);
  }

  openServiceDefaultCapacity(): void {
    const serviceDefaultCapacityDialogRef =
      this._opCapacitiesDrugstoreDefaultCapacityDialog.openServiceDefaultCapacityDialog(
        this.capacitiesDrugstoreSelection,
        this.drugstoreDefaultCapacitySelection,
        this.capacitiesServiceTypeSelection
      );
    const subscription = serviceDefaultCapacityDialogRef
      .afterClosed()
      .subscribe((editService) => {
        if (editService) {
          this.drugstoreDefaultCapacityEditService(
            this.drugstoreDefaultCapacitySelection
          );
        }
      });
    this.subscriptions.add(subscription);
  }

  drugstoreDefaultCapacityViewMore(
    drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity
  ): void {
    this.drugstoreDefaultCapacitySelection = drugstoreService;
    this._opCapacitiesDrugstoreDefaultCapacity.drugstoreServiceTypeSelection =
      drugstoreService;
  }

  drugstoreDefaultCapacityEditService(
    drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity
  ): void {
    const drugstoreServiceTypePath = `${ROUTER_PATH.operationCapacities}/${
      CDeliveryServiceTypeRoute[drugstoreService.serviceType]
    }`;
    const drugstoreServiceTypeParams = {
      groupOrDrugstore: ECapacityStepGroupOrDrugstore.drugstore,
      drugstoreCode: this.capacitiesDrugstoreSelection.drugstoreCode,
      editionMode: ECapacitiesStepEditionMode.default,
    } as IOpCapacitiesServiceTypeQueryParams;
    this._router.navigate([drugstoreServiceTypePath], {
      queryParams: drugstoreServiceTypeParams,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
