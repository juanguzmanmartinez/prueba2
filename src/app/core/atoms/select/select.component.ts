import { Component, ContentChild, EventEmitter, Input, OnInit, Optional, Output, Self, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T> implements ControlValueAccessor, OnInit {


  @Input() optionList: Array<T> = [];
  @Input() placeholder = 'placeholder';
  @Input() clearValue: string;
  @Input() value: T;
  @Input() disabled: boolean;

  @Output() optionSelected = new EventEmitter();
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;


  onChange = (_: any) => {};
  onTouched = (_: any) => {};


  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
  }

  selectionChange(option: T) {
    this.optionSelected.emit(option);
    this.onChange(option);
  }


  writeValue(obj: T): void {
    this.value = obj;
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
}
