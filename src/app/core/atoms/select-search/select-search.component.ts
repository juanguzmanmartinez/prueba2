import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete/autocomplete';
import { isObject } from '@helpers/objects-equal.helper';
import { normalizeValue } from '@helpers/string.helper';
import { Subject, timer } from 'rxjs';

@Component({
    selector: 'app-select-search',
    templateUrl: './select-search.component.html',
    styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent<T> implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

    private optionList: T[] = [];
    public _optionSelected: T;
    public _value: T;
    public filteredOptions: T[];
    public showSearchInput: boolean;
    public inputSelectSearchControl = new FormControl();

    private killTrigger: Subject<void> = new Subject();


    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Input() clearValue: string;
    @Input() selectId: string | number = 'select-search';

    @Input('value')
    set value(option: T) {
        this._value = option;
        this.setDefaultValue();
    }

    @Input('optionList')
    set _optionList(optionList: T[]) {
        this.optionList = optionList;
        this.filteredOptions = optionList;
        this.setDefaultValue();
    }

    @Output() optionSelected = new EventEmitter<T>();

    @ContentChild('optionSelectedTemplate') optionSelectedTemplate: TemplateRef<any>;
    @ContentChild('optionTemplate') optionTemplate: TemplateRef<any>;
    @ViewChild('inputSelectSearch', {static: true}) inputSelectSearch: ElementRef<HTMLInputElement>;
    @ViewChild('selectSearch', {static: true}) selectSearch: MatAutocomplete;


    onChange = (_: any) => {};
    onTouch = (_: any) => {};

    constructor(@Optional() @Self() public ngControl: NgControl,
                private changeDetectorRef: ChangeDetectorRef) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        this.inputSelectSearchControl.valueChanges
            .pipe(
                startWith(''),
                map((value: string) => {
                    this._optionSelected = null;
                    this.showSearchInput = !!value;
                    return this.filterPredicate(this.optionList, value);
                })
            )
            .subscribe((filteredOptions) => {
                this.filteredOptions = filteredOptions;
            });
    }

    ngAfterViewInit() {
        this.setDefaultValue();
    }

    public filterPredicate(data: T[], filter: string): T[] {
        const filterValue = normalizeValue(filter);
        return data.filter(option => {
            if (typeof option === 'string') {
                return normalizeValue(option).includes(filterValue);
            }
            if (isObject(option)) {
                const concatValue = Object.keys(option).map(key => normalizeValue(option[key])).join('');
                const everyValue = Object.keys(option).some(key => normalizeValue(option[key]).includes(filterValue));

                return normalizeValue(concatValue).includes(filterValue) || everyValue;
            }
            return false;
        });
    }


    public optionSelectedAutocomplete(optionSelected: T) {
        this._optionSelected = optionSelected;
        this.optionSelected.emit(this._optionSelected);
        this.onChange(this._optionSelected);

        this.filteredOptions = this.optionList;
        this.inputSelectSearch.nativeElement.blur();
        this.inputSelectSearch.nativeElement.value = '';
        this.showSearchInput = false;
    }

    setDefaultValue() {
        if (this._value && this.selectSearch.options && this.optionList.length) {
            const index = this.optionList.findIndex(option => {
                if (typeof option === 'string') {
                    return option === this._value.toString();
                }
                if (isObject(option)) {
                    const concatOption = Object.keys(option).map(key => normalizeValue(option[key])).join('');
                    const concatValue = Object.keys(this._value).map(key => normalizeValue(this._value[key])).join('');
                    return concatOption === concatValue;
                }
                return false;
            });
            if (index !== -1) {
                const validIndex = !!this.clearValue ? index + 1 : index;
                if (this.selectSearch.options.length === 0) {
                    timer(0, 500)
                        .pipe(takeUntil(this.killTrigger))
                        .subscribe(() => this.setOption(validIndex));
                } else {
                    this.setOption(validIndex);
                }
            }
        }
    }

    setOption(index) {
        const value = this.selectSearch.options.get(index);
        if (value) {
            this.killTrigger.next();
            value.select();
            this.selectSearch._emitSelectEvent(value);
            this.changeDetectorRef.detectChanges();
        }
    }


    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: T): void {
        this._value = obj;
        this.setDefaultValue();
    }

    ngOnDestroy() {
        this.killTrigger.next();
        this.killTrigger.complete();
    }

}
