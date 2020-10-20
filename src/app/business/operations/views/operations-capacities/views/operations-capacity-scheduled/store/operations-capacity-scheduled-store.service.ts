import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {OperationsCapacitiesImplementService} from '../../../services/operations-capacities-implement.service';
import {ECapacityStepGroupOrLocal, OpCapacitiesStepGroupOrLocalService} from '../../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService} from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {
  ECapacitiesStepCapacityTable,
  OpCapacitiesStepCapacityTableService
} from '../../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {IServiceType} from '../../../../../../../shared/models/local/service-type.model';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ToCapacityStepScheduledCapacitySegments} from '../../../models/operations-capacity-converter.model';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/models/calendar/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';
import {ICapacityStepCapacityTableSegments} from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import {capacityAlertSuccessMessage} from '../../../models/operations-capacity-alert-message.parameter';
import {ECapacitiesServiceType} from '../../../../../../../shared/models/capacities/capacities-service-type.model';


@Injectable()
export class OperationsCapacityScheduledStoreService implements OnDestroy {
  private readonly scheduledCapacityId = ECapacitiesServiceType.scheduled;
  private readonly scheduledChannel = 'DIGITAL';

  private subscriptions: Subscription[] = [];
  private opCapacityScheduledCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityScheduledSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private scheduledCapacitySelection: ICapacityStepCapacityTableSegments;

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepScheduledCapacity: OpCapacitiesStepCapacityTableService,
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

  editionModeAndCapacity(data: IServiceType) {
    this._opCapacitiesStepScheduledCapacity.capacityTableSegments = new ToCapacityStepScheduledCapacitySegments(data);
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

  set operationsCapacityScheduledSave(amPmSave: boolean) {
    this.opCapacityScheduledSaveSubject.next(amPmSave);
  }

  get operationsCapacityScheduledCancel$(): Observable<boolean> {
    return this.opCapacityScheduledCancelSubject.asObservable();
  }

  set operationsCapacityScheduledCancel(amPmSave: boolean) {
    this.opCapacityScheduledCancelSubject.next(amPmSave);
  }

}
