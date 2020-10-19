import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {ECapacityStepGroupOrLocal, OpCapacitiesStepGroupOrLocalService} from '../../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService} from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {
  ECapacitiesStepCapacityTable,
  OpCapacitiesStepCapacityTableService
} from '../../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../../shared/services/models/type-service.model';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';
import {ICapacityStepCapacityTableSegments} from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import {capacityAlertSuccessMessage} from '../../../models/operations-capacity-alert-message.parameter';
import { ToCapacityStepScheduledCapacitySegments } from '../../../models/operations-capacity-converter.model';


@Injectable()
export class OperationsCapacityRetStoreService implements OnDestroy {
  private readonly retCapacityId = 'RET';
  private readonly retChannel = 'DIGITAL';

  private subscriptions: Subscription[] = [];
  private opCapacityRetCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityRetSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private retCapacitySelection: ICapacityStepCapacityTableSegments;

  constructor(
    private _operationsCapacityImplement: CapacityImplementService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepRetCapacity: OpCapacitiesStepCapacityTableService,
    private  _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.retCapacityActions();
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
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.retCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalImplements$(this.retCapacityId)
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
        this._opCapacitiesStepRetCapacity.capacityTableResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepRetCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityRetCancel = true;
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
        this._opCapacitiesStepRetCapacity.capacityTableResetStepStatus = true;
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
        this.operationsCapacityRetCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.retCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.retCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  editionModeAndCapacity(data: ITypeService) {
    this._opCapacitiesStepRetCapacity.capacityTableSegments = new ToCapacityStepScheduledCapacitySegments(data);
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

  editionModeAndCapacityError(error) {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: RET Capacity
   */

  retCapacityFormView(eCapacitiesStepRetCapacity: ECapacitiesStepCapacityTable) {
    this._opCapacitiesStepRetCapacity.capacityTableFormView = eCapacitiesStepRetCapacity;
  }


  retCapacityActions() {
    const subscriptionSave = this._opCapacitiesStepRetCapacity.capacityTableSave$
      .subscribe((retCapacitySegments: ICapacityStepCapacityTableSegments) => {
        this.retCapacitySelection = retCapacitySegments;
        this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityRet();
      });

    const subscriptionCancel = this._opCapacitiesStepRetCapacity.capacityTableCancel$
      .subscribe(() => {
        this.operationsCapacityRetCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Save Capacity RET
   */
  get capacityRetRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.retCapacityId;
    request.channel = this.retChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
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
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrLocal.group) {
      request.filter = ECapacityStepGroupOrLocal.group;
    }
    return request;
  }

  saveCapacityRet() {
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

  capacityRetSaveSuccess() {
    const message = capacityAlertSuccessMessage(
      'RET',
      `${this.groupOrLocalSelection.fulfillmentCenterCode} ${this.groupOrLocalSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityRetSave = true;
  }

  capacityRetSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepRetCapacity.capacityTableStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


  get operationsCapacityRetSave$(): Observable<boolean> {
    return this.opCapacityRetSaveSubject.asObservable();
  }

  set operationsCapacityRetSave(amPmSave: boolean) {
    this.opCapacityRetSaveSubject.next(amPmSave);
  }

  get operationsCapacityRetCancel$(): Observable<boolean> {
    return this.opCapacityRetCancelSubject.asObservable();
  }

  set operationsCapacityRetCancel(amPmSave: boolean) {
    this.opCapacityRetCancelSubject.next(amPmSave);
  }

}
