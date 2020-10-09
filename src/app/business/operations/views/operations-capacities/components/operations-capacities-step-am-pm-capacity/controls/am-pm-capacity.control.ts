import {FormControl, Validators} from '@angular/forms';

export class AmPmCapacityControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.minLength(1),
    ]);
  }
}
