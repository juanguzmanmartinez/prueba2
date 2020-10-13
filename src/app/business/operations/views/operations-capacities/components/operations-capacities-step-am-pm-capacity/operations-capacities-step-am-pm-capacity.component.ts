import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {ECapacitiesStepAmPmCapacity, OperationsCapacitiesStepAmPmCapacityService} from './operations-capacities-step-am-pm-capacity.service';
import {OperationsCapacitiesStepAmPmCapacityFormService} from './form/operations-capacities-step-am-pm-capacity-form.service';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {ICapacityStepAmPmCapacityFormValue, ICapacityStepAmPmCapacitySegments, FromFormToCapacityStepAmPmCapacitySegments} from './models/operations-capacities-step-am-pm-capacity.model';

@Component({
  selector: 'app-operations-capacities-step-am-pm-capacity',
  templateUrl: './operations-capacities-step-am-pm-capacity.component.html',
  styleUrls: ['./operations-capacities-step-am-pm-capacity.component.scss'],
  providers: [
    OperationsCapacitiesStepAmPmCapacityFormService,
    OperationsCapacitiesStepAmPmCapacityService
  ]
})
export class OperationsCapacitiesStepAmPmCapacityComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public amPmCapacitySaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public amPmCapacityStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;

  public ampmCapacityDateRange: boolean;
  public ampmCapacityMaxDateRange: moment.Moment = moment().add(2, 'M');
  public ampmCapacitySegments: ICapacityStepAmPmCapacitySegments;

  constructor(
    @Optional() @SkipSelf() private _operationsCapacitiesStepAmPmCapacity: OperationsCapacitiesStepAmPmCapacityService,
    public _operationsCapacitiesStepAmPmCapacityForm: OperationsCapacitiesStepAmPmCapacityFormService,
  ) {
  }

  ngOnInit(): void {
    this.updateAmPmCapacityFormView();
    this.updateAmPmCapacitySegments();
    this.resetEditionModeStep();
    this.updateEditionModeStepStatus();
  }

  ngOnDestroy() {
    this._operationsCapacitiesStepAmPmCapacityForm.resetForm();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  openAmPmCapacityStep() {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = this.eCapacityStepStatus.open;
  }

  closeAmPmCapacityStep() {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = this.eCapacityStepStatus.close;
  }

  saveAmPmCapacity() {
    if (this._operationsCapacitiesStepAmPmCapacityForm.amPmCapacityForm$.valid) {
      this.amPmCapacitySaveLoad = true;
      this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySave = new FromFormToCapacityStepAmPmCapacitySegments(
        this._operationsCapacitiesStepAmPmCapacityForm.amPmCapacityForm$.value as ICapacityStepAmPmCapacityFormValue,
        this.ampmCapacitySegments
      );
    }
  }

  cancelAmPmCapacity() {
    this._operationsCapacitiesStepAmPmCapacity.amPmCapacityCancel = true;
  }

  updateEditionModeStepStatus() {
    const subscription = this._operationsCapacitiesStepAmPmCapacity.amPmCapacityStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.amPmCapacityStepStatus !== eCapacityStepStatus) {
          this.amPmCapacityStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetEditionModeStep() {
    const subscription = this._operationsCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus$
      .subscribe(() => {
        this.ampmCapacityDateRange = false;
        this.amPmCapacitySaveLoad = false;
        this.ampmCapacitySegments = null;
        this._operationsCapacitiesStepAmPmCapacityForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateAmPmCapacitySegments() {
    const subscription = this._operationsCapacitiesStepAmPmCapacity.amPmCapacitySegments$
      .subscribe((amPmCapacitySegments: ICapacityStepAmPmCapacitySegments) => {
        this.ampmCapacitySegments = amPmCapacitySegments;
        if (amPmCapacitySegments && amPmCapacitySegments.amSegment) {
          this._operationsCapacitiesStepAmPmCapacityForm.amCapacity.setValue(amPmCapacitySegments.amSegment.segmentCapacity);
        }
        if (amPmCapacitySegments && amPmCapacitySegments.pmSegment) {
          this._operationsCapacitiesStepAmPmCapacityForm.pmCapacity.setValue(amPmCapacitySegments.pmSegment.segmentCapacity);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateAmPmCapacityFormView() {
    const subscription = this._operationsCapacitiesStepAmPmCapacity.amPmCapacityFormView$
      .subscribe((eCapacitiesStepAmPmCapacity: ECapacitiesStepAmPmCapacity) => {
        switch (eCapacitiesStepAmPmCapacity) {
          case ECapacitiesStepAmPmCapacity.daysRange:
            this._operationsCapacitiesStepAmPmCapacityForm.capacityRange.enable();
            break;
          case ECapacitiesStepAmPmCapacity.hourlyCapacity:
            this._operationsCapacitiesStepAmPmCapacityForm.capacityRange.disable();
            break;
        }
        this.ampmCapacityDateRange = this._operationsCapacitiesStepAmPmCapacityForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }

}
