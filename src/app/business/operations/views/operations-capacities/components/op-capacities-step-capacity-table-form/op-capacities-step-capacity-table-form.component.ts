import {
  Component,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OpCapacitiesStepCapacityTableFormService } from './form/op-capacities-step-capacity-table-form.service';

@Component({
  selector: 'app-op-capacities-step-capacity-table-form',
  templateUrl: './op-capacities-step-capacity-table-form.component.html',
  styleUrls: ['./op-capacities-step-capacity-table-form.component.scss'],
  providers: [OpCapacitiesStepCapacityTableFormService],
})
export class OpCapacitiesStepCapacityTableFormComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  displayedColumns: string[] = ['value', 'hour', 'capacity'];
  dataSource = new BehaviorSubject<FormGroup[]>([]);
  capacityTableSelection = new SelectionModel<FormGroup>(true, []);

  get totalCapacity() {
    return this._opCapacitiesStepCapacityTableForm.capacitySegmentList.controls
      .map((formGroup: FormGroup) => {
        return this._opCapacitiesStepCapacityTableForm.segmentCapacityByGroup(
          formGroup
        );
      })
      .reduce((acc, value: FormControl) => acc + value.value, 0);
  }

  constructor(
    @Optional()
    @SkipSelf()
    public _opCapacitiesStepCapacityTableForm: OpCapacitiesStepCapacityTableFormService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._opCapacitiesStepCapacityTableForm.capacitySegmentList.valueChanges.subscribe(
        () => {
          this.updateView();
          this.capacityTableSelection.clear();
        }
      );
    this.subscriptions.add(subscription);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
