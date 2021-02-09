import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements ControlValueAccessor, OnInit {
    @Input() radioValue: any;
    @Input() radioClass: any;

    public _radioName: string | number = 'radio';
    public _radioValue: any;
    public _radioDisabled: any;

    onChange = (_: any) => {};
    onTouched = (_: any) => {};


    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl && this.ngControl.name) {
            this._radioName = this.ngControl.name;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: any): void {
        this._radioValue = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this._radioDisabled = isDisabled;
    }

    chooseRadio() {
        this._radioValue = this.radioValue;
        this.onChange(this._radioValue);
    }

}
