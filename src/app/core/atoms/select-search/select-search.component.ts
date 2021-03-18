import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { isObject } from '@helpers/objects-equal.helper';
import { normalizeValue } from '@helpers/string.helper';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent<T> implements ControlValueAccessor, OnInit {

  private optionList: T[] = [];
  public _optionSelected: T;
  public filteredOptions: T[];
  public showSearchInput: boolean;
  public inputSelectSearchControl = new FormControl();

  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() clearValue: string;
  @Input() id: string | number = 'select-search';

  @Input('value')
  set _value(option: T) {
    this._optionSelected = option;
  }

  @Input('optionList')
  set _optionList(optionList: T[]) {
    this.optionList = optionList;
    this.filteredOptions = optionList;
  }

  @Output() optionSelected = new EventEmitter<T>();

  @ContentChild('optionSelectedTemplate') optionSelectedTemplate: TemplateRef<any>;
  @ContentChild('optionTemplate') optionTemplate: TemplateRef<any>;
  @ViewChild('inputSelectSearch') inputSelectSearch: ElementRef<HTMLInputElement>;


  onChange = (_: any) => {  };
  onTouch = (_: any) => {  };

  constructor(@Optional() @Self() public ngControl: NgControl) {
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


  public optionSelectedAutocomplete(optionSelected: MatAutocompleteSelectedEvent) {
    this._optionSelected = optionSelected.option.value;
    this.optionSelected.emit(this._optionSelected);
    this.onChange(this._optionSelected);

    this.filteredOptions = this.optionList;
    this.inputSelectSearch.nativeElement.blur();
    this.inputSelectSearch.nativeElement.value = '';
    this.showSearchInput = false;
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
    this._optionSelected = obj;
  }

}
