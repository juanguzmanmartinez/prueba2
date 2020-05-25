import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomControl } from '../controls/custom-control';
import { ISegment } from 'src/app/shared/services/models/capacity.model';

@Injectable({
  providedIn: 'root'
})
export class CapacityEditFormsService {
  public form: FormGroup = new FormGroup({});

  private inputs = new CustomControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      inputs: this.inputs,
      timeSegment01: this.formArray,
      timeSegment02: this.formArray,
    });
  }

  public get inputGeneralControl() {
    return this.form.get('inputs') as CustomControl;
  }

  public get formValues() {
    return {
      inputs: this.inputs.value
    };
  }

  // setting for FormArray
  public get formArray() {
    return this.formBuilder.array([]);
  }

  // setting for calendars
  public get timeSegment01Array() {
    return this.form.get('timeSegment01') as FormArray;
  }

  public get timeSegment02Array() {
    return this.form.get('timeSegment02') as FormArray;
  }

  public addScheduleControlToBlock01() {
    this.timeSegment01Array.push(this.scheduleFormGroup);
  }

  public addScheduleControlsToBlock01(n: number) {
    for (let index = 0; index < n; index++) {
      this.timeSegment02Array.push(this.scheduleFormGroup);
    }
  }

  public addItemsToBlock01(items: ISegment[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < items.length; index++) {
      // console.log(items[index].enabled, 'items');

      this.timeSegment01Array.push(this.scheduleControl(items[index], items[index].enabled));
      // console.log(items[index].enabled, 'items');

    }
  }
  public addItemsToBlock02(items: ISegment[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < items.length; index++) {
      this.timeSegment02Array.push(this.scheduleControl(items[index], items[index].enabled));
    }
  }

  // setting for day controls
  public get scheduleFormGroup() {
    return this.formBuilder.group({
      hour: new FormControl(),
    });
  }

  public scheduleControl(item: ISegment, valid: boolean) {
    return this.formBuilder.group({
      schedule: [{ value: item, disabled: !valid }],
    });
  }

}
