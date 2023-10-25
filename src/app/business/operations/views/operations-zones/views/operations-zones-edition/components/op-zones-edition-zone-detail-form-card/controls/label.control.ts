import { FormControl, Validators } from '@angular/forms';

export class LabelControl extends FormControl {

  constructor(formState?: any) {
    super(formState || '');
    this.settingValidators();
  }

  public settingValidators() {
    this.setValidators([
      Validators.required,
    ]);
  }

}
