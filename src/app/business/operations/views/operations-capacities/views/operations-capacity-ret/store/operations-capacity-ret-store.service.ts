import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import { ECapacityStepGroupOrDrugstore, OpCapacitiesStepGroupOrDrugstoreService } from '../../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService } from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { ECapacitiesStepCapacityTable, OpCapacitiesStepCapacityTableService } from '../../../components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { ECapacityStepStatus } from '../../../models/operations-capacity-step-status.model';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { AlertService } from '@molecules/alert/alert.service';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '@helpers/dates.helper';
import { ICapacityStepCapacityTableSegments } from '../../../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import { CapacityRangeLimit, ToCapacityStepRetCapacitySegments } from '../../../models/operations-capacity-converter.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';


@Injectable()
export class OperationsCapacityRetStoreService implements OnDestroy {
  private readonly retCapacityId = EDeliveryServiceType.ret;
  private readonly retChannel = EChannel.digital;

  private subscriptions: Subscription[] = [];
  private opCapacityRetCancelSubject = new BehaviorSubject<boolean>(false);
  private opCapacityRetSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private retCapacitySelection: ICapacityStepCapacityTableSegments;

  constructor(
      private _operationsCapacityImplement: OperationsCapacitiesImplementService,
      private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrDrugstoreService,
      private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
      private _opCapacitiesStepRetCapacity: OpCapacitiesStepCapacityTableService,
      private _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.retCapacityActions();
    this.initService();
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
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrDrugstore.group) {
      request.filter = ECapacityStepGroupOrDrugstore.group;
    }
    return request;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initService() {
    this._opCapacitiesStepRetCapacity.capacityTableEditionAccessPath = ROUTER_PATH.opCapacitiesRet;
  }

  getLocalGroupList() {
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.retCapacityId)
        .subscribe((stores: ICustomSelectOption[]) => {
          this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
        });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalByServiceTypeImplement$(this.retCapacityId)
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

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.retCapacityId)
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.retCapacityId)
            .subscribe(
                (data) => this.editionModeAndCapacity(data),
                (error) => this.editionModeAndCapacityError(error));
        break;
    }
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
        CDeliveryServiceTypeName[this.retCapacityId],
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

  set operationsCapacityRetSave(retSave: boolean) {
    this.opCapacityRetSaveSubject.next(retSave);
  }

  get operationsCapacityRetCancel$(): Observable<boolean> {
    return this.opCapacityRetCancelSubject.asObservable();
  }

  set operationsCapacityRetCancel(retCancel: boolean) {
    this.opCapacityRetCancelSubject.next(retCancel);
  }

}
