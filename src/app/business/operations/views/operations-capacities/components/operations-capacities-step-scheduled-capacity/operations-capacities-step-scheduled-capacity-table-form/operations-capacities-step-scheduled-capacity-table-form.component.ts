import {Component, OnInit, Optional, SkipSelf} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {OperationsCapacitiesStepScheduledCapacityFormService} from '../form/operations-capacities-step-scheduled-capacity-form.service';

@Component({
  selector: 'app-operations-capacities-step-scheduled-capacity-table-form',
  templateUrl: './operations-capacities-step-scheduled-capacity-table-form.component.html',
  styleUrls: ['./operations-capacities-step-scheduled-capacity-table-form.component.scss']
})
export class OperationsCapacitiesStepScheduledCapacityTableFormComponent implements OnInit {

  scheduledCapacityDisplayedColumns: string[] = ['value', 'hour', 'capacity'];
  scheduledCapacityDataSource = new BehaviorSubject<FormGroup[]>([]);
  scheduledCapacitySelection = new SelectionModel<FormGroup>(true, []);

  constructor(
    @Optional() @SkipSelf() public _operationsCapacitiesStepScheduledCapacityForm: OperationsCapacitiesStepScheduledCapacityFormService
  ) {
  }

  ngOnInit() {
    this.updateView();
  }

  isAllSelected() {
    const numSelected = this.scheduledCapacitySelection.selected.length;
    const numRows = this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.controls.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.scheduledCapacitySelection.clear() :
      this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.controls
        .forEach((formGroup: FormGroup) => this.scheduledCapacitySelection.select(formGroup));
  }

  applyCapacity() {
    this.scheduledCapacitySelection.selected.forEach((row: FormGroup) => {
      this._operationsCapacitiesStepScheduledCapacityForm.segmentCapacityByGroup(row)
        .patchValue(this._operationsCapacitiesStepScheduledCapacityForm.capacityForSelection.value);
    });
  }

  updateView() {
    this.scheduledCapacityDataSource.next(this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.controls as FormGroup[]);
  }

  get totalCapacity() {
    return this._operationsCapacitiesStepScheduledCapacityForm.scheduledSegmentList.controls.map((formGroup: FormGroup) => {
      return this._operationsCapacitiesStepScheduledCapacityForm.segmentCapacityByGroup(formGroup);
    })
      .reduce((acc, value: FormControl) => acc + value.value, 0);
  }

}
