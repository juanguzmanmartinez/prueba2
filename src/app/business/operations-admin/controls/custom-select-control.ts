import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { ICustomSelectOption } from '../interfaces/custom-controls.interface';
import { CUSTOM_SELECT_DEFAULT_VALUE } from './initial-control-values';

export class CustomSelectControl extends FormControl {

  public value: ICustomSelectOption;

  constructor() {
    super('');
    this.settingNameValidators();
    // this.setValue(CUSTOM_SELECT_DEFAULT_VALUE);
  }

  private settingNameValidators() {
    this.setValidators([
      Validators.required,
      this.customSelectValidator,
    ]);
  }

  public get selectErrorMessage(): string {
    return getErrorbyFormControl(this, CUSTOM_SELECT_ERROR_MESSAGES);
  }

  private customSelectValidator(control: AbstractControl) {
    const controlValue = control.value;
    return controlValue.value && controlValue.text ? null : { selectValidator: true };
  }

}

export function getEnableErrorMessages(formControl: FormControl): boolean {
  const value = formControl.invalid && ( formControl.touched || formControl.dirty );
  return value;
}

export function getErrorbyFormControl(formControl: FormControl, errorMessageArray: any ): string {
  if (getEnableErrorMessages(formControl)) {
    if (formControl.errors) {
      const errorKeys = Object.keys(formControl.errors);
      const currentKey = errorKeys[0];
      return errorMessageArray[currentKey];
    }
  }
  return '';
}

export const CUSTOM_SELECT_ERROR_MESSAGES = {
  required: 'Campo requerido',
  selectValidator: 'Opción invalida',
};
