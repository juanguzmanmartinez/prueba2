import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import { ECapacityStepGroupOrDrugstore, OpCapacitiesStepGroupOrDrugstoreService } from '../../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService } from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { ECapacitiesStepCapacityTable, OpCapacitiesStepCapacityTableService } from '../../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { ECapacityStepStatus } from '../../../models/operations-capacity-step-status.model';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { AlertService } from '@molecules/alert/alert.service';
import { CapacityRangeLimit, ToCapacityStepScheduledCapacitySegments } from '../../../models/operations-capacity-converter.model';
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
  private readonly scheduledCapacityId = EDeliveryServiceType.scheduled;
  private readonly scheduledChannel = EChannel.digital;

  private subscriptions: Subscription[] = [];
  private opCapacityScheduledCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityScheduledSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private scheduledCapacitySelection: ICapacityStepCapacityTableSegments;

  constructor(
      private _operationsCapacityImplement: OperationsCapacitiesImplementService,
      private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrDrugstoreService,
      private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
      private _opCapacitiesStepScheduledCapacity: OpCapacitiesStepCapacityTableService,
      private _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.scheduledCapacityActions();
    this.initService();
  }

  /**
   * Save Capacity Scheduled
   */
  get capacityScheduledRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.scheduledCapacityId;
    request.channel = this.scheduledChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
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
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrDrugstore.group) {
      request.filter = ECapacityStepGroupOrDrugstore.group;
    }
    return request;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initService() {
    this._opCapacitiesStepScheduledCapacity.capacityTableEditionAccessPath = ROUTER_PATH.opCapacitiesScheduled;
  }

  getLocalGroupList() {
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.scheduledCapacityId)
        .subscribe((stores: ICustomSelectOption[]) => {
          this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
        });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalByServiceTypeImplement$(this.scheduledCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  groupOrLocalActions() {
    const subscriptionSave = this._opCapacitiesStepGroupOrLocal.groupOrLocalSave$
      .subscribe((local: ICustomSelectOption) => {
        this.groupOrLocalSelection = local;
        this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
        this._opCapacitiesStepScheduledCapacity.capacityTableResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepScheduledCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityScheduledCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Step 2: Edition Mode
   */

  editionModeActions() {
    const subscriptionSave = this._opCapacitiesStepEditionMode.editionModeSave$
      .subscribe((editionMode: ECapacitiesStepEditionMode) => {
        this.editionModeSelection = editionMode;
        this._opCapacitiesStepScheduledCapacity.capacityTableResetStepStatus = true;
        switch (editionMode) {
          case ECapacitiesStepEditionMode.calendar:
            this.editionModeAndGroupOrLocal();
            break;
          case ECapacitiesStepEditionMode.default:
            this.editionModeAndGroupOrLocal();
            break;
        }
      });

    const subscriptionCancel = this._opCapacitiesStepEditionMode.editionModeCancel$
        .subscribe(() => {
          this.operationsCapacityScheduledCancel = true;
        });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  /**
   * Step 1: Local Group or Local
   */

  groupOrLocalTab() {
    const subscription = this._opCapacitiesStepGroupOrLocal.groupOrLocalTab$
        .subscribe((groupOrLocal: ECapacityStepGroupOrDrugstore) => {
          this.groupOrLocalTabSelection = groupOrLocal;
          switch (groupOrLocal) {
            case ECapacityStepGroupOrDrugstore.drugstore:
              this.getLocalList();
              break;
            case ECapacityStepGroupOrDrugstore.group:
              this.getLocalGroupList();
              break;
          }
        });
    this.subscriptions.push(subscription);
  }

  editionModeAndCapacity(capacitiesServiceType: CapacitiesServiceType) {
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

  editionModeAndCapacityError(error) {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Schedule Capacity
   */

  scheduledCapacityFormView(eCapacitiesStepScheduledCapacity: ECapacitiesStepCapacityTable) {
    this._opCapacitiesStepScheduledCapacity.capacityTableFormView = eCapacitiesStepScheduledCapacity;
  }


  scheduledCapacityActions() {
    const subscriptionSave = this._opCapacitiesStepScheduledCapacity.capacityTableSave$
      .subscribe((scheduledCapacitySegments: ICapacityStepCapacityTableSegments) => {
        this.scheduledCapacitySelection = scheduledCapacitySegments;
        this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityScheduled();
      });

    const subscriptionCancel = this._opCapacitiesStepScheduledCapacity.capacityTableCancel$
        .subscribe(() => {
          this.operationsCapacityScheduledCancel = true;
        });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        this._operationsCapacityImplement.getTypeOperationImplements$(
            this.editionModeSelection,
            this.groupOrLocalSelection,
            this.scheduledCapacityId
        )
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(
            this.editionModeSelection,
            this.groupOrLocalSelection,
            this.scheduledCapacityId
        )
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  saveCapacityScheduled() {
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

  capacityScheduledSaveSuccess() {
    const message = capacityAlertSuccessMessage(
        CDeliveryServiceTypeName[this.scheduledCapacityId],
        `${this.groupOrLocalSelection.fulfillmentCenterCode} ${this.groupOrLocalSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityScheduledSave = true;
  }

  capacityScheduledSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepScheduledCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


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

}
