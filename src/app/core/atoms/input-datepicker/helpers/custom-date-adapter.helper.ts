import { NativeDateAdapter } from '@angular/material/core';
import { DatesHelper } from '@helpers/dates.helper';

export class CustomDateAdapter extends NativeDateAdapter {
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        return ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    }

    getFirstDayOfWeek(): number {
        return 1;
    }

    format(date: Date, displayFormat: any): string {
        return DatesHelper.Date(date).format(displayFormat);
    }
}


export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
