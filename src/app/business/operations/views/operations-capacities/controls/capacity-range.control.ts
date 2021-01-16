import { FormControl, Validators } from '@angular/forms';
import { IDatepickerRange } from '@atoms/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';
import { checkDateAfterDate, checkDateIsSameOrAfterDate, getDate, getYesterdayDate } from '@helpers/dates.helper';

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
            const yesterday = getYesterdayDate();
            const startDate = getDate(datepickerRange.startDate, dateFormat);
            const endDate = getDate(datepickerRange.endDate, dateFormat);
            const validStartDate = checkDateAfterDate(startDate, yesterday);
            const validEndDate = checkDateIsSameOrAfterDate(endDate, startDate);
            const validDateRange = validStartDate && validEndDate;
            return validDateRange ? null : {validDateRange};
        }
        return null;
    }
}
