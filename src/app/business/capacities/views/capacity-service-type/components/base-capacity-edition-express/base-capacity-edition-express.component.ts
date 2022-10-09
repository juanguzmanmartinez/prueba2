import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { DatesHelper } from '@helpers/dates.helper';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { Subscription } from 'rxjs';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';
import {
  ECapacitiesStepEditionMode,
  OpCapacitiesStepEditionModeService,
} from '../op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepExpressResourceFormService } from '../op-capacities-step-express-resource/form/op-capacities-step-express-resource-form.service';
import {
  FromFormToCapacityStepExpressResourceSegments,
  ICapacityStepExpressResourceSegments,
} from '../op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import {
  ECapacitiesStepExpressResource,
  OpCapacitiesStepExpressResourceService,
} from '../op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import {
  ECapacityStepGroupOrDrugstore,
  OpCapacitiesStepGroupOrDrugstoreService,
} from '../op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';

@Component({
  selector: 'app-base-capacity-edition-express',
  templateUrl: './base-capacity-edition-express.component.html',
})
export class BaseCapacityEditionExpress implements OnInit, OnDestroy {
  @Input() drugStoreName: string;

  private subscriptions = new Subscription();
  expressResourceSaveLoad: boolean;
  expressResourceDateRange: boolean;
  expressResourceSegments: ICapacityStepExpressResourceSegments;
  expressResourceMinDateRange: number = DatesHelper.Date().valueOf();
  expressResourceMaxDateRange: number = DatesHelper.Date()
    .add(2, 'M')
    .valueOf();

  constructor(
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    public _opCapacitiesStepExpressResourceForm: OpCapacitiesStepExpressResourceFormService,
    private _dialogTwoActions: DialogTwoActionsService
  ) {}

  ngOnInit(): void {
    this.initialSettings();
    this.updateExpressResourceFormView();
    this.updateExpressResourceSegments();
    this.updateExpressResourceRangeLimit();
  }

  get expressResourceForm() {
    return this._opCapacitiesStepExpressResourceForm.expressResourceForm$;
  }

  initialSettings() {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreSave =
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreTab =
      ECapacityStepGroupOrDrugstore.drugstore;
    this._opCapacitiesStepEditionMode.editionModeSave =
      ECapacitiesStepEditionMode.default;
  }

  saveExpressResource(): void {
    const subscription = this._dialogTwoActions
      .openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          console.log(
            this._opCapacitiesStepExpressResourceForm.expressResourceForm$.valid
          );
          if (
            this._opCapacitiesStepExpressResourceForm.expressResourceForm$.valid
          ) {
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

  updateExpressResourceSegments(): void {
    const subscription =
      this._opCapacitiesStepExpressResource.expressResourceSegments$.subscribe(
        (expressResourceSegments: ICapacityStepExpressResourceSegments) => {
          this.expressResourceSegments = expressResourceSegments;
          if (expressResourceSegments) {
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
