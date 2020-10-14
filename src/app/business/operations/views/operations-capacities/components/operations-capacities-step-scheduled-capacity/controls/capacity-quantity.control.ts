import {FormControl, Validators} from '@angular/forms';

export class CapacityQuantityControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
    ]);
  }
}
