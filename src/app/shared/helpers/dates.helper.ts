import * as moment from 'moment';

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
