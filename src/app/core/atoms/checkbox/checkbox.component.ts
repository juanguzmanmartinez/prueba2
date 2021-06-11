import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor, OnDestroy {
    private subscriptions: Subscription[] = [];

    public _checked: boolean;
    public _indeterminate: boolean;

    @Input() disabled: boolean;
    @Input() name: string | number = 'checkbox';
    @Input() innerClass: string;
    @Input() value: string;

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

    @Output() clicked = new EventEmitter();

    onChange = (_: any) => {};
    onTouched = () => {};


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
            if (this.ngControl.control) {
                const subscription = this.ngControl.valueChanges.subscribe(() => {
                    this._checked = this.ngControl.value;
                });
                this.subscriptions.push(subscription);
            }
        }
    }

    checkboxClick(event) {
        this.clicked.emit(event);
    }

    chooseCheckbox() {
        this.onChange(this.value || this._checked);
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

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
