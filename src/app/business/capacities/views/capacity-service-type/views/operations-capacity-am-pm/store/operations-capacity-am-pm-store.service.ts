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
import { ICapacityStepCapacityTableSegments } from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import {
  CapacityRangeLimit,
  ToCapacityStepAmPmCapacitySegments
} from '../../../models/operations-capacity-converter.model';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '@helpers/dates.helper';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';


@Injectable()
export class OperationsCapacityAmPmStoreService implements OnDestroy {

  private subscriptions = new Subscription();

  private readonly amPmCapacityId = EDeliveryServiceType.amPm;
  private readonly amPmChannel = EChannel.digital;

  private operationsCapacityAmPmCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityAmPmSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrDrugstoreSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private amPmCapacitySelection: ICapacityStepCapacityTableSegments;

  get operationsCapacityAmPmSave$(): Observable<boolean> {
    return this.operationsCapacityAmPmSaveSubject.asObservable();
  }

  set operationsCapacityAmPmSave(amPmSave: boolean) {
    this.operationsCapacityAmPmSaveSubject.next(amPmSave);
  }

  get operationsCapacityAmPmCancel$(): Observable<boolean> {
    return this.operationsCapacityAmPmCancelSubject.asObservable();
  }

  set operationsCapacityAmPmCancel(amPmSave: boolean) {
    this.operationsCapacityAmPmCancelSubject.next(amPmSave);
  }

  get capacityAmPmRequest(): ICalendarUpdateRequestParams {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.amPmCapacityId;
    request.channel = this.amPmChannel;
    request.fulfillmentCenterCode = this.groupOrDrugstoreSelection.fulfillmentCenterCode;
    request.quantities = this.amPmCapacitySelection?.capacitySegmentList ?
      this.amPmCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentCapacity || 0).join(',') : '';
    request.hours = this.amPmCapacitySelection?.capacitySegmentList ?
      this.amPmCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentValue || '').join(',') : '';
    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.amPmCapacitySelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(
        this.amPmCapacitySelection.capacityRange.endDate,
        this.amPmCapacitySelection.capacityRange.startDate);
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
    private _opCapacitiesStepAmPmCapacity: OpCapacitiesStepCapacityTableService,
    private _alertService: AlertService,
  ) {
    this.groupOrDrugstoreTab();
    this.groupOrDrugstoreActions();
    this.editionModeActions();
    this.amPmCapacityActions();
    this.initService();
  }

  initService(): void {
    this._opCapacitiesStepAmPmCapacity.capacityTableEditionAccessPath = ROUTER_PATH.capacitiesAmPm;
  }

  getDrugstoreGroupList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreGroupImplements$(this.amPmCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList = stores;
      });
    this.subscriptions.add(subscription);
  }

  getDrugstoreList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreByServiceTypeImplement$(this.amPmCapacityId)
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
        this._opCapacitiesStepAmPmCapacity.capacityTableResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepAmPmCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel = true;
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
        this._opCapacitiesStepAmPmCapacity.capacityTableResetStepStatus = true;
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
        this.operationsCapacityAmPmCancel = true;
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
    this._opCapacitiesStepAmPmCapacity.capacityTableRangeLimit = new CapacityRangeLimit(capacitiesServiceType);
    this._opCapacitiesStepAmPmCapacity.capacityTableSegments = new ToCapacityStepAmPmCapacitySegments(capacitiesServiceType);
    this._opCapacitiesStepAmPmCapacity.capacityTableStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.amPmCapacityFormView(ECapacitiesStepCapacityTable.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.amPmCapacityFormView(ECapacitiesStepCapacityTable.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error): void {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Am Pm Capacity
   */

  amPmCapacityFormView(eCapacitiesStepAmPmCapacity: ECapacitiesStepCapacityTable): void {
    this._opCapacitiesStepAmPmCapacity.capacityTableFormView = eCapacitiesStepAmPmCapacity;
  }

  amPmCapacityActions(): void {
    const subscriptionSave = this._opCapacitiesStepAmPmCapacity.capacityTableSave$
      .subscribe((amPmCapacitySegments: ICapacityStepCapacityTableSegments) => {
        this.amPmCapacitySelection = amPmCapacitySegments;
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityAmPm();
      });

    const subscriptionCancel = this._opCapacitiesStepAmPmCapacity.capacityTableCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel = true;
      });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }

  editionModeAndGroupOrDrugstore(): void {
    switch (this.groupOrDrugstoreTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrDrugstoreSelection, this.amPmCapacityId)
          .subscribe(
            (capacitiesServiceType: CapacitiesServiceType) => this.editionModeAndCapacity(capacitiesServiceType),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrDrugstoreSelection, this.amPmCapacityId)
          .subscribe(
            (capacitiesServiceType: CapacitiesServiceType) => this.editionModeAndCapacity(capacitiesServiceType),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  saveCapacityAmPm(): void {
    const capacityAmPmRequest = this.capacityAmPmRequest;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.default:
        this._operationsCapacityImplement.patchCalendarUpdateClient$(capacityAmPmRequest)
          .subscribe(
            () => this.capacityAmPmSaveSuccess(),
            (error) => this.capacityAmPmSaveError(error));
        break;
      case ECapacitiesStepEditionMode.calendar:
        this._operationsCapacityImplement.patchCalendarRangeUpdateClient$(capacityAmPmRequest)
          .subscribe(
            () => this.capacityAmPmSaveSuccess(),
            (error) => this.capacityAmPmSaveError(error));
        break;
    }
  }

  capacityAmPmSaveSuccess(): void {
    const message = capacityAlertSuccessMessage(
      CDeliveryServiceTypeName[this.amPmCapacityId],
      `${this.groupOrDrugstoreSelection.fulfillmentCenterCode} ${this.groupOrDrugstoreSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityAmPmSave = true;
    this._opCapacitiesStepGroupOrDrugstore.resetStepGroupOrDrugstore();
  }

  capacityAmPmSaveError(error): void {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepAmPmCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.open;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
