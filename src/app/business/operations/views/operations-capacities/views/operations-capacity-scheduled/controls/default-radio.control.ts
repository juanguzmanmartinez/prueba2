import { FormControl, Validators } from '@angular/forms';

export class DefaultRadioControl extends FormControl {

  constructor() {
    super('');
    this.settingDefaultRadioValidators();
  }

  private settingDefaultRadioValidators() {
    this.setValidators([
        Validators.required,
    ]);
  }

}
