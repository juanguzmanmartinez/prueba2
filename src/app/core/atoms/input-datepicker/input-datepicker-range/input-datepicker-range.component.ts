import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatepickerHeaderComponent } from '../components/datepicker-header/datepicker-header.component';
import { DatesHelper } from '@helpers/dates.helper';

export interface IDatepickerRange {
    startDate: number;
    endDate: number;
}

@Component({
    selector: 'app-input-datepicker-range',
    templateUrl: './input-datepicker-range.component.html',
    styleUrls: ['./input-datepicker-range.component.scss'],
})
export class InputDatepickerRangeComponent implements ControlValueAccessor, OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public pickerHeaderComponent = DatepickerHeaderComponent;

    private value: IDatepickerRange = {} as IDatepickerRange;
    public minDate = new Date();
    public maxDate: Date;

    public formGroup: FormGroup = new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
    });


    @Input() name: string | number = 'input-datepicker-range';
    @Input() placeholder = 'dd/mm/aaaa';
    @Input() disabled = false;

    @Input('minDate')
    set _minDate(value: number) {
        this.minDate = value ? new Date(value) : new Date();
    }

    @Input('maxDate')
    set _maxDate(value: number) {
        this.maxDate = value ? new Date(value) : null;
    }

    @Input('startValue')
    set _startValue(value: number) {
        this.startDateControl
            .setValue(value);
    }

    @Input('endValue')
    set _endValue(value: number) {
        this.endDateControl
            .setValue(value);
    }


    onChange = (_: any) => {};
    onTouched = (_: any) => {};

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        this.changeValue();

        if (this.ngControl && this.ngControl.name) {
            this.name = this.ngControl.name;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: IDatepickerRange): void {
        this.startDateControl
            .setValue(value && value.startDate ? value.startDate : null);
        this.endDateControl
            .setValue(value && value.endDate ? value.endDate : null);
    }

    get startDateControl() {
        return this.formGroup.get('startDate') as FormControl;
    }


    get endDateControl() {
        return this.formGroup.get('endDate') as FormControl;
    }


    changeValue() {
        const datepickerRangeSubscribe = this.formGroup.valueChanges
            .subscribe((value) => {
                this.value.startDate = value && value.startDate ? DatesHelper.Date(value.startDate).valueOf() : null;
                this.value.endDate = value && value.endDate ? DatesHelper.Date(value.endDate).valueOf() : null;
                this.onChange(this.value);
            });
        this.subscriptions.push(datepickerRangeSubscribe);
    }

}
