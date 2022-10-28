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
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '@helpers/dates.helper';
import { ICapacityStepCapacityTableSegments } from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import {
  CapacityRangeLimit,
  ToCapacityStepRetCapacitySegments
} from '../../../models/operations-capacity-converter.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';


@Injectable()
export class OperationsCapacityRetStoreService implements OnDestroy {

  private subscriptions = new Subscription();

  private readonly retCapacityId = EDeliveryServiceType.ret;
  private readonly retChannel = EChannel.digital;

  private opCapacityRetCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityRetSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrDrugstoreSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private retCapacitySelection: ICapacityStepCapacityTableSegments;

  get operationsCapacityRetSave$(): Observable<boolean> {
    return this.opCapacityRetSaveSubject.asObservable();
  }

  set operationsCapacityRetSave(retSave: boolean) {
    this.opCapacityRetSaveSubject.next(retSave);
  }

  get operationsCapacityRetCancel$(): Observable<boolean> {
    return this.opCapacityRetCancelSubject.asObservable();
  }

  set operationsCapacityRetCancel(retCancel: boolean) {
    this.opCapacityRetCancelSubject.next(retCancel);
  }

  get capacityRetRequest(): ICalendarUpdateRequestParams {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.retCapacityId;
    request.channel = this.retChannel;
    request.fulfillmentCenterCode = this.groupOrDrugstoreSelection.fulfillmentCenterCode;
    request.quantities = this.retCapacitySelection?.capacitySegmentList ?
      this.retCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentCapacity || 0).join(',') : '';
    request.hours = this.retCapacitySelection?.capacitySegmentList ?
      this.retCapacitySelection.capacitySegmentList
        .map(segment => segment.segmentValue || '').join(',') : '';

    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.retCapacitySelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(
        this.retCapacitySelection.capacityRange.endDate,
        this.retCapacitySelection.capacityRange.startDate);
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
    private _opCapacitiesStepRetCapacity: OpCapacitiesStepCapacityTableService,
    private _alertService: AlertService,
  ) {
    this.groupOrDrugstoreTab();
    this.groupOrDrugstoreActions();
    this.editionModeActions();
    this.retCapacityActions();
    this.initService();
  }

  initService(): void {
    this._opCapacitiesStepRetCapacity.capacityTableEditionAccessPath = ROUTER_PATH.capacitiesRet;
  }

  getDrugstoreGroupList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreGroupImplements$(this.retCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList = stores;
      });
    this.subscriptions.add(subscription);
  }

  getDrugstoreList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreByServiceTypeImplement$(this.retCapacityId)
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
        this._opCapacitiesStepRetCapacity.capacityTableResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepRetCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel$
      .subscribe(() => {
        this.operationsCapacityRetCancel = true;
      });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }


  /**
   * Step 2: Edition Mode
   */

  editionModeActions() {
    const subscriptionSave = this._opCapacitiesStepEditionMode.editionModeSave$
      .subscribe((editionMode: ECapacitiesStepEditionMode) => {
        this.editionModeSelection = editionMode;
        this._opCapacitiesStepRetCapacity.capacityTableResetStepStatus = true;
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
        this.operationsCapacityRetCancel = true;
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
    this._opCapacitiesStepRetCapacity.capacityTableRangeLimit = new CapacityRangeLimit(capacitiesServiceType);
    this._opCapacitiesStepRetCapacity.capacityTableSegments = new ToCapacityStepRetCapacitySegments(capacitiesServiceType);
    this._opCapacitiesStepRetCapacity.capacityTableStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.retCapacityFormView(ECapacitiesStepCapacityTable.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.retCapacityFormView(ECapacitiesStepCapacityTable.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error): void {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: RET Capacity
   */

  retCapacityFormView(eCapacitiesStepRetCapacity: ECapacitiesStepCapacityTable): void {
    this._opCapacitiesStepRetCapacity.capacityTableFormView = eCapacitiesStepRetCapacity;
  }

  retCapacityActions(): void {
    const subscriptionSave = this._opCapacitiesStepRetCapacity.capacityTableSave$
      .subscribe((retCapacitySegments: ICapacityStepCapacityTableSegments) => {
        this.retCapacitySelection = retCapacitySegments;
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityRet();
      });

    const subscriptionCancel = this._opCapacitiesStepRetCapacity.capacityTableCancel$
      .subscribe(() => {
        this.operationsCapacityRetCancel = true;
      });

    this.subscriptions.add(subscriptionSave);
    this.subscriptions.add(subscriptionCancel);
  }

  editionModeAndGroupOrDrugstore(): void {
    switch (this.groupOrDrugstoreTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrDrugstoreSelection, this.retCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrDrugstoreSelection, this.retCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  saveCapacityRet(): void {
    const capacityRetRequest = this.capacityRetRequest;
    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.default:
        this._operationsCapacityImplement.patchCalendarUpdateClient$(capacityRetRequest)
          .subscribe(
            () => this.capacityRetSaveSuccess(),
            (error) => this.capacityRetSaveError(error));
        break;
      case ECapacitiesStepEditionMode.calendar:
        this._operationsCapacityImplement.patchCalendarRangeUpdateClient$(capacityRetRequest)
          .subscribe(
            () => this.capacityRetSaveSuccess(),
            (error) => this.capacityRetSaveError(error));
        break;
    }
  }

  capacityRetSaveSuccess(): void {
    const message = capacityAlertSuccessMessage(
      CDeliveryServiceTypeName[this.retCapacityId],
      `${this.groupOrDrugstoreSelection.fulfillmentCenterCode} ${this.groupOrDrugstoreSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityRetSave = true;
  }

  capacityRetSaveError(error): void {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepRetCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.open;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
