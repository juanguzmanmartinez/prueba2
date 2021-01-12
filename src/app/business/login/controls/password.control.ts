import { FormControl, Validators } from '@angular/forms';
import {  PASSWORD_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { getErrorByFormControl } from '@helpers/control-error.helper';

export class PasswordControl extends FormControl {

  constructor() {
    super('');
    this.settingNameValidators();
  }

  private settingNameValidators() {
    this.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/[A-a]/)
    ]);
  }

  public get passwordControlError(): string {
    return getErrorByFormControl(this, PASSWORD_ERROR_MESSAGES);
  }

}
