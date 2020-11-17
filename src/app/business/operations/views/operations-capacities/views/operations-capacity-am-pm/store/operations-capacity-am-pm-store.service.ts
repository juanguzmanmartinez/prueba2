import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OperationsCapacitiesImplementService } from '../../../services/operations-capacities-implement.service';
import { ECapacityStepGroupOrLocal, OpCapacitiesStepGroupOrLocalService } from '../../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import { ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService } from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {
  ECapacitiesStepAmPmCapacity,
  OpCapacitiesStepAmPmCapacityService
} from '../../../components/op-capacities-step-am-pm-capacity/op-capacities-step-am-pm-capacity.service';
import { ECapacityStepStatus } from '../../../models/operations-capacity-step-status.model';
import { ICustomSelectOption } from '../../../../../../../commons/interfaces/custom-controls.interface';
import { AlertService } from '../../../../../../../commons/molecules/alert/alert.service';
import { ICapacityStepAmPmCapacitySegments } from '../../../components/op-capacities-step-am-pm-capacity/models/op-capacities-step-am-pm-capacity.model';
import { CapacityRangeLimit, ToCapacityStepAmPmCapacitySegments } from '../../../models/operations-capacity-converter.model';
import { ICalendarUpdateRequestParams } from '../../../../../../../shared/models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '../../../../../../../shared/helpers/dates.helper';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import { ECapacitiesServiceType } from '../../../../../../../shared/models/capacities/capacities-service-type.model';
import { EChannel } from '../../../../../../../shared/models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';


@Injectable()
export class OperationsCapacityAmPmStoreService implements OnDestroy {
  private readonly amPmCapacityId = ECapacitiesServiceType.amPm;
  private readonly amPmChannel = EChannel.digital;

  private subscriptions: Subscription[] = [];
  private operationsCapacityAmPmCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityAmPmSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private amPmCapacitySelection: ICapacityStepAmPmCapacitySegments;

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepAmPmCapacity: OpCapacitiesStepAmPmCapacityService,
    private  _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.amPmCapacityActions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Step 1: Local Group or Local
   */

  groupOrLocalTab() {
    const subscription = this._opCapacitiesStepGroupOrLocal.groupOrLocalTab$
      .subscribe((groupOrLocal: ECapacityStepGroupOrLocal) => {
        this.groupOrLocalTabSelection = groupOrLocal;
        switch (groupOrLocal) {
          case ECapacityStepGroupOrLocal.local:
            this.getLocalList();
            break;
          case ECapacityStepGroupOrLocal.group:
            this.getLocalGroupList();
            break;
        }
      });
    this.subscriptions.push(subscription);
  }

  getLocalGroupList() {
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.amPmCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalByServiceTypeImplement$(this.amPmCapacityId)
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
        this._opCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel = true;
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
        this._opCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus = true;
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
        this.operationsCapacityAmPmCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.amPmCapacityId)
          .subscribe(
            (capacitiesServiceType: CapacitiesServiceType) => this.editionModeAndCapacity(capacitiesServiceType),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.amPmCapacityId)
          .subscribe(
            (capacitiesServiceType: CapacitiesServiceType) => this.editionModeAndCapacity(capacitiesServiceType),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  editionModeAndCapacity(capacitiesServiceType: CapacitiesServiceType) {
    this._opCapacitiesStepAmPmCapacity.amPmCapacityRangeLimit = new CapacityRangeLimit(capacitiesServiceType);
    this._opCapacitiesStepAmPmCapacity.amPmCapacitySegments = new ToCapacityStepAmPmCapacitySegments(capacitiesServiceType);
    this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.amPmCapacityFormView(ECapacitiesStepAmPmCapacity.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.amPmCapacityFormView(ECapacitiesStepAmPmCapacity.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error) {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Am Pm Capacity
   */

  amPmCapacityFormView(eCapacitiesStepAmPmCapacity: ECapacitiesStepAmPmCapacity) {
    this._opCapacitiesStepAmPmCapacity.amPmCapacityFormView = eCapacitiesStepAmPmCapacity;
  }


  amPmCapacityActions() {
    const subscriptionSave = this._opCapacitiesStepAmPmCapacity.amPmCapacitySave$
      .subscribe((amPmCapacitySegments: ICapacityStepAmPmCapacitySegments) => {
        this.amPmCapacitySelection = amPmCapacitySegments;
        this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityAmPm();
      });

    const subscriptionCancel = this._opCapacitiesStepAmPmCapacity.amPmCapacityCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Save Capacity Am - pm
   */
  get capacityAmPmRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.amPmCapacityId;
    request.channel = this.amPmChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
    request.quantities = `${this.amPmCapacitySelection.amSegment.segmentCapacity},${this.amPmCapacitySelection.pmSegment.segmentCapacity}`;
    request.hours = `${this.amPmCapacitySelection.amSegment.segmentValue},${this.amPmCapacitySelection.pmSegment.segmentValue}`;
    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.amPmCapacitySelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(this.amPmCapacitySelection.capacityRange.endDate, this.amPmCapacitySelection.capacityRange.startDate);
    }
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrLocal.group) {
      request.filter = ECapacityStepGroupOrLocal.group;
    }
    return request;
  }

  saveCapacityAmPm() {
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

  capacityAmPmSaveSuccess() {
    const message = capacityAlertSuccessMessage(
      'AM/PM',
      `${this.groupOrLocalSelection.fulfillmentCenterCode} ${this.groupOrLocalSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityAmPmSave = true;
  }

  capacityAmPmSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


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

}
