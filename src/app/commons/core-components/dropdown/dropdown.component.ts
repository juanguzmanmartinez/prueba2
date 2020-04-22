import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';

const INITIAL_OPTION = { value: -1, text: '' };
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  public isDisabled = false;
  public selectedOption: ICustomSelectOption = INITIAL_OPTION as ICustomSelectOption;

  @Input() label = 'text input label';
  @Input() size = 'm'; // 's', 'm', 'l'
  @Input() marginBottom = '';
  @Input() customClass = '';
  @Input() hasErrorMessage = false;
  @Input() errorMessage = '';
  @Input() options: ICustomSelectOption[] = [
    { value: 1, text: 'text 01' },
    { value: 2, text: 'text 02' },
    { value: 3, text: 'text 03' },
  ];

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(option: ICustomSelectOption): void {
    if (option.value && option.text) {
      this.selectedOption = option;
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

  public changeOption(target: HTMLSelectElement) {
    const selectedValue = Number(target.value);
    const selectedOption = this.options.find(option => option.value === selectedValue);
    this.onChange(selectedOption ? selectedOption : INITIAL_OPTION);
    this.onTouch(true);
  }

}
