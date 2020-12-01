import { Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { OpCapacitiesStepCapacityTableFormService } from '../op-capacities-step-capacity-table-form/form/op-capacities-step-capacity-table-form.service';
import { ECapacitiesStepCapacityTable, OpCapacitiesStepCapacityTableService } from './op-capacities-step-capacity-table.service';
import { Subscription } from 'rxjs';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import * as moment from 'moment';
import {
  FromFormToCapacityStepCapacityTableSegments,
  ICapacityStepCapacityTableFormValue,
  ICapacityStepCapacityTableSegments
} from './models/op-capacities-step-capacity-table.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';

@Component({
  selector: 'app-op-capacities-step-capacity-table',
  templateUrl: './op-capacities-step-capacity-table.component.html',
  styleUrls: ['./op-capacities-step-capacity-table.component.scss'],
  providers: [
    OpCapacitiesStepCapacityTableService,
    OpCapacitiesStepCapacityTableFormService
  ]
})
export class OpCapacitiesStepCapacityTableComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public capacityTableSaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public capacityTableStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;

  public capacityTableDateRange: boolean;
  public capacityTableMinDateRange: moment.Moment = moment();
  public capacityTableMaxDateRange: moment.Moment = moment().add(2, 'M');
  public capacityTableSegments: ICapacityStepCapacityTableSegments;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesStepCapacityTable: OpCapacitiesStepCapacityTableService,
    public _opCapacitiesStepCapacityTableForm: OpCapacitiesStepCapacityTableFormService
  ) {
  }

  ngOnInit(): void {
    this.updateCapacityTableFormView();
    this.updateCapacityTableSegments();
    this.updateCapacityTableRangeLimit();
    this.resetCapacityTableStep();
    this.updateCapacityTableStepStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openCapacityTableStep() {
    this._opCapacitiesStepCapacityTable.capacityTableStepStatus = this.eCapacityStepStatus.open;
  }

  closeCapacityTableStep() {
    this._opCapacitiesStepCapacityTable.capacityTableStepStatus = this.eCapacityStepStatus.close;
  }

  saveCapacityTable() {
    if (this._opCapacitiesStepCapacityTableForm.capacityTableForm$.valid) {
      this.capacityTableSaveLoad = true;
      this._opCapacitiesStepCapacityTable.capacityTableSave = new FromFormToCapacityStepCapacityTableSegments(
        this._opCapacitiesStepCapacityTableForm.capacityTableForm$.value as ICapacityStepCapacityTableFormValue
      );
    }
  }

  cancelCapacityTable() {
    this._opCapacitiesStepCapacityTable.capacityTableCancel = true;
  }


  updateCapacityTableStepStatus() {
    const subscription = this._opCapacitiesStepCapacityTable.capacityTableStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.capacityTableStepStatus !== eCapacityStepStatus) {
          this.capacityTableStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetCapacityTableStep() {
    const subscription = this._opCapacitiesStepCapacityTable.capacityTableResetStepStatus$
      .subscribe(() => {
        this.capacityTableDateRange = false;
        this.capacityTableSaveLoad = false;
        this.capacityTableSegments = null;
        this._opCapacitiesStepCapacityTableForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateCapacityTableSegments() {
    const subscription = this._opCapacitiesStepCapacityTable.capacityTableSegments$
      .subscribe((capacityTableSegments: ICapacityStepCapacityTableSegments) => {
        this.capacityTableSegments = capacityTableSegments;
        this._opCapacitiesStepCapacityTableForm.capacitySegmentList.clear();

        if (capacityTableSegments && capacityTableSegments.capacitySegmentList) {

          capacityTableSegments.capacitySegmentList.forEach(segment => {
            const capacitySegmentListGroup = this._opCapacitiesStepCapacityTableForm.capacitySegmentListGroup;
            this._opCapacitiesStepCapacityTableForm.segmentHourByGroup(capacitySegmentListGroup)
              .setValue(segment && segment.segmentHour ? segment.segmentHour : '');
            this._opCapacitiesStepCapacityTableForm.segmentCapacityByGroup(capacitySegmentListGroup)
              .setValue(segment && segment.segmentCapacity ? segment.segmentCapacity : 0);
            this._opCapacitiesStepCapacityTableForm.segmentValueByGroup(capacitySegmentListGroup)
              .setValue(segment && segment.segmentValue ? segment.segmentValue : '');

            this._opCapacitiesStepCapacityTableForm.capacitySegmentList.push(capacitySegmentListGroup);
          });
        }
      });
    this.subscriptions.push(subscription);
  }

  updateCapacityTableRangeLimit() {
    const subscription = this._opCapacitiesStepCapacityTable.capacityTableRangeLimit$
      .subscribe((capacityRangeLimit: CapacityRangeLimit) => {
        const minDate = moment(capacityRangeLimit.startDate, 'YYYY-MM-DD');
        const maxDate = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        if (minDate.isValid()) {
          this.capacityTableMinDateRange = minDate;
        }
        if (maxDate.isValid()) {
          this.capacityTableMaxDateRange = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        }
      });
    this.subscriptions.push(subscription);
  }

  updateCapacityTableFormView() {
    const subscription = this._opCapacitiesStepCapacityTable.capacityTableFormView$
      .subscribe((eCapacitiesStepCapacityTable: ECapacitiesStepCapacityTable) => {
        switch (eCapacitiesStepCapacityTable) {
          case ECapacitiesStepCapacityTable.daysRange:
            this._opCapacitiesStepCapacityTableForm.capacityRange.enable();
            break;
          case ECapacitiesStepCapacityTable.hourlyCapacity:
            this._opCapacitiesStepCapacityTableForm.capacityRange.disable();
            break;
        }
        this.capacityTableDateRange = this._opCapacitiesStepCapacityTableForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }
}
