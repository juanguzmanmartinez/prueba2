import {Component, Input, OnDestroy, OnInit, Self} from '@angular/core';
import {CustomDateAdapter, MY_FORMATS} from '../input-datepicker/input-datepicker.component';
import {ControlValueAccessor, FormControl, FormGroup, NgControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {DatepickerHeaderComponent} from '../../components/datepicker-header/datepicker-header.component';

export interface IDatepickerRange {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-input-datepicker-range',
  templateUrl: './input-datepicker-range.component.html',
  styleUrls: ['./input-datepicker-range.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class InputDatepickerRangeComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public datepickerRangeSubscribe: Subscription[] = [];

  public datepickerRangeHeader = DatepickerHeaderComponent;
  public datepickerRangeName: string | number = 'input-datepicker';
  private datepickerRangeValue: IDatepickerRange = {} as IDatepickerRange;

  public datepickerRangeGroup: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });


  @Input() inputPlaceholder = 'dd/mm/aaaa';
  @Input() datepickerRangeInputFormat = 'DD/MM/YYYY';
  @Input() datepickerRangeOutputFormat = 'DD/MM/YYYY';
  @Input() datepickerRangeMin = moment();
  @Input() datepickerRangeMax: moment.Moment;
  @Input() datepickerDisabled = false;
  @Input() datepickerIconDisabled = false;

  @Input('datepickerStartValue')
  set _datepickerStartValue(value: string) {
    this.datepickerRangeStartControl
      .setValue(value ? moment(value, this.datepickerRangeInputFormat) : null);
  }

  @Input('datepickerEndValue')
  set _datepickerEndValue(value: string) {
    this.datepickerRangeEndControl
      .setValue(value ? moment(value, this.datepickerRangeInputFormat) : null);
  }


  onChange = (_: any) => {
  }
  onTouched = (_: any) => {
  }

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.changeDatepickerRangeValue();

    if (this.ngControl.name) {
      this.datepickerRangeName = this.ngControl.name;
    }
  }

  ngOnDestroy() {
    this.datepickerRangeSubscribe.forEach(subscribe => subscribe.unsubscribe());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: IDatepickerRange): void {
    this.datepickerRangeStartControl
      .setValue(value && value.startDate ? moment(value.startDate, this.datepickerRangeInputFormat) : null);
    this.datepickerRangeEndControl
      .setValue(value && value.endDate ? moment(value.endDate, this.datepickerRangeInputFormat) : null);
  }

  get datepickerRangeStartControl() {
    return this.datepickerRangeGroup.get('startDate') as FormControl;
  }


  get datepickerRangeEndControl() {
    return this.datepickerRangeGroup.get('endDate') as FormControl;
  }


  changeDatepickerRangeValue() {
    const datepickerRangeSubscribe = this.datepickerRangeGroup.valueChanges
      .subscribe((value) => {
        this.datepickerRangeValue.startDate = value && value.startDate ? moment(value.startDate, this.datepickerRangeInputFormat).format(this.datepickerRangeOutputFormat) : null;
        this.datepickerRangeValue.endDate = value && value.endDate ? moment(value.endDate, this.datepickerRangeInputFormat).format(this.datepickerRangeOutputFormat) : null;
        this.onChange(this.datepickerRangeValue);
      });
    this.datepickerRangeSubscribe.push(datepickerRangeSubscribe);
  }

}
