import { FormControl } from '@angular/forms';
import { GenericValidator } from '@validators/generic-validator';

export class CapacityQuantityForSelectionControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      GenericValidator.validateNumberMaxLength(5)
    ]);
  }
}
