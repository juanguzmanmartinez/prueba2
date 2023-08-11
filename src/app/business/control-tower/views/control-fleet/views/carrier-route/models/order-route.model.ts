import {
  ICoordinate,
  IOrderRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';

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
    this.orderNumber = (order.orderNumber + 1).toString();
    this.orderId = order.orderId.toString();
    this.local = order.local;
    this.channel = order.channel;
    this.service = order.service;
    this.promiseDate = order.promiseDate;
    this.address = order.address;
    this.state = order.state;
    this.timeLeft = order.timeLeft;
    this.coordinates = { lat: order.lat, lng: order.lng };
  }
}
