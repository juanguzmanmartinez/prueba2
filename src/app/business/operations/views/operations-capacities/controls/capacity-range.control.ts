import { FormControl, Validators } from '@angular/forms';
import { IDatepickerRange } from '@atoms/input-datepicker/input-datepicker-range/input-datepicker-range.component';
import { DatesHelper } from '@helpers/dates.helper';

export class CapacityRangeControl extends FormControl {

  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
      this.validatorsValidDateRange
    ]);
  }

  validatorsValidDateRange(control: FormControl): { [key: string]: boolean } | null {
    if (control.value) {
      const datepickerRange = control.value as IDatepickerRange;
      const yesterday = DatesHelper.yesterday;
      const startDate = DatesHelper.Date(datepickerRange.startDate);
      const endDate = DatesHelper.Date(datepickerRange.endDate);
      const validStartDate = startDate.isAfter(yesterday, 'd');
      const validEndDate = endDate.isSameOrAfter(startDate, 'd');
      const validDateRange = validStartDate && validEndDate;
      return validDateRange ? null : {validDateRange};
    }
    return null;
  }

}
