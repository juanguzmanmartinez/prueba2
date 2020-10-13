import {Injectable, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CapacityRangeControl} from '../../../controls/capacity-range.control';
import {AmPmCapacityControl} from '../controls/am-pm-capacity.control';

@Injectable()
export class OperationsCapacitiesStepAmPmCapacityFormService implements OnDestroy {

  private readonly ampmCapacityForm: FormGroup;

  private _capacityRangeControl: FormControl = new CapacityRangeControl();
  private _amCapacityControl: FormControl = new AmPmCapacityControl();
  private _pmCapacityControl: FormControl = new AmPmCapacityControl();

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.ampmCapacityForm = this._formBuilder.group({
      capacityRange: this._capacityRangeControl,
      amCapacity: this._amCapacityControl,
      pmCapacity: this._pmCapacityControl
    });
    this.ampmCapacityForm.setValidators(this.ValidatorGroup);
  }

  ValidatorGroup(group: FormGroup) {
    if (group.controls && Object.keys(group.controls).length) {
      const amControl = group.controls.amCapacity as AmPmCapacityControl;
      const pmControl = group.controls.pmCapacity as AmPmCapacityControl;
      const validGroup = !!amControl.value || !!pmControl.value;
      return validGroup ? null : {validGroup};
    }
  }

  get amPmCapacityForm$() {
    return this.ampmCapacityForm;
  }

  get capacityRange() {
    return this.amPmCapacityForm$.get('capacityRange');
  }

  get amCapacity() {
    return this.amPmCapacityForm$.get('amCapacity');
  }

  get pmCapacity() {
    return this.amPmCapacityForm$.get('pmCapacity');
  }

  resetForm() {
    this.capacityRange.setValue(null);
    this.amCapacity.setValue(null);
    this.pmCapacity.setValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
