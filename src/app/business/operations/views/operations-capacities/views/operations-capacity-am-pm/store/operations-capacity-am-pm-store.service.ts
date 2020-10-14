import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {ECapacityStepGroupOrLocal, OperationsCapacitiesStepGroupOrLocalService} from '../../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OperationsCapacitiesStepEditionModeService} from '../../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {
  ECapacitiesStepAmPmCapacity,
  OperationsCapacitiesStepAmPmCapacityService
} from '../../../components/operations-capacities-step-am-pm-capacity/operations-capacities-step-am-pm-capacity.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../../shared/services/models/type-service.model';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ICapacityStepAmPmCapacitySegments} from '../../../components/operations-capacities-step-am-pm-capacity/models/operations-capacities-step-am-pm-capacity.model';
import {ToCapacityStepAmPmCapacitySegments} from '../../../models/operations-capacity-converter.model';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';
import {capacityAlertSuccessMessage} from '../../../models/operations-capacity-alert-message.parameter';


@Injectable()
export class OperationsCapacityAmPmStoreService implements OnDestroy {
  private readonly amPmCapacityId = 'AM_PM';
  private readonly amPmChannel = 'DIGITAL';

  private subscriptions: Subscription[] = [];
  private operationsCapacityAmPmCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityAmPmSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private amPmCapacitySelection: ICapacityStepAmPmCapacitySegments;

  constructor(
    private _operationsCapacityImplement: CapacityImplementService,
    private _operationsCapacitiesStepGroupOrLocal: OperationsCapacitiesStepGroupOrLocalService,
    private _operationsCapacitiesStepEditionMode: OperationsCapacitiesStepEditionModeService,
    private _operationsCapacitiesStepAmPmCapacity: OperationsCapacitiesStepAmPmCapacityService,
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
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.amPmCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalImplements$(this.amPmCapacityId)
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
        this._operationsCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus = true;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel = true;
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
        this._operationsCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus = true;
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
        this.operationsCapacityAmPmCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.amPmCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.amPmCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  editionModeAndCapacity(data: ITypeService) {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySegments = new ToCapacityStepAmPmCapacitySegments(data);
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.open;

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
    this._operationsCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Am Pm Capacity
   */

  amPmCapacityFormView(eCapacitiesStepAmPmCapacity: ECapacitiesStepAmPmCapacity) {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityFormView = eCapacitiesStepAmPmCapacity;
  }


  amPmCapacityActions() {
    const subscriptionSave = this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySave$
      .subscribe((amPmCapacitySegments: ICapacityStepAmPmCapacitySegments) => {
        this.amPmCapacitySelection = amPmCapacitySegments;
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityAmPm();
      });

    const subscriptionCancel = this._operationsCapacitiesStepAmPmCapacity.amPmCapacityCancel$
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

    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
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
