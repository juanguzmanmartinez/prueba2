import {
  ICoordinate,
  IOrderRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';
import {
  formatDay,
  formatHour,
} from 'app/business/control-tower/util/format-dates.function';
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
    const dateFormat = formatDay(splitted[0]);
    const startHourFormat = formatHour(splitted[1]);
    const endHourFormat = formatHour(splitted[3]);
    return `${dateFormat} ${startHourFormat} - ${endHourFormat}`;
  }
}
