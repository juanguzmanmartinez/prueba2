import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text-customer',
  templateUrl: './input-text-customer.component.html',
  styleUrls: ['./input-text-customer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextCustomerComponent),
      multi: true
    }
  ]
})
export class InputTextCustomerComponent implements OnInit {

  public isDisabled = false;
  public value = '';

  @Input() hasErrorMessage = false;
  @Input() errorMessage = '';
  @Input() width = '';
  @Input() maxLength = 100;
  @Input() placeholder = '';

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public changeInput(target: HTMLInputElement) {
    const value = target.value;
    this.onChange(value);
    this.onTouch(true);
  }


}
