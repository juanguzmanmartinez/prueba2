import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDayList } from 'src/app/shared/services/models/calendar.model';
import { CustomSelectControl } from '../../operations-admin/controls/custom-select-control';
import { CustomControl } from '../controls/custom-control';
import { ISegment } from 'src/app/shared/services/models/capacity.model';

@Injectable({
  providedIn: 'root'
})
export class CapacityEditFormsService {
  public form: FormGroup = new FormGroup({});

  private checkbox = new CustomControl();
  private inputs = new CustomControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkbox: this.checkbox,
      inputs: this.inputs,
      timeSegment01: this.formArray,
      timeSegment02: this.formArray,
    });
  }

  public get checkboxControl() {
    return this.form.get('checkbox') as CustomControl;
  }

  public get inputGeneralControl() {
    return this.form.get('inputs') as CustomControl;
  }

  public get formValues() {
    return {
      checkbox: this.checkbox.value,
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
      this.timeSegment01Array.push(this.scheduleControl(items[index]));
    }
  }
  public addItemsToBlock02(items: ISegment[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < items.length; index++) {
      this.timeSegment02Array.push(this.scheduleControl(items[index]));
    }
  }

  // setting for day controls
  public get scheduleFormGroup() {
    return this.formBuilder.group({
      day: new FormControl(),
    });
  }

  public scheduleControl(item: ISegment) {
    return this.formBuilder.group({
      schedule: item,
    });
  }

}
