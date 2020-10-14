import {FormControl, Validators} from '@angular/forms';

export class ExpressResourceControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
      Validators.minLength(1),
    ]);
  }
}
