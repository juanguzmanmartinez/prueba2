import {
  ICoordinate,
  IPointRouteResponse,
} from '@interfaces/control-tower/control-tower.interface';
import { OrderRoute } from './order-route.model';

export class PointRoute {
  type: string;
  coordinates: ICoordinate;
  code: string;
  data?: OrderRoute;

  constructor(point: IPointRouteResponse, order?: OrderRoute) {
    this.type = point.typePoint;
    this.coordinates = { lat: point.lat, lng: point.lng };
    this.code = point.code;
    this.data = order
  }
}
