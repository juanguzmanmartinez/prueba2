import { FormControl, Validators } from '@angular/forms';

export class CalendarControl extends FormControl {

  constructor() {
    super('');
    this.settingCalendarValidators();
  }

  private settingCalendarValidators() {
    this.setValidators([
        Validators.required,
    ]);
  }

}
