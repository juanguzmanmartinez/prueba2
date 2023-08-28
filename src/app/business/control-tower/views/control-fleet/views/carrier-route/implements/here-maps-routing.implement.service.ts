import { Injectable } from '@angular/core';
import { CenterOrderControl } from '@atoms/here-maps/centerOrder.control';
import { FullScreenControl } from '@atoms/here-maps/fullscreen.control';
import { MotorizedControl } from '@atoms/here-maps/motorized.control';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import H from '@here/maps-api-for-javascript';
import { PointRoute } from '../models/point-route.model';
import { pointDomIcon, pointIcon, storeIcon } from '../util/here-maps.util';

@Injectable()
export class HereMapsRoutingService {
  private router: any;

  constructor(private hmService: HereMapsService) {
    this.router = this.hmService.getPlatform().getRoutingService(null, 8);
  }

  initializeMap(element: HTMLElement): H.Map {
    const map = this.createMap(element);
    this.hmService.resizeMap();
    this.addControls(element);
    return map;
  }

  createMap(element: HTMLElement): H.Map {
    return this.hmService.createMap(element, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: -12.046374, lng: -77.042793 },
      zoom: 13,
    });
  }

  addControls(element: HTMLElement) {
    const ui = H.ui.UI.createDefault(
      this.hmService.getMap(),
      this.hmService.defaultLayers()
    );
    const fullScreenControl = new FullScreenControl(element);
    const centerMotorizedControl = new MotorizedControl({
      lat: -12.074690847992702,
      lng: -77.09414209389209,
    });
    const centerOrderControl = new CenterOrderControl(
      this.hmService.centerMarkers
    );
    ui.addControl('full-screen', fullScreenControl);
    ui.addControl('center-motorized', centerMotorizedControl);
    ui.addControl('center-order', centerOrderControl);
  }

  pointMarker(point: PointRoute) {
    const map = this.hmService.getMap();
    const icon = point.type === 'ORDER' ? pointIcon(point) : storeIcon();
    const marker = new H.map.Marker(
      point.coordinates as H.geo.Point,
      { icon } as H.map.Marker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });
    marker.setData({ marker: true });
    map.addObject(marker);
  }

  orderDomMarker(point: PointRoute) {
    const map = this.hmService.getMap();
    const icon = pointDomIcon(point);
    const marker = new H.map.DomMarker(
      point.coordinates as H.geo.Point,
      { icon } as H.map.DomMarker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });

    map.addObject(marker);
  }

  addPointMarkers(points: PointRoute[]) {
    points.forEach((point: PointRoute) => {
      this.pointMarker(point);
    });
  }

  calculateRoutes(origin: string, destination: string, vias: string[]) {
    const routingParameters = this.routingParameters(origin, destination, vias);
    this.router.calculateRoute(
      routingParameters,
      this.onResult.bind(this),
      function (error: any) {
        alert(error.message);
      }
    );
  }

  routingParameters(origin: string, destination: string, vias: string[]) {
    return {
      routingMode: 'fast',
      transportMode: 'scooter',
      origin: origin,
      destination: destination,
      via: new H.service.Url.MultiValueQueryParameter(vias),
      return: 'polyline',
    };
  }

  onResult(result: any) {
    if (result.routes.length) {
      const map = this.hmService.getMap();
      result.routes[0].sections.forEach((section) => {
        let linestring = H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        );
        let routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: '#888BFF', lineWidth: 5 },
        } as H.map.Spatial.Options);

        map.addObjects([routeLine]);
      });
    }
  }
}
