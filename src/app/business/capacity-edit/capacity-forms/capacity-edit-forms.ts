import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { CustomControl } from '../controls/custom-control';
import { ISegment } from 'src/app/shared/models/calendar/capacity.model';
import { ICapacityGroupControl } from '../interfaces/controls.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class CapacityEditFormsService {
  public form: FormGroup = new FormGroup({});

  private inputs = new CustomControl();

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

  public addScheduleControlToBlock02(n: number) {
    for (let index = 0; index < n; index++) {
      this.timeSegment02Array.push(this.scheduleFormGroup);
    }
  }

  public addItemsToBlock01(items: ISegment[]) {
    for (const item of items) {
      this.timeSegment01Array.push(this.scheduleControl(item, item.enabled));
    }
  }
  public addItemsToBlock02(items: ISegment[]) {
    for (const item of items) {
      this.timeSegment02Array.push(this.scheduleControl(item, item.enabled));
    }
  }

  // setting for day controls
  private get scheduleFormGroup() {
    return this.formBuilder.group({
      hour: new FormControl(),
    });
  }

  private scheduleControl(item: ISegment, enabled: boolean) {
    const formControl = new FormControl(item ? item : {} as ISegment, Validators.maxLength(2));
    const hourFormControl = new FormControl(item.hour ? item.hour : '');
    if (!enabled) {
      formControl.disable();
    }
    return this.formBuilder.group({
      schedule: formControl,
      hour: hourFormControl,
    });
  }

  private getUpdatedCapacitiesValuesForSegmentArray(capacitiesSegmentArray: FormArray) {
    const { length } = capacitiesSegmentArray;
    // here we get necessary values
    const values: ICapacityGroupControl[] = [];
    for (let index = 0; index < length; index++) {
      const groupControl = capacitiesSegmentArray.at(index) as FormGroup;
      const capacityControl = groupControl.get('schedule');
      const hourControl = groupControl.get('hour');
      if (capacityControl.enabled) {
        values.push({
          capacity: capacityControl.value,
          hour: hourControl.value,
        } as ICapacityGroupControl);
      }
    }
    const capacitiesArray = values.map(value => value.capacity);
    const hourArray = values.map(value => value.hour);
    return {
      capacitiesString: capacitiesArray.join(','),
      hoursString: hourArray.join(','),
    };
  }

  public getCapacitiesAndHoursFromSegment01() {
    const { timeSegment01Array } = this;
    return this.getUpdatedCapacitiesValuesForSegmentArray(timeSegment01Array);
  }

  public getCapacitiesAndHoursFromSegment02() {
    const { timeSegment02Array } = this;
    return this.getUpdatedCapacitiesValuesForSegmentArray(timeSegment02Array);
  }

  public getTotalCapacitySegment01$() {
    const { timeSegment01Array } = this;
    const { length } = timeSegment01Array;
    const capacityControls$: Observable<number>[] = [];
    for (let index = 0; index < length; index++) {
      const groupControl = timeSegment01Array.at(index) as FormGroup;
      const capacityControl = groupControl.get('schedule');
      if (capacityControl.enabled) {
        const capacityControl$ = capacityControl.valueChanges as Observable<number>;
        capacityControls$.push(capacityControl$);
      }
    }
    return combineLatest(capacityControls$)
      .pipe(map((capacityValues) => {
        return capacityValues.reduce((acc, cur) => acc + cur, 0);
      }));
  }

  public getTotalCapacitySegment02$() {
    const { timeSegment02Array } = this;
    const { length } = timeSegment02Array;
    const capacityControls$: Observable<number>[] = [];
    for (let index = 0; index < length; index++) {
      const groupControl = timeSegment02Array.at(index) as FormGroup;
      const capacityControl = groupControl.get('schedule');
      if (capacityControl.enabled) {
        const capacityControl$ = capacityControl.valueChanges as Observable<number>;
        capacityControls$.push(capacityControl$);
      }
    }
    return combineLatest(capacityControls$)
      .pipe(map((capacityValues) => {
        return capacityValues.reduce((acc, cur) => acc + cur, 0);
      }));
  }

  public setAllCapacitiesOfSegment01(valueForAll: number) {
    const { timeSegment01Array } = this;
    const { length } = timeSegment01Array;
    for (let index = 0; index < length; index++) {
      const groupControl = timeSegment01Array.at(index) as FormGroup;
      const capacityControl = groupControl.get('schedule');
      if (capacityControl.enabled) {
        capacityControl.setValue(valueForAll);
      }
    }
  }
  public setAllCapacitiesOfSegment02(valueForAll: number) {
    const { timeSegment02Array } = this;
    const { length } = timeSegment02Array;
    for (let index = 0; index < length; index++) {
      const groupControl = timeSegment02Array.at(index) as FormGroup;
      const capacityControl = groupControl.get('schedule');
      if (capacityControl.enabled) {
        capacityControl.setValue(valueForAll);
      }
    }
  }
}
