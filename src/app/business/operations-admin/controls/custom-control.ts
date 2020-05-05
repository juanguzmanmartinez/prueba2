import { FormControl, Validators } from '@angular/forms';

export class CustomControl extends FormControl {

  public value: string;

  constructor() {
    super('');
    this.settingNameValidators();
  }

  private settingNameValidators() {
    this.setValidators([
      Validators.required,
    ]);
  }

  public get dniError(): string {
    return getErrorbyFormControl(this, DNI_ERROR_MESSAGES);
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

export const DNI_ERROR_MESSAGES = {
  required: 'Campo requerido',
};
