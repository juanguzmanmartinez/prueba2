import { FormControl, Validators } from '@angular/forms';
import { IDatepickerRange } from 'src/app/core/atoms/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';
import * as moment from 'moment';

export class CapacityRangeControl extends FormControl {
  constructor() {
    super(null);
    this.settingValidators();
  }

  private settingValidators() {
    this.setValidators([
      Validators.required,
      this.ValidatorsValidDateRange
    ]);
  }

  ValidatorsValidDateRange(control: FormControl): { [key: string]: boolean } | null {
    if (control.value) {
      const dateFormat = 'DD-MM-YYYY';
      const datepickerRange = control.value as IDatepickerRange;
      const yesterday = moment().subtract(1, 'days').startOf('day');
      const validStartDate = moment(datepickerRange.startDate, dateFormat).isAfter(yesterday, 'd');
      const validEndDate = moment(datepickerRange.endDate, dateFormat).isSameOrAfter(moment(datepickerRange.startDate, dateFormat), 'd');
      const validDateRange = validStartDate && validEndDate;
      return validDateRange ? null : {validDateRange};
    }
    return null;
  }
}
