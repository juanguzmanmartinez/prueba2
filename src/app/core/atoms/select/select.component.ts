import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { isObject } from '@helpers/objects-equal.helper';
import { normalizeValue } from '@helpers/string.helper';
import { Observable, Subscription } from 'rxjs';

export interface SearchOptionsI {
  code: string;
  desc: string;
  hidden: boolean;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent<T>
  implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit
{
  private subscriptions = new Subscription();

  public optionContainerWidth = '300px';
  public value: T | T[];
  public disableOptionsMultiple = false;

  @Input() name: string | number;
  @Input() placeholder = 'placeholder';
  @Input() customValue = false;
  @Input() clearValue: string;
  @Input() disabled: boolean;
  @Input() multiple: boolean;
  @Input() selectOptionSquare = false;
  @Input() containerMaxHeight = '300px';
  @Input() optionList: T[] | SearchOptionsI[] = [];
  @Input() showClearValueForButton = false;
  @Input() enableSearch = false;
  @Input() enableNoSpace = false;
  @Input() customFontName = null;
  @Input() maxLimit: number = 7;
  @Input() error: boolean;
  @Input() containerSearchClass = '';
  @Input() inputSearchClass = '';
  @Input('value')
  set _value(option: T | T[]) {
    this.validValue(option);
  }

  @Output() optionChange = new EventEmitter();
  @Output() clearValueForButton = new EventEmitter();
  @Output() filterList = new EventEmitter<string>(true);
  @Output() focusSelect = new EventEmitter();
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @ViewChild('selectContainer') selectContainer;
  @ViewChild('select') select: MatSelect;
  @ViewChild('input') input;

  onChange = (_: any) => {};
  onTouched = (_: any) => {};
  onFocus = (_: any) => {};
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
      this.subscriptions.add(subscription);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.optionContainerWidth = `${this.selectContainer.nativeElement.offsetWidth}px`;
    });
  }

  resized(event: void): void {
    this.optionContainerWidth = `${this.selectContainer.nativeElement.offsetWidth}px`;
  }

  validValue(value: T | T[]) {
    let savedValue = !!this.value ? this.value.toString() : '';
    let newValue = !!value ? value.toString() : '';
    if (isObject(this.value)) {
      savedValue = Object.keys(this.value)
        .map((key) => normalizeValue(this.value[key]))
        .join('');
    }
    if (isObject(value)) {
      newValue = Object.keys(value)
        .map((key) => normalizeValue(value[key]))
        .join('');
    }

    if (newValue !== savedValue && !!value) {
      this.value = value;
    } else if (!value) {
      this.value = null;
    }
  }

  onKey(event): void {
    this.filterList.emit(event.target.value);
  }

  addSpace(): void {
    const currentText = this.input.nativeElement.value;
    this.input.nativeElement.value = currentText + ' ';
  }

  listenToggleSelect(opened: boolean): void {
    if (this.enableSearch) {
      if (opened) {
        setTimeout(() => {
          this.input.nativeElement.focus();
        });
      } else {
        this.input.nativeElement.value = '';
        this.filterList.emit('');
      }
    }
  }

  open() {
    this.select.open();
  }

  clearValues(): void {
    this.clearValueForButton.emit(true);
  }

  selectionChange(option: any) {
    // @ts-ignore
    this.disableOptionsMultiple =
      this.multiple && option.length > this.maxLimit;
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
