import {
  ICoordinate,
  IOrderRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';
import moment from 'moment';

export class OrderRoute {
  orderNumber: string;
  orderId: string;
  local: string;
  channel: string;
  service: string;
  promiseDate: string;
  address: string;
  state: string;
  timeLeft: string;
  coordinates: ICoordinate;

  constructor(order: IOrderRouteResponse) {
    this.orderNumber = order.orderNumber.toString();
    this.orderId = order.orderId.toString();
    this.local = order.local;
    this.channel = order.channel;
    this.service = order.service;
    this.promiseDate = this.formatDate(order?.promiseDate) || '';
    this.address = order.address;
    this.state = order.state;
    this.timeLeft = order?.timeLeft || '-';
    this.coordinates = { lat: order.lat, lng: order.lng };
  }

  formatDate(orderDate: string) {
    const splitted = orderDate.split(' ');
    const dateFormat = this.formatDay(splitted[0]);
    const startHourFormat = this.formatHour(splitted[1]);
    const endHourFormat = this.formatHour(splitted[3]);
    return `${dateFormat} ${startHourFormat} - ${endHourFormat}`;
  }

  formatDay(orderDay: string) {
    const dayArr = orderDay.split('-');
    const day = dayArr[2];
    const month = dayArr[1];
    const year = dayArr[0];
    return `${day}/${month}/${year}`;
  }

  formatHour(orderHour: string) {
    const timeMoment = moment(orderHour, 'HH:mm:ss');
    return timeMoment.format('h:mm a');
  }
}
