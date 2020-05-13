import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';

const INITIAL_OPTION = { value: '', text: '' };
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit {

  public isDisabled = false;
  public selectedOption: ICustomSelectOption = INITIAL_OPTION as ICustomSelectOption;
  public selectedDrugstores: ICustomSelectOption = INITIAL_OPTION as ICustomSelectOption;

  public drugstoreSelected = '';

  @Output() dataDrugstore = new EventEmitter();
  @Input() label = '';
  @Input() size = 'm'; // 's', 'm', 'l'
  @Input() marginBottom = '';
  @Input() customClass = '';
  @Input() hasErrorMessage = false;
  @Input() errorMessage = '';
  @Input() options: ICustomSelectOption[] = [
    { value: '1', text: 'Botica01 - Flora tristán' },
    { value: '2', text: 'Botica02 - Raul Ferrero' },
    { value: '3', text: 'Botica03 - Los Olivos' },
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
    const selectedValue = target.value;
    const selectedOption = this.options.find(option => option.value === selectedValue);
    this.selectedDrugstores = selectedOption;
    this.onChange(selectedOption ? selectedOption : INITIAL_OPTION);
    this.onTouch(true);
  }

  public selectedDrugstore() {
    this.dataDrugstore.emit(this.selectedDrugstores);
  }
}
