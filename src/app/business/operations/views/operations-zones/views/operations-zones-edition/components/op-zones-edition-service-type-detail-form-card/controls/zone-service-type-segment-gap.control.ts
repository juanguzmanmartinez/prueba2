import { FormControl, Validators } from '@angular/forms';
import { GenericValidator } from '@validators/generic-validator';

export class ZoneServiceTypeSegmentGapControl extends FormControl {

  constructor(formState?: any) {
    super(formState);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
      GenericValidator.validateNumberMin(5)
    ]);
  }
}
