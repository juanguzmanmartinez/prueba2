import {Injectable, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CapacityRangeControl} from '../../../controls/capacity-range.control';
import {CapacityQuantityControl} from '../controls/capacity-quantity.control';

@Injectable()
export class OperationsCapacitiesStepScheduledCapacityFormService implements OnDestroy {
  private readonly scheduledCapacityForm: FormGroup;

  private _capacityRangeControl: CapacityRangeControl = new CapacityRangeControl();
  private _capacityForSelectionControl: FormControl = new FormControl(null);
  private _scheduledSegmentListArray: FormArray = new FormArray([]);

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.scheduledCapacityForm = this._formBuilder.group({
      capacityRange: this._capacityRangeControl,
      capacityForSelection: this._capacityForSelectionControl,
      scheduledSegmentList: this._scheduledSegmentListArray
    });
  }

  get scheduledCapacityForm$() {
    return this.scheduledCapacityForm;
  }

  get capacityRange(): FormControl {
    return this.scheduledCapacityForm$.get('capacityRange') as CapacityRangeControl;
  }

  get capacityForSelection(): FormControl {
    return this.scheduledCapacityForm$.get('capacityForSelection') as FormControl;
  }

  get scheduledSegmentList(): FormArray {
    return this.scheduledCapacityForm$.get('scheduledSegmentList') as FormArray;
  }


  get scheduledSegmentListGroup(): FormGroup {
    return new FormGroup({
      segmentCapacity: new CapacityQuantityControl(),
      segmentHour: new FormControl(''),
      segmentValue: new FormControl(''),
    });
  }

  segmentCapacityByGroup(formGroup: FormGroup) {
    return formGroup.get('segmentCapacity');
  }

  segmentHourByGroup(formGroup: FormGroup) {
    return formGroup.get('segmentHour');
  }

  segmentValueByGroup(formGroup: FormGroup) {
    return formGroup.get('segmentValue');
  }


  resetForm() {
    this.capacityRange.patchValue(null);
    this.capacityForSelection.patchValue(null);
    this.scheduledSegmentList.patchValue([]);
  }

  ngOnDestroy() {
    this.resetForm();
  }

}
