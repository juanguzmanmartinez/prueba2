import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})

export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public inputValue: string | number = '';
  public inputDisabled: boolean;

  @Input() inputId = '';
  @Input() inputName: string | number = 'input';
  @Input() inputType = 'text';
  @Input() inputPlaceholder = '';
  @Input() inputClass = '';
  @Input() inputLabelClass = '';
  @Input() inputError: boolean;
  @Input() inputDigitOnlyPipe: boolean;

  onTouch = () => {};
  onChange = (value: string | number) => {};
  onBlur = (_: any) => {};
  onFocus = (_: any) => {};


  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }


  ngOnInit(): void {
    if (this.ngControl) {
      if (this.ngControl.name) {
        this.inputName = this.ngControl.name;
      }

      const subscription = this.ngControl.control.valueChanges
        .subscribe((value) => {
          if (this.inputValue === value) {
            return;
          }
          this.writeValue(value);
        });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  writeValue(value: string | number): void {
    this.inputValue = `${value}` || '';
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputDisabled = isDisabled;
  }

  changeInputValue(): void {
    this.onChange(this.inputValue);
    this.onTouch();
  }

}
