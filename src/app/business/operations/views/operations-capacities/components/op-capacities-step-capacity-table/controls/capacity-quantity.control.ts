import { FormControl, Validators } from '@angular/forms';
import { GenericValidator } from '../../../../../../../commons/validators/generic-validator';

export class CapacityQuantityControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
      Validators.minLength(1),
      GenericValidator.validateNumberMaxLength(5)
    ]);
  }
}
