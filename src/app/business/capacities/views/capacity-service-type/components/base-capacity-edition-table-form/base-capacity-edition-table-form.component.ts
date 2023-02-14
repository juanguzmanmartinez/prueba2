import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { OpCapacitiesStepCapacityTableFormService } from '../op-capacities-step-capacity-table-form/form/op-capacities-step-capacity-table-form.service';
import {
  ECapacityStepGroupOrDrugstore,
  OpCapacitiesStepGroupOrDrugstoreService,
} from '../op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import {
  ECapacitiesStepEditionMode,
  OpCapacitiesStepEditionModeService,
} from '../op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import {
  ECapacitiesStepCapacityTable,
  OpCapacitiesStepCapacityTableService,
} from '../op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import {
  FromFormToCapacityStepCapacityTableSegments,
  ICapacityStepCapacityTableFormValue,
  ICapacityStepCapacityTableSegments,
} from '../op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import {
  CDeliveryServiceTypeRoute,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';

@Component({
  selector: 'app-base-capacity-edition-table-form',
  templateUrl: './base-capacity-edition-table-form.component.html',
})
export class BaseCapacityEditionTableForm implements OnInit {
  @Input() drugStoreName: string;
  @Input() serviceType: EDeliveryServiceType;

  private subscriptions = new Subscription();
  displayedColumns: string[] = ['value', 'hour', 'capacity'];
  dataSource = new BehaviorSubject<FormGroup[]>([]);
  capacityTableSelection = new SelectionModel<FormGroup>(true, []);
  capacityTableSegments: ICapacityStepCapacityTableSegments;
  capacityTableSaveLoad: boolean;
  tableListLoader: boolean;
  uploadPathAccess: string;

  get totalCapacity() {
    return this._opCapacitiesStepCapacityTableForm.capacitySegmentList.controls
      .map((formGroup: FormGroup) => {
        return this._opCapacitiesStepCapacityTableForm.segmentCapacityByGroup(
          formGroup
        );
      })
      .reduce((acc, value: FormControl) => acc + value.value, 0);
  }

  get drugStoreCardTitle() {
    return `${this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection.fulfillmentCenterCode}
     - ${this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection.text}`;
  }

  constructor(
    public _opCapacitiesStepCapacityTableForm: OpCapacitiesStepCapacityTableFormService,
    private _opCapacitiesStepCapacityTable: OpCapacitiesStepCapacityTableService,
    private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
    private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
    private _dialogTwoActions: DialogTwoActionsService
  ) {
    this.tableListLoader = true;
  }

  ngOnInit(): void {
    this.initialSettings();
    const subscription =
      this._opCapacitiesStepCapacityTableForm.capacitySegmentList.valueChanges.subscribe(
        () => {
          this.tableListLoader = false;
          this.updateView();
          this.capacityTableSelection.clear();
        }
      );
    this.subscriptions.add(subscription);
    this.updateCapacityTableFormView();
    this.updateCapacityTableSegments();
  }

  initialSettings() {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreSave =
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreTab =
      ECapacityStepGroupOrDrugstore.drugstore;
    this._opCapacitiesStepEditionMode.editionModeSave =
      ECapacitiesStepEditionMode.default;

    this.uploadPathAccess = `${ROUTER_PATH.capacitiesServiceType}/${
      CDeliveryServiceTypeRoute[this.serviceType]
    }`;
  }

  isAllSelected(): boolean {
    const numSelected = this.capacityTableSelection.selected.length;
    const numRows =
      this._opCapacitiesStepCapacityTableForm.capacitySegmentList.controls
        .length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.capacityTableSelection.clear()
      : this._opCapacitiesStepCapacityTableForm.capacitySegmentList.controls.forEach(
          (formGroup: FormGroup) =>
            this.capacityTableSelection.select(formGroup)
        );
  }

  applyCapacity(): void {
    this.capacityTableSelection.selected.forEach((row: FormGroup) => {
      this._opCapacitiesStepCapacityTableForm
        .segmentCapacityByGroup(row)
        .patchValue(
          this._opCapacitiesStepCapacityTableForm.capacityForSelection.value
        );
    });
  }

  updateView(): void {
    this.dataSource.next(
      this._opCapacitiesStepCapacityTableForm.capacitySegmentList
        .controls as FormGroup[]
    );
  }

  updateCapacityTableSegments(): void {
    const subscription =
      this._opCapacitiesStepCapacityTable.capacityTableSegments$.subscribe(
        (capacityTableSegments: ICapacityStepCapacityTableSegments) => {
          this.capacityTableSegments = capacityTableSegments;
          this._opCapacitiesStepCapacityTableForm.capacitySegmentList.clear();

          if (
            capacityTableSegments &&
            capacityTableSegments.capacitySegmentList
          ) {
            capacityTableSegments.capacitySegmentList.forEach((segment) => {
              const capacitySegmentListGroup =
                this._opCapacitiesStepCapacityTableForm
                  .capacitySegmentListGroup;
              this._opCapacitiesStepCapacityTableForm
                .segmentHourByGroup(capacitySegmentListGroup)
                .setValue(
                  segment && segment.segmentHour ? segment.segmentHour : ''
                );
              this._opCapacitiesStepCapacityTableForm
                .segmentCapacityByGroup(capacitySegmentListGroup)
                .setValue(
                  segment && segment.segmentCapacity
                    ? segment.segmentCapacity
                    : 0
                );
              this._opCapacitiesStepCapacityTableForm
                .segmentValueByGroup(capacitySegmentListGroup)
                .setValue(
                  segment && segment.segmentValue ? segment.segmentValue : ''
                );

              this._opCapacitiesStepCapacityTableForm.capacitySegmentList.push(
                capacitySegmentListGroup
              );
            });
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  updateCapacityTableFormView(): void {
    const subscription =
      this._opCapacitiesStepCapacityTable.capacityTableFormView$.subscribe(
        (eCapacitiesStepCapacityTable: ECapacitiesStepCapacityTable) => {
          switch (eCapacitiesStepCapacityTable) {
            case ECapacitiesStepCapacityTable.daysRange:
              this._opCapacitiesStepCapacityTableForm.capacityRange.enable();
              break;
            case ECapacitiesStepCapacityTable.hourlyCapacity:
              this._opCapacitiesStepCapacityTableForm.capacityRange.disable();
              break;
          }
          // this.capacityTableDateRange =
          //   this._opCapacitiesStepCapacityTableForm.capacityRange.enabled;
        }
      );
    this.subscriptions.add(subscription);
  }

  saveCapacityTable(): void {
    const subscription = this._dialogTwoActions
      .openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          if (
            this._opCapacitiesStepCapacityTableForm.capacityTableForm$.valid
          ) {
            this.capacityTableSaveLoad = true;
            this._opCapacitiesStepCapacityTable.capacityTableSave =
              new FromFormToCapacityStepCapacityTableSegments(
                this._opCapacitiesStepCapacityTableForm.capacityTableForm$
                  .value as ICapacityStepCapacityTableFormValue
              );
          }
        }
      });
    this.subscriptions.add(subscription);
  }

  cancelCapacityTable(): void {
    this._opCapacitiesStepCapacityTable.capacityTableCancel = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
