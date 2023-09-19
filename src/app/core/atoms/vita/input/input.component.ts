import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public inputValue: string = '';
  public value: string;

  @Input() id = 'input';
  @Input() name: string | number = 'input';
  @Input() behavior: 'number' | 'text' | 'search' | 'password' = 'text';
  @Input() placeholder = 'placeholder';
  @Input() maxLength = '80';
  @Input() innerClass = '';
  @Input() labelClass = '';
  @Input() error: boolean;
  @Input() disabled: boolean;
  @Input() buttonClear: boolean;
  @Input() readOnly: boolean;
  @Input() isSearch: boolean;

  @Output() changeValue: EventEmitter<string | number> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  onTouch = () => {};
  onChange = (value: string) => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeInputValue(): void {
    this.onChange(this.inputValue);
    this.changeValue.emit(this.inputValue);
    this.onTouch();
  }
  onInputChange(value: string) {
    this.value = value;
    this.changeValue.emit(value);
    this.onChange(value);
  }

  emitOnFocus() {
    this.onFocus.emit();
  }

  clearValue(): void {
    this.onInputChange('');
    // this.inputValue = "";
    // this.changeInputValue();
  }
}
