import { Component, Input, OnInit, Optional, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

    public _checked: boolean;

    @Input() disabled: boolean;
    @Input() name = 'switch';
    @Input() innerClass: string;

    @Input('checked')
    get checked(): boolean {
        return this._checked;
    }

    set checked(checked) {
        this._checked = checked;
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

    slideToggle() {
        this.onChange(this._checked);
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
