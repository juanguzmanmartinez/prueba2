import { Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { ECapacitiesStepExpressResource, OpCapacitiesStepExpressResourceService } from './op-capacities-step-express-resource.service';
import { OpCapacitiesStepExpressResourceFormService } from './form/op-capacities-step-express-resource-form.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import { FromFormToCapacityStepExpressResourceSegments, ICapacityStepExpressResourceSegments } from './models/op-capacities-step-express-resource.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';

@Component({
  selector: 'app-operations-capacities-step-express-resources',
  templateUrl: './op-capacities-step-express-resource.component.html',
  styleUrls: ['./op-capacities-step-express-resource.component.scss'],
  providers: [
    OpCapacitiesStepExpressResourceService,
    OpCapacitiesStepExpressResourceFormService
  ]
})
export class OpCapacitiesStepExpressResourceComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public expressResourceSaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public expressResourceStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;


  public expressResourceDateRange: boolean;

  public expressResourceMinDateRange: moment.Moment = moment();
  public expressResourceMaxDateRange: moment.Moment = moment().add(2, 'M');
  public expressResourceSegments: ICapacityStepExpressResourceSegments;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    public _opCapacitiesStepExpressResourceForm: OpCapacitiesStepExpressResourceFormService
  ) {
  }

  ngOnInit(): void {
    this.updateExpressResourceFormView();
    this.updateExpressResourceSegments();
    this.updateExpressResourceRangeLimit();
    this.resetExpressResourceStep();
    this.updateExpressResourceStepStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openExpressResourceStep() {
    this._opCapacitiesStepExpressResource.expressResourceStepStatus = this.eCapacityStepStatus.open;
  }

  closeExpressResourceStep() {
    this._opCapacitiesStepExpressResource.expressResourceStepStatus = this.eCapacityStepStatus.close;
  }

  saveExpressResource() {
    if (this._opCapacitiesStepExpressResourceForm.expressResourceForm$.valid) {
      this.expressResourceSaveLoad = true;
      this._opCapacitiesStepExpressResource.expressResourceSave = new FromFormToCapacityStepExpressResourceSegments(
        this._opCapacitiesStepExpressResourceForm.expressResourceForm$.value as ICapacityStepExpressResourceSegments
      );
    }
  }

  cancelExpressResource() {
    this._opCapacitiesStepExpressResource.expressResourceCancel = true;
  }

  updateExpressResourceStepStatus() {
    const subscription = this._opCapacitiesStepExpressResource.expressResourceStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.expressResourceStepStatus !== eCapacityStepStatus) {
          this.expressResourceStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetExpressResourceStep() {
    const subscription = this._opCapacitiesStepExpressResource.expressResourceResetStepStatus$
      .subscribe(() => {
        this.expressResourceDateRange = false;
        this.expressResourceSaveLoad = false;
        this.expressResourceSegments = null;
        this._opCapacitiesStepExpressResourceForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateExpressResourceSegments() {
    const subscription = this._opCapacitiesStepExpressResource.expressResourceSegments$
      .subscribe((expressResourceSegments: ICapacityStepExpressResourceSegments) => {
        this.expressResourceSegments = expressResourceSegments;
        if (expressResourceSegments) {
          this._opCapacitiesStepExpressResourceForm.expressResource.setValue(expressResourceSegments.expressResource);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateExpressResourceRangeLimit() {
    const subscription = this._opCapacitiesStepExpressResource.expressResourceRangeLimit$
      .subscribe((capacityRangeLimit: CapacityRangeLimit) => {
        const minDate = moment(capacityRangeLimit.startDate, 'YYYY-MM-DD');
        const maxDate = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        if (minDate.isValid()) {
          this.expressResourceMinDateRange = minDate;
        }
        if (maxDate.isValid()) {
          this.expressResourceMaxDateRange = moment(capacityRangeLimit.endDate, 'YYYY-MM-DD');
        }
      });
    this.subscriptions.push(subscription);
  }

  updateExpressResourceFormView() {
    const subscription = this._opCapacitiesStepExpressResource.expressResourceFormView$
      .subscribe((eCapacitiesStepExpressResource: ECapacitiesStepExpressResource) => {
        switch (eCapacitiesStepExpressResource) {
          case ECapacitiesStepExpressResource.daysRange:
            this._opCapacitiesStepExpressResourceForm.capacityRange.enable();
            break;
          case ECapacitiesStepExpressResource.hourlyCapacity:
            this._opCapacitiesStepExpressResourceForm.capacityRange.disable();
            break;
        }
        this.expressResourceDateRange = this._opCapacitiesStepExpressResourceForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }

}
