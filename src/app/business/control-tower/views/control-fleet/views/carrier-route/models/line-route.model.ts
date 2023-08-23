import { ICoordinate } from '@interfaces/control-tower/control-tower.interface';
import { PointRoute } from './point-route.model';

export class LineRoute {
  origin: string;
  destination: string;
  vias: string[];

  constructor(points: PointRoute[]) {
    const originPoint = points[0].coordinates;
    const destinationPoint = points[points.length - 1].coordinates;
    
    this.origin = this.formatLineRoute(originPoint);
    this.destination = this.formatLineRoute(destinationPoint);
    this.vias = this.viasRoute(points);
  }

  formatLineRoute(coordinate: ICoordinate) {
    return `${coordinate.lat.toString()},${coordinate.lng.toString()}`;
  }

  viasRoute(points: PointRoute[]) {
    const vias = [];
    for (let i = 1; i < points.length - 1; i++) {
      const via = this.formatLineRoute(points[i].coordinates);
      vias.push(via);
    }
    return vias;
  }
}
