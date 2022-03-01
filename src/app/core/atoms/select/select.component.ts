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
import { isObject } from '@helpers/objects-equal.helper';
import { normalizeValue } from '@helpers/string.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent<T> implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  public optionContainerWidth = '300px';
  public value: T | T[];

  @Input() name: string | number;
  @Input() placeholder = 'placeholder';
  @Input() customValue = false;
  @Input() clearValue: string;
  @Input() disabled: boolean;
  @Input() multiple: boolean;
  @Input() selectOptionSquare = false;
  @Input() containerMaxHeight = '300px';
  @Input() optionList: T[] = [];
  @Input() showClearValueForButton = false;

  @Input('value')
  set _value(option: T | T[]) {
    this.validValue(option);
  }

  @Output() optionChange = new EventEmitter();
  @Output() clearValueForButton = new EventEmitter();
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @ViewChild('select') select;

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
      this.subscriptions.add(subscription);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.optionContainerWidth = `${this.select.nativeElement.offsetWidth}px`;
    });
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

  clearValues(): void {
    this.clearValueForButton.emit(true);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
