import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomControl } from '../controls/custom-control';
import { CustomSelectControl } from '../controls/custom-select-control';
import { IDayList } from 'src/app/shared/models/calendar/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class OperationAdminCalendarService {
  public form: FormGroup = new FormGroup({});

  private checkbox = new CustomControl();
  private dropdow = new CustomSelectControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkbox: this.checkbox,
      dropdow: this.dropdow,
      calendarMonth01: this.formArray,
      calendarMonth02: this.formArray,
    });
  }

  public get checkboxControl() {
    return this.form.get('checkbox') as CustomControl;
  }

  public get dropdowControl() {
    return this.form.get('dropdow') as CustomSelectControl;
  }

  public get formValues() {
    return {
      checkbox: this.checkbox.value,
      dropdow: this.dropdow.value
    };
  }

  // setting for FormArray
  public get formArray() {
    return this.formBuilder.array([]);
  }

  // setting for calendars
  public get calendarMonth01Array() {
    return this.form.get('calendarMonth01') as FormArray;
  }

  public get calendarMonth02Array() {
    return this.form.get('calendarMonth02') as FormArray;
  }

  public addDayControlToCalendar01() {
    this.calendarMonth01Array.push(this.dayFormGroup);
  }

  public addDayControlsToCalendar01(n: number) {
    for (let index = 0; index < n; index++) {
      this.calendarMonth01Array.push(this.dayFormGroup);
    }
  }

  public addItemsToCalendar01(items: IDayList[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < items.length; index++) {
      this.calendarMonth01Array.push(this.dayControl(items[index]));
    }
  }

  public addDayControlsToCalendar02(n: number) {
    for (let index = 0; index < n; index++) {
      this.calendarMonth02Array.push(this.dayFormGroup);
    }
  }

  // setting for day controls
  public get dayFormGroup() {
    return this.formBuilder.group({
      day: new FormControl(),
    });
  }

  public dayControl(item: IDayList) {
    return this.formBuilder.group({
      day: item,
    });
  }

}
