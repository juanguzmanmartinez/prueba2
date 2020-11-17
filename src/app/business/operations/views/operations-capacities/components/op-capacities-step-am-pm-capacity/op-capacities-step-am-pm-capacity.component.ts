import { Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { ECapacitiesStepAmPmCapacity, OpCapacitiesStepAmPmCapacityService } from './op-capacities-step-am-pm-capacity.service';
import { OpCapacitiesStepAmPmCapacityFormService } from './form/op-capacities-step-am-pm-capacity-form.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import { ICapacityStepAmPmCapacityFormValue, ICapacityStepAmPmCapacitySegments, FromFormToCapacityStepAmPmCapacitySegments } from './models/op-capacities-step-am-pm-capacity.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';

@Component({
  selector: 'app-op-capacities-step-am-pm-capacity',
  templateUrl: './op-capacities-step-am-pm-capacity.component.html',
  styleUrls: ['./op-capacities-step-am-pm-capacity.component.scss'],
  providers: [
    OpCapacitiesStepAmPmCapacityFormService,
    OpCapacitiesStepAmPmCapacityService
  ]
})
export class OpCapacitiesStepAmPmCapacityComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public amPmCapacitySaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public amPmCapacityStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;

  public ampmCapacityDateRange: boolean;
  public ampmCapacityMinDateRange: moment.Moment = moment();
  public ampmCapacityMaxDateRange: moment.Moment = moment().add(2, 'M');
  public ampmCapacitySegments: ICapacityStepAmPmCapacitySegments;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesStepAmPmCapacity: OpCapacitiesStepAmPmCapacityService,
    public _opCapacitiesStepAmPmCapacityForm: OpCapacitiesStepAmPmCapacityFormService,
  ) {
  }

  ngOnInit(): void {
    this.updateAmPmCapacityFormView();
    this.updateAmPmCapacitySegments();
    this.updateAmPmCapacityRangeLimit();
    this.resetAmPmCapacityStep();
    this.updateAmPmCapacityStepStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  openAmPmCapacityStep() {
    this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = this.eCapacityStepStatus.open;
  }

  closeAmPmCapacityStep() {
    this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus = this.eCapacityStepStatus.close;
  }

  saveAmPmCapacity() {
    if (this._opCapacitiesStepAmPmCapacityForm.amPmCapacityForm$.valid) {
      this.amPmCapacitySaveLoad = true;
      this._opCapacitiesStepAmPmCapacity.amPmCapacitySave = new FromFormToCapacityStepAmPmCapacitySegments(
        this._opCapacitiesStepAmPmCapacityForm.amPmCapacityForm$.value as ICapacityStepAmPmCapacityFormValue,
        this.ampmCapacitySegments
      );
    }
  }

  cancelAmPmCapacity() {
    this._opCapacitiesStepAmPmCapacity.amPmCapacityCancel = true;
  }

  updateAmPmCapacityStepStatus() {
    const subscription = this._opCapacitiesStepAmPmCapacity.amPmCapacityStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.amPmCapacityStepStatus !== eCapacityStepStatus) {
          this.amPmCapacityStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetAmPmCapacityStep() {
    const subscription = this._opCapacitiesStepAmPmCapacity.amPmCapacityResetStepStatus$
      .subscribe(() => {
        this.ampmCapacityDateRange = false;
        this.amPmCapacitySaveLoad = false;
        this.ampmCapacitySegments = null;
        this._opCapacitiesStepAmPmCapacityForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateAmPmCapacitySegments() {
    const subscription = this._opCapacitiesStepAmPmCapacity.amPmCapacitySegments$
      .subscribe((amPmCapacitySegments: ICapacityStepAmPmCapacitySegments) => {
        this.ampmCapacitySegments = amPmCapacitySegments;
        if (amPmCapacitySegments && amPmCapacitySegments.amSegment) {
          this._opCapacitiesStepAmPmCapacityForm.amCapacity.setValue(amPmCapacitySegments.amSegment.segmentCapacity);
        }
        if (amPmCapacitySegments && amPmCapacitySegments.pmSegment) {
          this._opCapacitiesStepAmPmCapacityForm.pmCapacity.setValue(amPmCapacitySegments.pmSegment.segmentCapacity);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateAmPmCapacityRangeLimit() {
    const subscription = this._opCapacitiesStepAmPmCapacity.amPmCapacityRangeLimit$
      .subscribe((capacityRangeLimit: CapacityRangeLimit) => {
        const minDate = moment(capacityRangeLimit.startDate, 'YYYY-MM-DD');
        const maxDate = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        if (minDate.isValid()) {
          this.ampmCapacityMinDateRange = minDate;
        }
        if (maxDate.isValid()) {
          this.ampmCapacityMaxDateRange = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        }
      });
    this.subscriptions.push(subscription);
  }

  updateAmPmCapacityFormView() {
    const subscription = this._opCapacitiesStepAmPmCapacity.amPmCapacityFormView$
      .subscribe((eCapacitiesStepAmPmCapacity: ECapacitiesStepAmPmCapacity) => {
        switch (eCapacitiesStepAmPmCapacity) {
          case ECapacitiesStepAmPmCapacity.daysRange:
            this._opCapacitiesStepAmPmCapacityForm.capacityRange.enable();
            break;
          case ECapacitiesStepAmPmCapacity.hourlyCapacity:
            this._opCapacitiesStepAmPmCapacityForm.capacityRange.disable();
            break;
        }
        this.ampmCapacityDateRange = this._opCapacitiesStepAmPmCapacityForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }

}
