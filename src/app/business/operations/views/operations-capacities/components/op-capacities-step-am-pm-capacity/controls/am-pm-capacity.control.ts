import { FormControl, Validators } from '@angular/forms';
import { GenericValidator } from '../../../../../../../commons/validators/generic-validator';

export class AmPmCapacityControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.minLength(1),
      GenericValidator.validateNumberMaxLength(5)
    ]);
  }
}
