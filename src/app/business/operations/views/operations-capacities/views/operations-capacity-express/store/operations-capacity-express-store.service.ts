import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ECapacityStepGroupOrLocal, OperationsCapacitiesStepGroupOrLocalService} from '../../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OperationsCapacitiesStepEditionModeService} from '../../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {ECapacityStepStatus} from '../../../models/operations-capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../../shared/services/models/type-service.model';
import {AlertService} from '../../../../../../../commons/molecules/alert/alert.service';
import {ToCapacityStepExpressResourceSegments} from '../../../models/operations-capacity-converter.model';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {getDaysRangeBetweenDates} from '../../../../../../../shared/helpers/dates.helper';

import {
  ECapacitiesStepExpressResource,
  OperationsCapacitiesStepExpressResourceService
} from '../../../components/operations-capacities-step-express-resource/operations-capacities-step-express-resource.service';
import {ICapacityStepExpressResourceSegments} from '../../../components/operations-capacities-step-express-resource/models/operations-capacities-step-express-resource.model';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';


@Injectable()
export class OperationsCapacityExpressStoreService implements OnDestroy {
  private readonly expressCapacityId = 'EXP';
  private readonly expressChannel = 'DIGITAL';

  private subscriptions: Subscription[] = [];
  private operationsCapacityExpressCancelSubject = new BehaviorSubject<boolean>(false);
  private operationsCapacityExpressSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;
  private expressResourceSelection: ICapacityStepExpressResourceSegments;

  constructor(
    private _operationsCapacityImplement: CapacityImplementService,
    private _operationsCapacitiesStepGroupOrLocal: OperationsCapacitiesStepGroupOrLocalService,
    private _operationsCapacitiesStepEditionMode: OperationsCapacitiesStepEditionModeService,
    private _operationsCapacitiesStepExpressResource: OperationsCapacitiesStepExpressResourceService,
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
    const subscription = this._operationsCapacityImplement.getLocalGroupImplements$(this.expressCapacityId)
      .subscribe((stores: ICustomSelectOption[]) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityImplement.getLocalImplements$(this.expressCapacityId)
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
        this._operationsCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.open;
        this._operationsCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
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
        this._operationsCapacitiesStepExpressResource.expressResourceResetStepStatus = true;
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

  editionModeAndCapacity(data: ITypeService) {
    this._operationsCapacitiesStepExpressResource.expressResourceSegments = new ToCapacityStepExpressResourceSegments(data);
    this._operationsCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.open;

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
    this._operationsCapacitiesStepEditionMode.editionModeResetStepStatus = true;
  }

  /**
   * Step 3: Am Pm Capacity
   */

  expressResourceFormView(eCapacitiesStepExpressResource: ECapacitiesStepExpressResource) {
    this._operationsCapacitiesStepExpressResource.expressResourceFormView = eCapacitiesStepExpressResource;
  }


  expressResourceActions() {
    const subscriptionSave = this._operationsCapacitiesStepExpressResource.expressResourceSave$
      .subscribe((expressResourceSegments: ICapacityStepExpressResourceSegments) => {
        this.expressResourceSelection = expressResourceSegments;
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
        this.saveCapacityExpress();
      });

    const subscriptionCancel = this._operationsCapacitiesStepExpressResource.expressResourceCancel$
      .subscribe(() => {
        this.operationsCapacityExpressCancel = true;
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Save Capacity Am - pm
   */
  get capacityExpressRequest() {
    const request = {} as ICalendarUpdateRequestParams;
    request.serviceTypeCode = this.expressCapacityId;
    request.channel = this.expressChannel;
    request.fulfillmentCenterCode = this.groupOrLocalSelection.fulfillmentCenterCode;
    request.quantities = `${this.expressResourceSelection.expressResource}`;
    if (this.editionModeSelection === ECapacitiesStepEditionMode.calendar && this.expressResourceSelection.capacityRange) {
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
    const message = `Se guardó con éxito la edición de capacidades <bold>Express</bold> para ${this.groupOrLocalSelection.text}.`;
    this._alertService.alertSuccess(message);
    this.operationsCapacityExpressSave = true;
  }

  capacityExpressSaveError(error) {
    const message = error && error.message ? error.message : 'Hubo un error';
    this._alertService.alertError(message);

    this._operationsCapacitiesStepExpressResource.expressResourceStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.open;
  }


  /**
   * Store Actions
   */


  get operationsCapacityExpressSave$(): Observable<boolean> {
    return this.operationsCapacityExpressSaveSubject.asObservable();
  }

  set operationsCapacityExpressSave(amPmSave: boolean) {
    this.operationsCapacityExpressSaveSubject.next(amPmSave);
  }

  get operationsCapacityExpressCancel$(): Observable<boolean> {
    return this.operationsCapacityExpressCancelSubject.asObservable();
  }

  set operationsCapacityExpressCancel(amPmSave: boolean) {
    this.operationsCapacityExpressCancelSubject.next(amPmSave);
  }

}
