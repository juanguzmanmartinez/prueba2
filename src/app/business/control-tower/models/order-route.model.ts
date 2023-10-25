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
  constructor(res: IOrderRouteResponse) {
    this.orderNumber = res.orderNumber;
    this.orderId = res.orderId;
    this.local = res.local;
    this.channel = res.channel;
    this.service = res.service;
    this.promiseDate = res.promiseDate;
    this.address = res.address;
    this.state = res.state;
    this.timeLeft = res.timeLeft;
    this.coordinates = res.coordinates;
  }
}
