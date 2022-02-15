import { FormControl, FormGroup } from '@angular/forms';

export class CheckboxGroupControlName {
  static value = 'name';
  static checked = 'checked';
}

export class CheckboxGroupControl extends FormGroup {

  get valueControl(): FormControl {
    return this.get(CheckboxGroupControlName.value) as FormControl;
  }

  get checkedControl(): FormControl {
    return this.get(CheckboxGroupControlName.checked) as FormControl;
  }

  constructor(name: string) {
    super({
      [CheckboxGroupControlName.value]: new FormControl(name),
      [CheckboxGroupControlName.checked]: new FormControl(false),
    });
  }
}
