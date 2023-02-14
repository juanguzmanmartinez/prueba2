import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  ECapacityStepGroupOrDrugstore,
  OpCapacitiesStepGroupOrDrugstoreService
} from '../../../components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import {
  ECapacitiesStepEditionMode,
  OpCapacitiesStepEditionModeService
} from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { ECapacityStepStatus } from '../../../models/operations-capacity-step-status.model';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { AlertService } from '@molecules/alert/alert.service';
import {
  CapacityRangeLimit,
  ToCapacityStepExpressResourceSegments
} from '../../../models/operations-capacity-converter.model';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { getDaysRangeBetweenDates } from '@helpers/dates.helper';

import {
  ECapacitiesStepExpressResource,
  OpCapacitiesStepExpressResourceService
} from '../../../components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import { ICapacityStepExpressResourceSegments } from '../../../components/op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import { capacityAlertSuccessMessage } from '../../../parameters/operations-capacities-alert-message.parameter';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { CapacitiesServiceType } from '../../../models/operations-capacities-responses.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';


@Injectable()
export class OperationsCapacityExpressStoreService implements OnDestroy {

  private subscriptions = new Subscription();

  private readonly expressCapacityId = EDeliveryServiceType.express;
  private readonly expressChannel = EChannel.digital;

  private operationsCapacityExpressCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityExpressSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
  private groupOrDrugstoreSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private expressResourceSelection: ICapacityStepExpressResourceSegments;

  get operationsCapacityExpressSave$(): Observable<boolean> {
    return this.operationsCapacityExpressSaveSubject.asObservable();
  }

  set operationsCapacityExpressSave(expressSave: boolean) {
    this.operationsCapacityExpressSaveSubject.next(expressSave);
  }

  get operationsCapacityExpressCancel$(): Observable<boolean> {
    return this.operationsCapacityExpressCancelSubject.asObservable();
  }

  set operationsCapacityExpressCancel(expressSave: boolean) {
    this.operationsCapacityExpressCancelSubject.next(expressSave);
  }

  get capacityExpressRequest(): ICalendarUpdateRequestParams {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.expressCapacityId;
    request.channel = this.expressChannel;
    request.fulfillmentCenterCode = this.groupOrDrugstoreSelection.fulfillmentCenterCode;
    request.quantities = `${this.expressResourceSelection.expressResource}`;

    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.expressResourceSelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(
        this.expressResourceSelection.capacityRange.endDate,
        this.expressResourceSelection.capacityRange.startDate);
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
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    private _alertService: AlertService,
  ) {
    this.groupOrDrugstoreTab();
    this.groupOrDrugstoreActions();
    this.editionModeActions();
    this.expressResourceActions();
    this.initService();
  }

  initService(): void {
    this._opCapacitiesStepExpressResource.expressResourceEditionAccessPath = ROUTER_PATH.capacitiesExpress;
  }

  getDrugstoreGroupList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreGroupImplements$(this.expressCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList = stores;
      });
    this.subscriptions.add(subscription);
  }

  getDrugstoreList(): void {
    const subscription = this._operationsCapacityImplement.getDrugstoreByServiceTypeImplement$(this.expressCapacityId)
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
        this._opCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
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
        this._opCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
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
        this.operationsCapacityExpressCancel = true;
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
    this._opCapacitiesStepExpressResource.expressResourceRangeLimit = new CapacityRangeLimit(capacitiesServiceType);
    this._opCapacitiesStepExpressResource.expressResourceSegments = new ToCapacityStepExpressResourceSegments(capacitiesServiceType);
    this._opCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.open;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.calendar:
        this.expressResourceFormView(ECapacitiesStepExpressResource.daysRange);
        break;
      case ECapacitiesStepEditionMode.default:
        this.expressResourceFormView(ECapacitiesStepExpressResource.hourlyCapacity);
        break;
    }
  }

  editionModeAndCapacityError(error): void {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Express Resource
   */

  expressResourceFormView(eCapacitiesStepExpressResource: ECapacitiesStepExpressResource): void {
    this._opCapacitiesStepExpressResource.expressResourceFormView = eCapacitiesStepExpressResource;
  }


  expressResourceActions(): void {
    const subscriptionSave = this._opCapacitiesStepExpressResource.expressResourceSave$
    .subscribe((expressResourceSegments: ICapacityStepExpressResourceSegments) => {
        this.expressResourceSelection = expressResourceSegments;
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityExpress();
      });

    const subscriptionCancel = this._opCapacitiesStepExpressResource.expressResourceCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
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
          this.expressCapacityId
        )
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrDrugstore.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(
          this.editionModeSelection,
          this.groupOrDrugstoreSelection,
          this.expressCapacityId
        )
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  saveCapacityExpress(): void {
    const capacityExpressRequest = this.capacityExpressRequest;

    switch (this.editionModeSelection) {
      case ECapacitiesStepEditionMode.default:
        this._operationsCapacityImplement.patchCalendarUpdateClient$(capacityExpressRequest)
          .subscribe(
            () => this.capacityExpressSaveSuccess(),
            (error) => this.capacityExpressSaveError(error));
        break;
      case ECapacitiesStepEditionMode.calendar:
        this._operationsCapacityImplement.patchCalendarRangeUpdateClient$(capacityExpressRequest)
          .subscribe(
            () => this.capacityExpressSaveSuccess(),
            (error) => this.capacityExpressSaveError(error));
        break;
    }
  }

  capacityExpressSaveSuccess(): void {
    const message = capacityAlertSuccessMessage(
      CDeliveryServiceTypeName[this.expressCapacityId],
      `${this.groupOrDrugstoreSelection.fulfillmentCenterCode} ${this.groupOrDrugstoreSelection.text}`);
    this._alertService.alertLightSuccess(message);
    this.operationsCapacityExpressSave = true;
  }

  capacityExpressSaveError(error): void {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = ECapacityStepStatus.open;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
