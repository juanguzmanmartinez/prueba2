import {
  ICoordinate,
  IDetailRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';
import { OrderRoute } from './order-route.model';

export class CarrierRoute {
  routeId: string;
  motorized: string;
  telephone: string;
  local: string;
  completedOrderCount: number;
  totalOrderCount: number;
  motorizedState: string;
  motorizedCoordinates: ICoordinate;
  orders: OrderRoute[];

  constructor(res: IDetailRouteResponse) {
    this.routeId = res.routeId;
    this.motorized = res.motorized;
    this.telephone = res.telephone;
    this.local = res.local;
    this.completedOrderCount = res.completedOrderCount;
    this.totalOrderCount = res.totalOrderCount;
    this.motorizedState = res.motorizedState;
    this.motorizedCoordinates = { lat: res.lat, lng: res.lng };
    this.orders = res.orders.map((order) => new OrderRoute(order));
  }
}
