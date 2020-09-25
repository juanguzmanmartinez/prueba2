import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {

  @Output() inputBlurEvent = new EventEmitter();
  @Output() inputFocusEvent = new EventEmitter();

  @Input() inputId = '';
  @Input() inputName = '';
  @Input() inputType = 'text';
  @Input() inputPlaceholder = '';
  @Input() inputClass = '';
  @Input() inputLabelClass = '';
  @Input() inputDisplay: 'block' |'inline-block' = 'inline-block';

  @Input() inputFormGroup: FormGroup = new FormGroup({});
  @Input() inputFormControlName = 'input';
  @Input() inputRequired: boolean;
  @Input() inputValue = '';

  public inputFormControl: FormControl;
  public inputDisabledControl: boolean;

  @Input()
  set inputDisabled(disabled: boolean) {
    this.inputDisabledControl = !!disabled;
    const action = disabled ? 'disable' : 'enable';
    if (this.inputFormControl) {
      this.inputFormControl[action]();
    }
  }

  @Input()
  set inputFormSetValue(value: string) {
    if (value && this.inputFormControl) {
      this.inputFormControl.setValue(value);
      this.inputValue = value;
    }
  }

  @Input() inputMaxLength: number;
  @Input() inputMinLength: number;
  @Input() inputError: boolean;


  constructor(public _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const controlValue = this.setControlValues();
    const controlValidations = this.setControlValidations();

    this.inputFormControl = this._formBuilder.control(
      controlValue,
      controlValidations
    );

    this.inputFormGroup.addControl(this.inputFormControlName, this.inputFormControl);
  }

  get formGroup() {
    return this.inputFormGroup.controls;
  }

  setControlValidations() {
    let controlValidation = [];

    if (this.inputRequired) {
      controlValidation = [...controlValidation, Validators.required];
    }
    if (!!this.inputMaxLength) {
      controlValidation = [...controlValidation, Validators.maxLength(this.inputMaxLength)];
    }
    if (!!this.inputMinLength) {
      controlValidation = [...controlValidation, Validators.minLength(this.inputMinLength)];
    }

    return controlValidation;
  }

  setControlValues() {
    let controlValue: any = this.inputValue;
    if (this.inputDisabledControl) {
      controlValue = {value: this.inputValue, disabled: this.inputDisabledControl};
    }

    return controlValue;
  }

}
