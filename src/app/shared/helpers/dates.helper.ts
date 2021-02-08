import * as moment from 'moment';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

export function getDaysRangeBetweenDates(endDate, startDate) {
    const firstDate = DatesHelper.Date(startDate ).startOf('day');
    const lastDate = DatesHelper.Date(endDate).startOf('day');
    const firstDateClone = firstDate.clone();

    const dateList = [];
    while (firstDateClone.isSameOrBefore(lastDate)) {
        dateList.push(firstDateClone.format(DATES_FORMAT.yearMonthDay));
        firstDateClone.add(1, 'days');
    }
    return dateList.join(',');
}

export class DatesHelper {

    static Date(
        date?: moment.MomentInput,
        format?: moment.MomentFormatSpecification,
        language?: string,
        strict?: boolean) {
        return moment(date, format, language, strict);
    }

    static get date() {
        return moment;
    }

    static get yesterday() {
        return this.Date().subtract(1, 'days').startOf('day');
    }

}
