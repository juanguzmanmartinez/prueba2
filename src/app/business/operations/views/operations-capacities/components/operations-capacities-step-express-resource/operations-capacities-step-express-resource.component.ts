import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {ECapacitiesStepExpressResource, OperationsCapacitiesStepExpressResourceService} from './operations-capacities-step-express-resource.service';
import {OperationsCapacitiesStepExpressResourceFormService} from './form/operations-capacities-step-express-resource-form.service';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {FromFormToCapacityStepExpressResourceSegments, ICapacityStepExpressResourceSegments} from './models/operations-capacities-step-express-resource.model';

@Component({
  selector: 'app-operations-capacities-step-express-resources',
  templateUrl: './operations-capacities-step-express-resource.component.html',
  styleUrls: ['./operations-capacities-step-express-resource.component.scss'],
  providers: [
    OperationsCapacitiesStepExpressResourceService,
    OperationsCapacitiesStepExpressResourceFormService
  ]
})
export class OperationsCapacitiesStepExpressResourceComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public expressResourceSaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public expressResourceStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;


  public expressResourceDateRange: boolean;
  public expressResourceMaxDateRange: moment.Moment = moment().add(2, 'M');
  public expressResourceSegments: ICapacityStepExpressResourceSegments;

  constructor(
    @Optional() @SkipSelf() private _operationsCapacitiesStepExpressResource: OperationsCapacitiesStepExpressResourceService,
    public _operationsCapacitiesStepExpressResourceForm: OperationsCapacitiesStepExpressResourceFormService
  ) {
  }

  ngOnInit(): void {
    this.updateExpressResourceFormView();
    this.updateExpressResourceSegments();
    this.resetExpressResourceStep();
    this.updateExpressResourceStepStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openExpressResourceStep() {
    this._operationsCapacitiesStepExpressResource.expressResourceStepStatus = this.eCapacityStepStatus.open;
  }

  closeExpressResourceStep() {
    this._operationsCapacitiesStepExpressResource.expressResourceStepStatus = this.eCapacityStepStatus.close;
  }

  saveExpressResource() {
    if (this._operationsCapacitiesStepExpressResourceForm.expressResourceForm$.valid) {
      this.expressResourceSaveLoad = true;
      this._operationsCapacitiesStepExpressResource.expressResourceSave = new FromFormToCapacityStepExpressResourceSegments(
        this._operationsCapacitiesStepExpressResourceForm.expressResourceForm$.value as ICapacityStepExpressResourceSegments
      );
    }
  }

  cancelExpressResource() {
    this._operationsCapacitiesStepExpressResource.expressResourceCancel = true;
  }

  updateExpressResourceStepStatus() {
    const subscription = this._operationsCapacitiesStepExpressResource.expressResourceStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.expressResourceStepStatus !== eCapacityStepStatus) {
          this.expressResourceStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  resetExpressResourceStep() {
    const subscription = this._operationsCapacitiesStepExpressResource.expressResourceResetStepStatus$
      .subscribe(() => {
        this.expressResourceDateRange = false;
        this.expressResourceSaveLoad = false;
        this.expressResourceSegments = null;
        this._operationsCapacitiesStepExpressResourceForm.resetForm();
      });
    this.subscriptions.push(subscription);
  }

  updateExpressResourceSegments() {
    const subscription = this._operationsCapacitiesStepExpressResource.expressResourceSegments$
      .subscribe((expressResourceSegments: ICapacityStepExpressResourceSegments) => {
        this.expressResourceSegments = expressResourceSegments;
        if (expressResourceSegments) {
          this._operationsCapacitiesStepExpressResourceForm.expressResource.setValue(expressResourceSegments.expressResource);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateExpressResourceFormView() {
    const subscription = this._operationsCapacitiesStepExpressResource.expressResourceFormView$
      .subscribe((eCapacitiesStepExpressResource: ECapacitiesStepExpressResource) => {
        switch (eCapacitiesStepExpressResource) {
          case ECapacitiesStepExpressResource.daysRange:
            this._operationsCapacitiesStepExpressResourceForm.capacityRange.enable();
            break;
          case ECapacitiesStepExpressResource.hourlyCapacity:
            this._operationsCapacitiesStepExpressResourceForm.capacityRange.disable();
            break;
        }
        this.expressResourceDateRange = this._operationsCapacitiesStepExpressResourceForm.capacityRange.enabled;
      });
    this.subscriptions.push(subscription);
  }

}
