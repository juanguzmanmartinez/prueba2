import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() value: any;
    @Input() disabled: boolean;
    @Input() checked = false;
    @Input() innerClass: string;

    private subscriptions: Subscription[] = [];
    public radioName: string | number = 'radio';

    onChange = (_: any) => {};
    onTouched = (_: any) => {};

    constructor(
        @Optional() @Self() public ngControl: NgControl
    ) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl) {
            if (this.ngControl.name) {
                this.radioName = this.ngControl.name;
            }
            if (this.ngControl.control) {
                const subscription = this.ngControl.valueChanges.subscribe(() => {
                    this.checked = this.ngControl.value === this.value;
                });
                this.subscriptions.push(subscription);
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: any): void {
        this.checked = value === this.value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    chooseRadio() {
        this.onChange(this.value);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
