import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DatepickerHeaderComponent } from '../../components/datepicker-header/datepicker-header.component';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';


export class CustomDateAdapter extends MomentDateAdapter {
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        return ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    }

    getFirstDayOfWeek(): number {
        return 1;
    }
}

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-input-datepicker',
    templateUrl: './input-datepicker.component.html',
    styleUrls: ['./input-datepicker.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class InputDatepickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

    protected datepickerSubscribe: Subscription;

    public datepickerHeader = DatepickerHeaderComponent;
    public datepickerName: string | number = 'input-datepicker';
    public datepickerValue: moment.Moment;

    @Input() inputPlaceholder = 'dd/mm/aaaa';
    @Input() datepickerInputFormat = 'DD/MM/YYYY';
    @Input() datepickerOutputFormat = 'DD/MM/YYYY';
    @Input() datepickerMin = moment();
    @Input() datepickerMax: moment.Moment;

    @Input('datepickerValue')
    set _datepickerValue(value: string) {
        this.datepickerValue = value ? moment(value, this.datepickerInputFormat) : null;
    }

    onChange = (_: any) => {};
    onTouched = (_: any) => {};

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl) {
            if (this.ngControl.name) {
                this.datepickerName = this.ngControl.name;
            }

            this.datepickerSubscribe = this.ngControl.control.valueChanges.subscribe((value: string) => {
                const datepickerInput = value ? moment(value, this.datepickerInputFormat) : null;
                if (this.datepickerValue === datepickerInput) {
                    return;
                }
                this.writeValue(value);
            });
        }
    }

    ngOnDestroy() {
        this.datepickerSubscribe.unsubscribe();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string): void {
        this.datepickerValue = value ? moment(value, this.datepickerInputFormat) : null;
    }


    changeDatepicker(value: MatDatepickerInputEvent<moment.Moment>) {
        this.datepickerValue = value.value;
        const datepickerOutput = value ? moment(value.value).format(this.datepickerOutputFormat) : null;
        this.onChange(datepickerOutput);
    }
}
