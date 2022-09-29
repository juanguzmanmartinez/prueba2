import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import {
  ECapacityStepGroupOrDrugstore,
  OpCapacitiesStepGroupOrDrugstoreService
} from '../../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import {
  ECapacitiesStepEditionMode,
  OpCapacitiesStepEditionModeService
} from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {
  ECapacitiesStepCapacityTable,
  OpCapacitiesStepCapacityTableService
} from '../../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { ECapacityStepStatus } from '../../../models/operations-capacity-step-status.model';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { AlertService } from '@molecules/alert/alert.service';
import {
  CapacityRangeLimit,
  ToCapacityStepScheduledCapacitySegments
} from '../../../models/operations-capacity-converter.model';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '@helpers/dates.helper';
import { ICapacityStepCapacityTableSegments } from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Injectable()
export class OperationsCapacityScheduledStoreService implements OnDestroy {

  private subscriptions = new Subscription();

  private readonly scheduledCapacityId = EDeliveryServiceType.scheduled;
  private readonly scheduledChannel = EChannel.digital;

  private opCapacityScheduledCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityScheduledSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrDrugstoreSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private scheduledCapacitySelection: ICapacityStepCapacityTableSegments;

  get operationsCapacityScheduledSave$(): Observable<boolean> {
    return this.opCapacityScheduledSaveSubject.asObservable();
  }

  set operationsCapacityScheduledSave(scheduledSave: boolean) {
    this.opCapacityScheduledSaveSubject.next(scheduledSave);
  }

  get operationsCapacityScheduledCancel$(): Observable<boolean> {
    return this.opCapacityScheduledCancelSubject.asObservable();
  }

  set operationsCapacityScheduledCancel(scheduledCancel: boolean) {
    this.opCapacityScheduledCancelSubject.next(scheduledCancel);
  }

