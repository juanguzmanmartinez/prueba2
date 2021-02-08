import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { DatepickerHeaderComponent } from '../../components/datepicker-header/datepicker-header.component';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-input-datepicker',
    templateUrl: './input-datepicker.component.html',
    styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

    protected subscription: Subscription;


    public datepickerHeader = DatepickerHeaderComponent;
    public value: Date;
    public minDate = new Date();
    public maxDate: Date;

    @Input() name: string | number = 'input-datepicker';
    @Input() placeholder = 'dd/mm/aaaa';
    @Input() disabled = false;

    @Input('minDate')
    set _minDate(value: string) {
        this.minDate = value ? new Date(value) : new Date();
    }

    @Input('maxDate')
    set _maxDate(value: string) {
        this.maxDate = value ? new Date(value) : null;
    }

    @Input('value')
    set _value(value: string) {
        this.value = new Date(value);
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
                this.name = this.ngControl.name;
            }

            this.subscription = this.ngControl.control.valueChanges.subscribe((value: string) => {
                const datepickerInput = value ? new Date(value) : null;
                if (this.value === datepickerInput) {
                    return;
                }
                this.writeValue(value);
            });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string): void {
        this.value = value ? new Date(value) : null;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    changeDatepicker(value: MatDatepickerInputEvent<Date>) {
        this.value = value ? value.value : null;
        this.onChange(this.value);
    }
}
