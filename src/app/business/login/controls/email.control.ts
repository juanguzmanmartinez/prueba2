import { FormControl, Validators } from '@angular/forms';
import { EMAIL_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { getErrorByFormControl } from '@helpers/control-error.helper';

export class EmailControl extends FormControl {

  constructor() {
    super('');
    this.settingNameValidators();
  }

  private settingNameValidators() {
    this.setValidators([
      Validators.required,
      Validators.email,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ]);
  }

  public get emailControlError(): string {
    return getErrorByFormControl(this, EMAIL_ERROR_MESSAGES);
  }

}
