import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isObject } from '@helpers/objects-equal.helper';
import { normalizeValue } from '@helpers/string.helper';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent<T> implements ControlValueAccessor, OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public value: T;

    @Input() name: string | number;
    @Input() placeholder = 'placeholder';
    @Input() clearValue: string;
    @Input() disabled: boolean;
    @Input() optionList: T[] = [];

    @Input('value')
    set _value(option: T) {
        this.validValue(option);
    }

    @Output() optionChange = new EventEmitter();
    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;


    onChange = (_: any) => {};
    onTouched = (_: any) => {};


    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (this.ngControl?.name) {
            this.name = this.ngControl.name;
        }
        if (this.ngControl?.control) {
            const subscription = this.ngControl.valueChanges.subscribe(() => {
                this.validValue(this.ngControl.value);
            });
            this.subscriptions.push(subscription);
        }
    }

    validValue(value: T) {
        let savedValue = !!this.value ? this.value.toString() : '';
        let newValue = !!value ? value.toString() : '';
        if (isObject(this.value)) {
            savedValue = Object.keys(this.value).map(key => normalizeValue(this.value[key])).join('');
        }
        if (isObject(value)) {
            newValue = Object.keys(value).map(key => normalizeValue(value[key])).join('');
        }

        if (newValue !== savedValue && !!value) {
            this.value = value;
        } else if (!value) {
            this.value = null;
        }

    }

    selectionChange(option: T) {
        this.optionChange.emit(option);
        this.onChange(option);
    }


    writeValue(obj: T): void {
        this.validValue(obj);
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

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
