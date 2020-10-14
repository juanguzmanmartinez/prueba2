import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {OperationsCapacitiesStepScheduledCapacityFormService} from './form/operations-capacities-step-scheduled-capacity-form.service';
import {ECapacitiesStepScheduledCapacity, OperationsCapacitiesStepScheduledCapacityService} from './operations-capacities-step-scheduled-capacity.service';
import {Subscription} from 'rxjs';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import * as moment from 'moment';
import {
  FromFormToCapacityStepScheduledCapacitySegments,
  ICapacityStepScheduledCapacityFormValue,
  ICapacityStepScheduledCapacitySegments
} from './models/operations-capacities-step-scheduled-capacity.model';

@Component({
  selector: 'app-operations-capacities-step-scheduled-capacity',
  templateUrl: './operations-capacities-step-scheduled-capacity.component.html',
  styleUrls: ['./operations-capacities-step-scheduled-capacity.component.scss'],
  providers: [
    OperationsCapacitiesStepScheduledCapacityService,
    OperationsCapacitiesStepScheduledCapacityFormService
  ]
})
export class OperationsCapacitiesStepScheduledCapacityComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public scheduledCapacitySaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public scheduledCapacityStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;

  public scheduledCapacityDateRange: boolean;
  public scheduledCapacityMaxDateRange: moment.Moment = moment().add(2, 'M');
  public scheduledCapacitySegments: ICapacityStepScheduledCapacitySegments;

  constructor(
    @Optional() @SkipSelf() private _operationsCapacitiesStepScheduledCapacity: OperationsCapacitiesStepScheduledCapacityService,
    public _operationsCapacitiesStepScheduledCapacityForm: OperationsCapacitiesStepScheduledCapacityFormService
  ) {
  }

  ngOnInit(): void {
    this.updateScheduledCapacityFormView();
    this.updateScheduledCapacitySegments();
    this.resetScheduledCapacityStep();
    this.updateScheduledCapacityStepStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openScheduledCapacityStep() {
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus = this.eCapacityStepStatus.open;
  }

  closeScheduledCapacityStep() {
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus = this.eCapacityStepStatus.close;
  }

  saveScheduledCapacity() {
    if (this._operationsCapacitiesStepScheduledCapacityForm.scheduledCapacityForm$.valid) {
      this.scheduledCapacitySaveLoad = true;
      this._operationsCapacitiesStepScheduledCapacity.scheduledCapacitySave = new FromFormToCapacityStepScheduledCapacitySegments(
        this._operationsCapacitiesStepScheduledCapacityForm.scheduledCapacityForm$.value as ICapacityStepScheduledCapacityFormValue
      );
    }
  }

  cancelScheduledCapacity() {
    this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityCancel = true;
  }


  updateScheduledCapacityStepStatus() {
    const subscription = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.scheduledCapacityStepStatus !== eCapacityStepStatus) {
          this.scheduledCapacityStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetScheduledCapacityStep() {
    const subscription = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityResetStepStatus$
      .subscribe(() => {
        this.scheduledCapacityDateRange = false;
        this.scheduledCapacitySaveLoad = false;
        this.scheduledCapacitySegments = null;
        this._operationsCapacitiesStepScheduledCapacityForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateScheduledCapacitySegments() {
    const subscription = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacitySegments$
      .subscribe((scheduledCapacitySegments: ICapacityStepScheduledCapacitySegments) => {
        this.scheduledCapacitySegments = scheduledCapacitySegments;
        if (scheduledCapacitySegments && scheduledCapacitySegments.scheduledSegmentList) {

          scheduledCapacitySegments.scheduledSegmentList.forEach(segment => {
            const scheduledSegmentListGroup = this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentListGroup;
            this._operationsCapacitiesStepScheduledCapacityForm.segmentHourByGroup(scheduledSegmentListGroup)
              .setValue(segment && segment.segmentHour ? segment.segmentHour : '');
            this._operationsCapacitiesStepScheduledCapacityForm.segmentCapacityByGroup(scheduledSegmentListGroup)
              .setValue(segment && segment.segmentCapacity ? segment.segmentCapacity : 0);
            this._operationsCapacitiesStepScheduledCapacityForm.segmentValueByGroup(scheduledSegmentListGroup)
              .setValue(segment && segment.segmentValue ? segment.segmentValue : '');

            this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.push(scheduledSegmentListGroup);
          });
          this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.patchValue(scheduledCapacitySegments.scheduledSegmentList);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateScheduledCapacityFormView() {
    const subscription = this._operationsCapacitiesStepScheduledCapacity.scheduledCapacityFormView$
      .subscribe((eCapacitiesStepScheduledCapacity: ECapacitiesStepScheduledCapacity) => {
        switch (eCapacitiesStepScheduledCapacity) {
          case ECapacitiesStepScheduledCapacity.daysRange:
            this._operationsCapacitiesStepScheduledCapacityForm.capacityRange.enable();
            break;
          case ECapacitiesStepScheduledCapacity.hourlyCapacity:
            this._operationsCapacitiesStepScheduledCapacityForm.capacityRange.disable();
            break;
        }
        this.scheduledCapacityDateRange = this._operationsCapacitiesStepScheduledCapacityForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }
}
