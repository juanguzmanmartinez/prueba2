import {
  ICoordinate,
  IDetailRouteResponse,
  IPointRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';
import { OrderRoute } from './order-route.model';
import { PointRoute } from './point-route.model';
import { LineRoute } from './line-route.model';

export class CarrierRoute {
  routeId: string;
  motorized: string;
  telephone: string;
  local: string;
  completedOrderCount: number;
  totalOrderCount: number;
  routeState: string;
  motorizedCoordinates: ICoordinate;
  orders: OrderRoute[];
  points: PointRoute[];
  routes: LineRoute;
  hasRoute: boolean;
  pendingFinalized: boolean;

  constructor(res: IDetailRouteResponse) {
    this.routeId = res.routeId;
    this.motorized = res.motorized;
    this.telephone = res.telephone;
    this.local = res.local;
    this.completedOrderCount = res.completedOrderCount;
    this.totalOrderCount = res.totalOrderCount;
    this.routeState = res.routeState;
    this.motorizedCoordinates = { lat: res.lat, lng: res.lng };
    this.orders = res.orders?.map((order) => new OrderRoute(order));
    this.points = res.points && this.pointListRoute(res.points);
    this.routes = this.points && new LineRoute(this.points);
    this.hasRoute = this.hasData(res);
    this.pendingFinalized = res.pendingFinalized;
  }

  pointListRoute(points: IPointRouteResponse[]) {
    return points?.map((point) => {
      const orderFounded = this.orders.find(
        (order) => order.orderId === point.code
      );
      return new PointRoute(point, orderFounded);
    });
  }

  hasData(res: IDetailRouteResponse): boolean {
    const hasData = Object.values(res).some((val) => val !== null);
    return !!hasData;
  }
}
