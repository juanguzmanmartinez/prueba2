import {
  Component,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  ECapacitiesStepExpressResource,
  OpCapacitiesStepExpressResourceService,
} from './op-capacities-step-express-resource.service';
import { OpCapacitiesStepExpressResourceFormService } from './form/op-capacities-step-express-resource-form.service';
import { Subscription } from 'rxjs';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import {
  FromFormToCapacityStepExpressResourceSegments,
  ICapacityStepExpressResourceSegments,
} from './models/op-capacities-step-express-resource.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';

@Component({
  selector: 'app-operations-capacities-step-express-resources',
  templateUrl: './op-capacities-step-express-resource.component.html',
  styleUrls: ['./op-capacities-step-express-resource.component.scss'],
  providers: [
    OpCapacitiesStepExpressResourceService,
    OpCapacitiesStepExpressResourceFormService,
  ],
})
export class OpCapacitiesStepExpressResourceComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  public expressResourceSaveLoad: boolean;
  public eCapacityStepStatus = ECapacityStepStatus;
  public expressResourceStepStatus: ECapacityStepStatus =
    ECapacityStepStatus.disabled;

  public expressResourceDateRange: boolean;

  public expressResourceMinDateRange: number = DatesHelper.Date().valueOf();
  public expressResourceMaxDateRange: number = DatesHelper.Date()
    .add(2, 'M')
    .valueOf();
  public expressResourceSegments: ICapacityStepExpressResourceSegments;

  public expressPathAccess: string;

  constructor(
    @Optional()
    @SkipSelf()
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    public _opCapacitiesStepExpressResourceForm: OpCapacitiesStepExpressResourceFormService,
    private _dialogTwoActions: DialogTwoActionsService
  ) {}

  ngOnInit(): void {
    this.updateExpressResourceFormView();
    this.updateExpressResourceSegments();
    this.updateExpressResourceRangeLimit();
    this.resetExpressResourceStep();
    this.updateExpressResourceStepStatus();

    this.expressPathAccess =
      this._opCapacitiesStepExpressResource.expressResourceEditionAccessPath;
  }

  openExpressResourceStep(): void {
    this._opCapacitiesStepExpressResource.expressResourceStepStatus =
      this.eCapacityStepStatus.open;
  }

  closeExpressResourceStep(): void {
    this._opCapacitiesStepExpressResource.expressResourceStepStatus =
      this.eCapacityStepStatus.close;
  }

  saveExpressResource(): void {
    const subscription = this._dialogTwoActions
      .openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          if (
            this._opCapacitiesStepExpressResourceForm.expressResourceForm$.valid
          ) {
            console.log('aquitoy');

            this.expressResourceSaveLoad = true;
            this._opCapacitiesStepExpressResource.expressResourceSave =
              new FromFormToCapacityStepExpressResourceSegments(
                this._opCapacitiesStepExpressResourceForm.expressResourceForm$
                  .value as ICapacityStepExpressResourceSegments
              );
          }
        }
      });
    this.subscriptions.add(subscription);
  }

  cancelExpressResource(): void {
    this._opCapacitiesStepExpressResource.expressResourceCancel = true;
  }

  updateExpressResourceStepStatus(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceStepStatus$.subscribe(
        (eCapacityStepStatus: ECapacityStepStatus) => {
          if (this.expressResourceStepStatus !== eCapacityStepStatus) {
            this.expressResourceStepStatus = eCapacityStepStatus;
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  resetExpressResourceStep(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceResetStepStatus$.subscribe(
        () => {
          console.log('me ejecuto');

          this.expressResourceDateRange = false;
          this.expressResourceSaveLoad = false;
          this.expressResourceSegments = null;
          this._opCapacitiesStepExpressResourceForm.resetForm();
        }
      );
    this.subscriptions.add(subscription);
  }

  updateExpressResourceSegments(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceSegments$.subscribe(
        (expressResourceSegments: ICapacityStepExpressResourceSegments) => {
          this.expressResourceSegments = expressResourceSegments;
          if (expressResourceSegments) {
            console.log('expressResourceSegments', expressResourceSegments);

            this._opCapacitiesStepExpressResourceForm.expressResource.setValue(
              expressResourceSegments.expressResource
            );
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  updateExpressResourceRangeLimit(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceRangeLimit$.subscribe(
        (capacityRangeLimit: CapacityRangeLimit) => {
          this.expressResourceMinDateRange = capacityRangeLimit.startDate;
          this.expressResourceMaxDateRange = capacityRangeLimit.endDate;
        }
      );
    this.subscriptions.add(subscription);
  }

  updateExpressResourceFormView(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceFormView$.subscribe(
        (eCapacitiesStepExpressResource: ECapacitiesStepExpressResource) => {
          switch (eCapacitiesStepExpressResource) {
            case ECapacitiesStepExpressResource.daysRange:
              this._opCapacitiesStepExpressResourceForm.capacityRange.enable();
              break;
            case ECapacitiesStepExpressResource.hourlyCapacity:
              this._opCapacitiesStepExpressResourceForm.capacityRange.disable();
              break;
          }
          this.expressResourceDateRange =
            this._opCapacitiesStepExpressResourceForm.capacityRange.enabled;
        }
      );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