  get capacityScheduledRequest(): ICalendarUpdateRequestParams {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.scheduledCapacityId;
    request.channel = this.scheduledChannel;
    request.fulfillmentCenterCode = this.groupOrDrugstoreSelection.fulfillmentCenterCode;
    request.quantities = this.scheduledCapacitySelection?.capacitySegmentList ?
      this.scheduledCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentCapacity || 0).join(',') : '';
    request.hours = this.scheduledCapacitySelection?.capacitySegmentList ?
      this.scheduledCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentValue || '').join(',') : '';

    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.scheduledCapacitySelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(
        this.scheduledCapacitySelection.capacityRange.endDate,
        this.scheduledCapacitySelection.capacityRange.startDate);
    }

    if (this.groupOrDrugstoreTabSelection === ECapacityStepGroupOrDrugstore.group) {
      request.filter = ECapacityStepGroupOrDrugstore.group;
    }

    return request;
  }

  constructor(
      private _operationsCapacityImplement: OperationsCapacitiesImplementService,
      private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
      private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
      private _opCapacitiesStepScheduledCapacity: OpCapacitiesStepCapacityTableService,
      private _alertService: AlertService,
  ) {
    this.groupOrDrugstoreTab();
    this.groupOrDrugstoreActions();
    this.editionModeActions();
    this.scheduledCapacityActions();
    this.initService();
  }

  initService(): void {
    this._opCapacitiesStepScheduledCapacity.capacityTableEditionAccessPath = ROUTER_PATH.opCapacitiesScheduled;
  }

  getDrugstoreGroupList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreGroupImplements$(this.scheduledCapacityId)
        .subscribe((stores: ICustomSelectOption[]) => {
          this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList = stores;
        });
    this.subscriptions.add(subscription);
  }

  getDrugstoreList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreByServiceTypeImplement$(this.scheduledCapacityId)
        .subscribe((stores: ICustomSelectOption[]) => {
          this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList = stores;
        });
    this.subscriptions.add(subscription);
  }

  groupOrDrugstoreActions(): void {
    const subscriptionSave = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreSave$
        .subscribe((drugstore: ICustomSelectOption) => {
          this.groupOrDrugstoreSelection = drugstore;
          this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
          this._opCapacitiesStepScheduledCapacity.capacityTableResetStepStatus = true;
          this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
          this._opCapacitiesStepScheduledCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
        });

    const subscriptionCancel = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel$
        .subscribe(() => {
          this.operationsCapacityScheduledCancel = true;
        });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }

  /**
   * Step 2: Edition Mode
   */

  editionModeActions(): void {
    const subscriptionSave = this._opCapacitiesStepEditionMode.editionModeSave$
      .subscribe((editionMode: ECapacitiesStepEditionMode) => {
        this.editionModeSelection = editionMode;
        this._opCapacitiesStepScheduledCapacity.capacityTableResetStepStatus = true;
        switch (editionMode) {
          case ECapacitiesStepEditionMode.calendar:
            this.editionModeAndGroupOrDrugstore();
            break;
          case ECapacitiesStepEditionMode.default:
            this.editionModeAndGroupOrDrugstore();
            break;
        }
      });

    const subscriptionCancel = this._opCapacitiesStepEditionMode.editionModeCancel$
        .subscribe(() => {
          this.operationsCapacityScheduledCancel = true;
        });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }

  /**
   * Step 1: Drugstore Group or Drugstore
   */

  groupOrDrugstoreTab(): void {
    const subscription = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreTab$
        .subscribe((groupOrDrugstore: ECapacityStepGroupOrDrugstore) => {
          this.groupOrDrugstoreTabSelection = groupOrDrugstore;
          switch (groupOrDrugstore) {
            case ECapacityStepGroupOrDrugstore.drugstore:
              this.getDrugstoreList();
              break;
            case ECapacityStepGroupOrDrugstore.group:
              this.getDrugstoreGroupList();
              break;
          }
        });
    this.subscriptions.add(subscription);
  }

  editionModeAndCapacity(capacitiesServiceType: CapacitiesServiceType): void {
    this._opCapacitiesStepScheduledCapacity.capacityTableRangeLimit = new CapacityRangeLimit(capacitiesServiceType);
    this._opCapacitiesStepScheduledCapacity.capacityTableSegments = new ToCapacityStepScheduledCapacitySegments(capacitiesServiceType);
    this._opCapacitiesStepScheduledCapacity.capacityTableStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.scheduledCapacityFormView(ECapacitiesStepCapacityTable.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.scheduledCapacityFormView(ECapacitiesStepCapacityTable.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error): void {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Schedule Capacity
   */

  scheduledCapacityFormView(eCapacitiesStepScheduledCapacity: ECapacitiesStepCapacityTable): void {
    this._opCapacitiesStepScheduledCapacity.capacityTableFormView = eCapacitiesStepScheduledCapacity;
  }


  scheduledCapacityActions(): void {
    const subscriptionSave = this._opCapacitiesStepScheduledCapacity.capacityTableSave$
      .subscribe((scheduledCapacitySegments: ICapacityStepCapacityTableSegments) => {
        this.scheduledCapacitySelection = scheduledCapacitySegments;
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityScheduled();
      });

    const subscriptionCancel = this._opCapacitiesStepScheduledCapacity.capacityTableCancel$
        .subscribe(() => {
          this.operationsCapacityScheduledCancel = true;
        });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }

  editionModeAndGroupOrDrugstore(): void {
    switch (this.groupOrDrugstoreTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        this._operationsCapacityImplement.getTypeOperationImplements$(
            this.editionModeSelection,
            this.groupOrDrugstoreSelection,
            this.scheduledCapacityId
        )
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(
            this.editionModeSelection,
            this.groupOrDrugstoreSelection,
            this.scheduledCapacityId
        )
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  saveCapacityScheduled(): void {
    const capacityScheduledRequest = this.capacityScheduledRequest;
    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.default:
        this._operationsCapacityImplement.patchCalendarUpdateClient$(capacityScheduledRequest)
            .subscribe(
                () => this.capacityScheduledSaveSuccess(),
                (error) => this.capacityScheduledSaveError(error));
        break;
      case ECapacitiesStepEditionMode.calendar:
        this._operationsCapacityImplement.patchCalendarRangeUpdateClient$(capacityScheduledRequest)
          .subscribe(
            () => this.capacityScheduledSaveSuccess(),
            (error) => this.capacityScheduledSaveError(error));
        break;
    }
  }

  capacityScheduledSaveSuccess(): void {
    const message = capacityAlertSuccessMessage(
        CDeliveryServiceTypeName[this.scheduledCapacityId],
        `${this.groupOrDrugstoreSelection.fulfillmentCenterCode} ${this.groupOrDrugstoreSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityScheduledSave = true;
  }

  capacityScheduledSaveError(error): void {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepScheduledCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.open;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
