import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements ControlValueAccessor, OnInit {
    @Input() value: any;
    @Input()  disabled: boolean;
    @Input()  checked: any;
    @Input() innerClass: string;

    public radioName: string | number = 'radio';

    onChange = (_: any) => {};
    onTouched = (_: any) => {};


    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl && this.ngControl.name) {
            this.radioName = this.ngControl.name;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: any): void {
        this.checked = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    chooseRadio() {
        this.onChange(this.value);
    }

}
