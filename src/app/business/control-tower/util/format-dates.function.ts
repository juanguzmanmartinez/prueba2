import moment from "moment";

export function formatDay(orderDay: string) {
  const dayArr = orderDay.split('-');
  const day = dayArr[2];
  const month = dayArr[1];
  const year = dayArr[0];
  return `${day}/${month}/${year}`;
}

export function formatHour(orderHour: string) {
  const timeMoment = moment(orderHour, 'HH:mm:ss');
  return timeMoment.format('h:mm a');
}