import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {ECapacityStepGroupOrLocal, OperationsCapacitiesStepGroupOrLocalService} from '../../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OperationsCapacitiesStepEditionModeService} from '../../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {
  ECapacitiesStepScheduledCapacity,
  OperationsCapacitiesStepScheduledCapacityService
} from '../../../components/operations-capacities-step-scheduled-capacity/operations-capacities-step-scheduled-capacity.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../../shared/services/models/type-service.model';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ToCapacityStepScheduledCapacitySegments} from '../../../models/operations-capacity-converter.model';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';
import {ICapacityStepScheduledCapacitySegments} from '../../../components/operations-capacities-step-scheduled-capacity/models/operations-capacities-step-scheduled-capacity.model';
import {capacityAlertSuccessMessage} from '../../../models/operations-capacity-alert-message.parameter';


@Injectable()
export class OperationsCapacityScheduledStoreService implements OnDestroy {
  private readonly scheduledCapacityId = 'PROG';
  private readonly scheduledChannel = 'DIGITAL';

  private subscriptions: Subscription[] = [];
  private operationsCapacityScheduledCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityScheduledSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private scheduledCapacitySelection: ICapacityStepScheduledCapacitySegments;

  constructor(
    private _operationsCapacityImplement: CapacityImplementService,
    private _operationsCapacitiesStepGroupOrLocal: OperationsCapacitiesStepGroupOrLocalService,
    private _operationsCapacitiesStepEditionMode: OperationsCapacitiesStepEditionModeService,
    private _operationsCapacitiesStepScheduledCapacity: OperationsCapacitiesStepScheduledCapacityService,
    private  _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.scheduledCapacityActions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Step 1: Local Group or Local
   */

  groupOrLocalTab() {
    const subscription = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalTab$
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
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.scheduledCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalImplements$(this.scheduledCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  groupOrLocalActions() {
    const subscriptionSave = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalSave$
      .subscribe((local: ICustomSelectOption) => {
        this.groupOrLocalSelection = local;
        this._operationsCapacitiesStepEditionMode.editionModeResetStepStatus = true;
        this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityResetStepStatus = true;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityScheduledCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Step 2: Edition Mode
   */

  editionModeActions() {
    const subscriptionSave = this._operationsCapacitiesStepEditionMode.editionModeSave$
      .subscribe((editionMode: ECapacitiesStepEditionMode) => {
        this.editionModeSelection = editionMode;
        this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityResetStepStatus = true;
        switch (editionMode) {
          case ECapacitiesStepEditionMode.calendar:
            this.editionModeAndGroupOrLocal();
            break;
          case ECapacitiesStepEditionMode.default:
            this.editionModeAndGroupOrLocal();
            break;
        }
      });

    const subscriptionCancel = this._operationsCapacitiesStepEditionMode.editionModeCancel$
      .subscribe(() => {
        this.operationsCapacityScheduledCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.scheduledCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.scheduledCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  editionModeAndCapacity(data: ITypeService) {
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacitySegments = new ToCapacityStepScheduledCapacitySegments(data);
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.scheduledCapacityFormView(ECapacitiesStepScheduledCapacity.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.scheduledCapacityFormView(ECapacitiesStepScheduledCapacity.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error) {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._operationsCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Schedule Capacity
   */

  scheduledCapacityFormView(eCapacitiesStepScheduledCapacity: ECapacitiesStepScheduledCapacity) {
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityFormView = eCapacitiesStepScheduledCapacity;
  }


  scheduledCapacityActions() {
    const subscriptionSave = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacitySave$
      .subscribe((scheduledCapacitySegments: ICapacityStepScheduledCapacitySegments) => {
        this.scheduledCapacitySelection = scheduledCapacitySegments;
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityScheduled();
      });

    const subscriptionCancel = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityCancel$
      .subscribe(() => {
        this.operationsCapacityScheduledCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Save Capacity Scheduled
   */
  get capacityScheduledRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.scheduledCapacityId;
    request.channel = this.scheduledChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
    request.quantities = this.scheduledCapacitySelection?.scheduledSegmentList ?
      this.scheduledCapacitySelection.scheduledSegmentList
        .map(segment => segment.segmentCapacity || 0).join(',') : '';
    request.hours = this.scheduledCapacitySelection?.scheduledSegmentList ?
      this.scheduledCapacitySelection.scheduledSegmentList
        .map(segment => segment.segmentValue || '').join(',') : '';
    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.scheduledCapacitySelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(
        this.scheduledCapacitySelection.capacityRange.endDate,
        this.scheduledCapacitySelection.capacityRange.startDate);
    }
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrLocal.group) {
      request.filter = ECapacityStepGroupOrLocal.group;
    }
    return request;
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
      'Programadas',
      `${this.groupOrLocalSelection.fulfillmentCenterCode} ${this.groupOrLocalSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityScheduledSave = true;
  }

  capacityScheduledSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


  get operationsCapacityScheduledSave$(): Observable<boolean> {
    return this.operationsCapacityScheduledSaveSubject.asObservable();
  }

  set operationsCapacityScheduledSave(amPmSave: boolean) {
    this.operationsCapacityScheduledSaveSubject.next(amPmSave);
  }

  get operationsCapacityScheduledCancel$(): Observable<boolean> {
    return this.operationsCapacityScheduledCancelSubject.asObservable();
  }

  set operationsCapacityScheduledCancel(amPmSave: boolean) {
    this.operationsCapacityScheduledCancelSubject.next(amPmSave);
  }

}
