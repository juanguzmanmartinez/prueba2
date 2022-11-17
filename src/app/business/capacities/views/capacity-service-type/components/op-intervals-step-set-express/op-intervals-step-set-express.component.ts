import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IExpressIntervalTimeRequest } from '@interfaces/capacities/interval-time.interface';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { AlertService } from '@molecules/alert/alert.service';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OperationMessages } from 'app/business/operations/parameters/operations-messages.parameter';
import { Subscription } from 'rxjs';
import { EConfirmMessageDesc, EIntervalControlName } from '../../constants/interval-form-message.constant';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { CapacitiesDrugstore } from '../../models/operations-capacities-responses.model';
import { DrugStoreServiceStore } from '../../store/drug-store.service';
import { IntervalTimeExpressFormService } from '../../store/interval-time-express-form.service';

@Component({
  selector: 'app-op-intervals-step-set-express',
  templateUrl: './op-intervals-step-set-express.component.html',
  styleUrls: ['./op-intervals-step-set-express.component.scss'],
})
export class OpIntervalsStepSetExpressComponent implements OnInit {
  private subscriptions = new Subscription();
  private drugStore: CapacitiesDrugstore;
  public intervalControlName = EIntervalControlName;

  @Input() drugStoreCode: string;
  @Input() drugStoreName: string;

  constructor(
    private _router: Router,
    private _drugStoreServiceStore: DrugStoreServiceStore,
    private _intervalTimeForm: IntervalTimeExpressFormService,
    private _capacitiesService: OperationsCapacitiesImplementService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getDrugStore();
  }

  getDrugStore(): void {
    this._drugStoreServiceStore
      .getDrugStore()
      .subscribe((drugStore) => (this.drugStore = drugStore));
  }

  @Input() data: any[] = [];

  selectionChange(ev) {}

  nextStep(e: any) {}

  get drugStoreCardTitle() {
    return `${this.drugStoreCode} - ${this.drugStoreName}`;
  }

  get stateOptionDesc() {
    const stateDesc = this._intervalTimeForm.stateControl.value
      ? 'Desactivar'
      : 'Activar';
    return `${stateDesc} parámetros`;
  }

  get intervalTimeForm() {
    return this._intervalTimeForm.intervalTimeForm;
  }

  get lapsHasError() {
    return this._intervalTimeForm.isNotValidatedLapsControl();
  }

  get consumptionMaxHasError() {
    return this._intervalTimeForm.isNotValidatedConsumptionMaxControl();
  }

  get capacityAddedHasError() {
    return this._intervalTimeForm.isNotValidatedCapacityAddedCControl();
  }

  get intervalTimeHasError() {
    return this._intervalTimeForm.isNotValidatedIntervalTimeControl();
  }

  get lapsControl() {
    return this._intervalTimeForm.lapsControl;
  }

  get intervalTimeControl() {
    return this._intervalTimeForm.intervalTimeControl;
  }

  get consumptionMaxControl() {
    return this._intervalTimeForm.consumptionMaxControl;
  }

  get capacityAddedControl() {
    return this._intervalTimeForm.capacityAddedControl;
  }

  get enabledControl() {
    return this._intervalTimeForm.stateControl;
  }

  get isEditionState() {
    return this._intervalTimeForm?.isEditionStateControl.value;
  }

  getIntervalTimeSaveRequest(): IExpressIntervalTimeRequest {
    const intervalTimeformValues =
      this._intervalTimeForm.getIntervalTimeFormRequest();
    const request: IExpressIntervalTimeRequest = {
      localCode: this.drugStoreCode,
      serviceType: EDeliveryServiceType.express,
      ...intervalTimeformValues,
    };

    return request;
  }

  messageError(control: AbstractControl, controlName: EIntervalControlName) {
    return this._intervalTimeForm.messageError(control, controlName);
  }

  saveEdition() {
    const successMessage = this.getIntervalTimeSuccessMessage();
    const confirmMessageDesc = this.getConfirmMessageDesc();
    const subscription = this._dialogTwoActions
      .openConfirmIntervalChanges(confirmMessageDesc)
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.executeSaveEdition(successMessage);
        }
      });
    this.subscriptions.add(subscription);
  }
  
  getConfirmMessageDesc() {
    if (this.isEditionState) {
      if (this.enabledControl.value) {
        return EConfirmMessageDesc.active;
      } else {
        return EConfirmMessageDesc.inactive;
      }
    }
    return EConfirmMessageDesc.active;
  }
  getIntervalTimeSuccessMessage() {
    if (this.isEditionState) {
      if (this.enabledControl.value) {
        return OperationMessages.successIntervalTimeActiveParams;
      } else {
        return OperationMessages.successIntervalTimeDesactiveParams;
      }
    }
    return OperationMessages.successIntervalTimeExpressEdition;
  }

  executeSaveEdition(sucessIntervalTime) {
    if (this.intervalTimeForm.valid) {
      const request = this.getIntervalTimeSaveRequest();
      this._capacitiesService
        .saveCapacityIntervalTimeExpress$(request)
        .subscribe(
          () => {
            this._alert.alertLightSuccess(
              sucessIntervalTime(
                `${this.drugStoreCode} ${this.drugStoreName}`
              )
            );
            this.backRoute();
          },
          () => {
            this._alert.alertLightError(
              OperationMessages.errorIntervalTimeExpressEdition(
                `${this.drugStoreCode} ${this.drugStoreName}`
              )
            );
            this.backRoute();
          }
        );
    }
  }

  cancelEdition() {
    this.backRoute();
  }

  backRoute() {
    this._router.navigate([ROUTER_PATH.capacities]);
  }
}
