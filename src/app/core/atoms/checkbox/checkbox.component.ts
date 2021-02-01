import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

    public _checked: boolean;
    public _indeterminate: boolean;

    @Input() disabled: boolean;
    @Input() name = 'checkbox';
    @Input() innerClass: string;

    @Input('checked')
    get checked(): boolean {
        return this._checked;
    }

    set checked(checked) {
        this._checked = checked;
    }

    @Input('indeterminate')
    get indeterminate(): boolean {
        return this._indeterminate;
    }

    set indeterminate(checked) {
        this._indeterminate = checked;
    }

    onChange = (_: any) => {};

    onClick = (_: any) => {};
    onTouched = () => {};


    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
    }

    checkboxClick(event) {
        this.onClick(event);
    }

    chooseCheckbox() {
        this.onChange(this._checked);
        this._indeterminate = false;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this._checked = obj;
    }

}
