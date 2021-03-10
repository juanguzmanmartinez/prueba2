import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { DocumentListener } from '../../../shared/listeners/document.listener';

@Component({
    selector: 'app-input-time',
    templateUrl: 'input-time.component.html',
    styleUrls: ['input-time.component.sass']
})
export class InputTimeComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private documentSubscription: Subscription;

    public time: number;
    public timeValue = '';
    public dateTime: boolean;
    public timeFormat: string;
    public toggleTimePicker = false;


    @Input() name: string | number = 'input-time';
    @Input() placeholder = 'hh:mm';
    @Input() disabled: boolean;
    @Input() format: '12' | '24' = '24';
    @Input() minHour: number;
    @Input() maxHour: number;

    @Input('value')
    set value(time: number) {
        this.setTimeValue(time);
    }

    @Output() timeChange = new EventEmitter();

    @ViewChild('timePickerContainer', {read: ElementRef, static: true}) timerPicker: ElementRef;

    onChange = (_: any) => {};
    onTouched = (_: any) => {};

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        private _documentListener: DocumentListener
    ) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl?.name) {
            this.name = this.ngControl.name;
        }
        if (this.ngControl?.control) {
            const subscription = this.ngControl.control.valueChanges.subscribe((time: number) => {
                this.setTimeValue(time);
            });
            this.subscriptions.push(subscription);
        }

    }

    setTimeValue(time: number) {
        this.time = time;
        this.dateTime = this.format === '12';
        this.timeFormat = this.dateTime ? DATES_FORMAT.hourMinuteDateTime : DATES_FORMAT.hourMinute24Hours;
        const value = DatesHelper.Date(time, DATES_FORMAT.millisecond);
        this.timeValue = value.isValid() ? value.format(this.timeFormat) : '';
    }

    pickerTimeChange(time: number) {
        this.time = time;
        const value = DatesHelper.Date(time, DATES_FORMAT.millisecond);
        this.timeValue = value.isValid() ? value.format(this.timeFormat) : '';
        this.onChange(this.time);
        this.timeChange.emit(this.time);
    }


    detectClickOutside() {
        this.documentSubscription = this._documentListener.click$.subscribe((eventTarget) => {
            if (!this.timerPicker.nativeElement.contains(eventTarget)) {
                this.closeTimePicker();
            }
        });
    }

    openTimePicker() {
        this.toggleTimePicker = !this.toggleTimePicker;
        if (this.toggleTimePicker) {
            this.detectClickOutside();
        } else {
            this.closeTimePicker();
        }
    }

    closeTimePicker() {
        this.toggleTimePicker = false;
        this.documentSubscription?.unsubscribe();
    }

    registerOnChange(fn: any): void {
        this.onChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(time: number): void {
        this.setTimeValue(time);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        if (!this.documentSubscription?.closed) {
            this.documentSubscription?.unsubscribe();
        }
    }

}
