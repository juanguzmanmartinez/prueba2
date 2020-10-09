import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {OperationsCapacityAmPmImplementService} from '../services/operations-capacity-am-pm-implement.service';
import {ECapacityStepGroupOrLocal, OperationsCapacitiesStepGroupOrLocalService} from '../../../components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.service';
import {ECapacitiesStepEditionMode, OperationsCapacitiesStepEditionModeService} from '../../../components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.service';
import {
  ECapacitiesStepAmPmCapacity,
  ICapacityStepAmPmCapacityFormValue,
  OperationsCapacitiesStepAmPmCapacityService
} from '../../../components/operations-capacities-step-am-pm-capacity/operations-capacities-step-am-pm-capacity.service';
import {ECapacityStepStatus} from '../../../models/capacity-step-status.model';
import {ICustomSelectOption} from '../../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../../shared/services/models/type-service.model';
import {Router} from '@angular/router';

@Injectable()
export class OperationsCapacityAmPmStoreService {

  private subscriptions: Subscription[] = [];
  private operationsCapacityAmPmSaveSubject = new BehaviorSubject<boolean>(false);

  private groupOrLocalTabSelection: ECapacityStepGroupOrLocal;
  private groupOrLocalSelection: ICustomSelectOption;
  private editionModeSelection: ECapacitiesStepEditionMode;

  constructor(
    private _operationsCapacityAmPmImplement: OperationsCapacityAmPmImplementService,
    private _operationsCapacitiesStepGroupOrLocal: OperationsCapacitiesStepGroupOrLocalService,
    private _operationsCapacitiesStepEditionMode: OperationsCapacitiesStepEditionModeService,
    private _operationsCapacitiesStepAmPmCapacity: OperationsCapacitiesStepAmPmCapacityService,
    private _router: Router
  ) {
    this.groupOrLocalTab();
    this.groupOrLocalActions();
    this.editionModeActions();
    this.amPmCapacityActions();
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
    const subscription = this._operationsCapacityAmPmImplement.getLocalGroupImplements$()
      .subscribe((stores: ICustomSelectOption[]) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList = stores;
      });
    this.subscriptions.push(subscription);
  }

  getLocalList() {
    const subscription = this._operationsCapacityAmPmImplement.getLocalImplements$()
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
        this.operationsCapacityAmPmCancel();
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
        this.operationsCapacityAmPmCancel();
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }

  editionModeAndGroupOrLocal() {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        this._operationsCapacityAmPmImplement.getTypeOperationImplements$(this.editionModeSelection, this.groupOrLocalSelection)
          .subscribe((data) => {
            this.editionModeAndCapacity(data);
          });
        break;
      case ECapacityStepGroupOrLocal.group:
        this._operationsCapacityAmPmImplement.getTypeOperationGroupImplements$(this.editionModeSelection, this.groupOrLocalSelection)
          .subscribe((data) => {
            this.editionModeAndCapacity(data);
          });
        break;
    }
  }

  editionModeAndCapacity(data: ITypeService) {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySegments = {
      amSegment: {
        segmentCapacity: data.segments[0].capacity,
        segmentHour: data.segments[0].hour
      },
      pmSegment: {
        segmentCapacity: data.segments[1].capacity,
        segmentHour: data.segments[1].hour
      }
    };
    console.log(this.groupOrLocalTabSelection + ' ' + this.editionModeSelection, data);
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

  /**
   * Step 3: Am Pm Capacity
   */

  amPmCapacityFormView(eCapacitiesStepAmPmCapacity: ECapacitiesStepAmPmCapacity) {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityFormView = eCapacitiesStepAmPmCapacity;
  }


  amPmCapacityActions() {
    const subscriptionSave = this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySave$
      .subscribe((amPmCapacityFormValue: ICapacityStepAmPmCapacityFormValue) => {
        this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = ECapacityStepStatus.disabled;
        this._operationsCapacitiesStepEditionMode.editionModeStepStatus = ECapacityStepStatus.disabled;
      });

    const subscriptionCancel = this._operationsCapacitiesStepAmPmCapacity.amPmCapacityCancel$
      .subscribe(() => {
        this.operationsCapacityAmPmCancel();
      });
    this.subscriptions.push(subscriptionSave, subscriptionCancel);
  }


  /**
   * Store Actions
   */


  operationsCapacityAmPmCancel() {
    this._router.navigate(['/operaciones/capacidades']);
  }

  get operationsCapacityAmPmSave$(): Observable<boolean> {
    return this.operationsCapacityAmPmSaveSubject.asObservable();
  }

  set operationsCapacityAmPmSave(amPmSave: boolean) {
    this.operationsCapacityAmPmSaveSubject.next(amPmSave);
  }

  destroyOperationsCapacityAmPmStore() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
