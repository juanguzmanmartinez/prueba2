import * as moment from 'moment';
import { DurationInputArg1, DurationInputArg2 } from 'moment';

export function getDaysRangeBetweenDates(endDate, startDate) {
    const firstDate = moment(startDate, 'DD-MM-YYYY').startOf('day');
    const lastDate = moment(endDate, 'DD-MM-YYYY').startOf('day');
    const firstDateClone = firstDate.clone();

    const dateList = [];
    while (firstDateClone.isSameOrBefore(lastDate)) {
        dateList.push(firstDateClone.format('YYYY-MM-DD'));
        firstDateClone.add(1, 'days');
    }
    return dateList.join(',');
}

export function getDate(
    date?: string,
    format?: moment.MomentFormatSpecification,
    language?: string,
    strict?: boolean) {
    return moment(date, format, language, strict);
}

export function getYesterdayDate() {
    return moment().subtract(1, 'days').startOf('day');
}

export function addUnitOfTime(
    date: moment.Moment,
    amount?: DurationInputArg1,
    unit?: DurationInputArg2) {
    return date.add(amount, unit);
}

export function checkDateAfterDate(dateAfter: moment.Moment, dateBefore: moment.Moment) {
    return dateAfter.isAfter(dateBefore, 'd');
}

export function checkDateIsSameOrAfterDate(dateAfter: moment.Moment, dateBefore: moment.Moment) {
    return dateAfter.isSameOrAfter(dateBefore, 'd');
}
