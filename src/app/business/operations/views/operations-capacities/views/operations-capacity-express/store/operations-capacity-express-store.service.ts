import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ECapacityStepGroupOrLocal, OpCapacitiesStepGroupOrLocalService} from '../../../components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService} from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ToCapacityStepExpressResourceSegments} from '../../../models/operations-capacity-converter.model';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/models/calendar/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';

import {
  ECapacitiesStepExpressResource,
  OpCapacitiesStepExpressResourceService
} from '../../../components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import {ICapacityStepExpressResourceSegments} from '../../../components/op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import {OperationsCapacitiesImplementService} from '../../../services/operations-capacities-implement.service';
import {capacityAlertSuccessMessage} from '../../../parameters/operations-capacities-alert-message.parameter';
import {ECapacitiesServiceType} from '../../../../../../../shared/models/capacities/capacities-service-type.model';
import {EChannel} from '../../../../../../../shared/models/channel/channel.model';
import {CapacitiesServiceType} from '../../../models/operations-capacities-responses.model';


@Injectable()
export class OperationsCapacityExpressStoreService implements OnDestroy {
  private readonly expressCapacityId = ECapacitiesServiceType.express;
  private readonly expressChannel = EChannel.digital;

  private subscriptions: Subscription[] = [];
  private operationsCapacityExpressCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityExpressSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private expressResourceSelection: ICapacityStepExpressResourceSegments;

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrLocalService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    private  _alertService: AlertService,
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.expressResourceActions();
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
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.expressCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalByServiceTypeImplement$(this.expressCapacityId)
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
        this._opCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._opCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._opCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
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
        this._opCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
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
        this.operationsCapacityExpressCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.expressCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection, this.expressCapacityId)
          .subscribe(
            (data) => this.editionModeAndCapacity(data),
            (error) => this.editionModeAndCapacityError(error));
        break;
    }
  }

  editionModeAndCapacity(capacitiesServiceType: CapacitiesServiceType) {
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

  editionModeAndCapacityError(error) {
    const message = error ? error.message || 'Error' : 'Error';
    this._alertService.alertError(message);
    this._opCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Express Resource
   */

  expressResourceFormView(eCapacitiesStepExpressResource: ECapacitiesStepExpressResource) {
    this._opCapacitiesStepExpressResource.expressResourceFormView = eCapacitiesStepExpressResource;
  }


  expressResourceActions() {
    const subscriptionSave = this._opCapacitiesStepExpressResource.expressResourceSave$
      .subscribe((expressResourceSegments: ICapacityStepExpressResourceSegments) => {
        this.expressResourceSelection = expressResourceSegments;
        this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityExpress();
      });

    const subscriptionCancel = this._opCapacitiesStepExpressResource.expressResourceCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Save Capacity Express
   */
  get capacityExpressRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.expressCapacityId;
    request.channel = this.expressChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
    request.quantities = `${this.expressResourceSelection.expressResource}`;
    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.expressResourceSelection?.capacityRange) {
      request.days = getDaysRangeBetweenDates(this.expressResourceSelection.capacityRange.endDate, this.expressResourceSelection.capacityRange.startDate);
    }
    if (this.groupOrLocalTabSelection === ECapacityStepGroupOrLocal.group) {
      request.filter = ECapacityStepGroupOrLocal.group;
    }
    return request;
  }

  saveCapacityExpress() {
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

  capacityExpressSaveSuccess() {
    const message = capacityAlertSuccessMessage(
      'Express',
      `${this.groupOrLocalSelection.fulfillmentCenterCode} ${this.groupOrLocalSelection.text}`);
    this._alertService.alertSuccess(message);
    this.operationsCapacityExpressSave = true;
  }

  capacityExpressSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._opCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


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

}
