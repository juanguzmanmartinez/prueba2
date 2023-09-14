import { Injectable } from '@angular/core';
import { CenterOrderControl } from '@atoms/here-maps/centerOrder.control';
import { FullScreenControl } from '@atoms/here-maps/fullscreen.control';
import { MotorizedControl } from '@atoms/here-maps/motorized.control';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import H from '@here/maps-api-for-javascript';
import { PointRoute } from '../models/point-route.model';
import {
  motorizedIcon,
  pointDomIcon,
  pointIcon,
  storeIcon,
} from '../util/here-maps.util';
import { ICoordinate } from '@interfaces/control-tower/control-tower.interface';
import { OrderRoute } from '../models/order-route.model';

@Injectable()
export class HereMapsRoutingService {
  private router: any;
  private ui: any;

  constructor(private hmService: HereMapsService) {
    this.router = this.hmService.getPlatform().getRoutingService(null, 8);
  }

  initializeMap(
    element: HTMLElement,
    motorizedCoordinates: ICoordinate
  ): H.Map {
    const map = this.createMap(element);
    this.hmService.resizeMap();
    this.addControls(element, motorizedCoordinates);
    return map;
  }

  createMap(element: HTMLElement): H.Map {
    return this.hmService.createMap(element, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: -12.046374, lng: -77.042793 },
      zoom: 13,
    });
  }

  addControls(element: HTMLElement, motorizedCoordinates: ICoordinate) {
    const ui = H.ui.UI.createDefault(
      this.hmService.getMap(),
      this.hmService.defaultLayers()
    );
    const fullScreenControl = new FullScreenControl(element);
    const centerMotorizedControl = new MotorizedControl(motorizedCoordinates);
    const centerOrderControl = new CenterOrderControl(
      this.hmService.centerMarkers
    );
    this.bubbleOpenListener(ui);
    ui.addControl('full-screen', fullScreenControl);
    ui.addControl('center-motorized', centerMotorizedControl);
    ui.addControl('center-order', centerOrderControl);
  }

  pointMarker(point: PointRoute) {
    const map = this.hmService.getMap();
    const ui = H.ui.UI.createDefault(
      this.hmService.getMap(),
      this.hmService.defaultLayers()
    );
    const icon = point.type === 'ORDER' ? pointIcon(point) : storeIcon();
    const marker = new H.map.Marker(
      point.coordinates as H.geo.Point,
      { icon } as H.map.Marker.Options
    );
    marker.setData({ marker: true, html: this.bubbleInfo(point.data) });
    if (point.type === 'ORDER') {
      marker.addEventListener('tap', function (evt) {
        this.showBubbleInfo(evt, ui);
        // // Add a callback to change the close button color
        // setTimeout(() => {
        //   const closeButton = document.querySelector('.H_ib_close');
        //   if (closeButton) {
        //     closeButton.querySelector('svg').style.fill = 'white'; // Change SVG fill color
        //   }
        // }, 0);
      });
    }
    map.addObject(marker);
  }

  bubbleOpenListener(ui: any) {
    ui.addEventListener('bubbleopen', () => {
      setTimeout(() => {
        const closeButton = document.querySelector('.H_ib_close');
        if (closeButton) {
          closeButton.querySelector('svg').style.fill = 'white';
        }
      }, 0);
    });
  }

  showBubbleInfo(evt: any, ui: any) {
    const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: evt.target.getData().html,
    });
    ui.addBubble(bubble);
  }

  bubbleInfo(order: OrderRoute) {
    return (
      `<div style="color:white;">Pedido: ${order?.orderId}</div>` +
      `<div style="color:white;">Estado: ${order?.state}</div>` +
      `<div style="color:white;">Ver Pedido</div>`
    );
  }

  pointMotorized(coordinates: ICoordinate) {
    const map = this.hmService.getMap();
    const icon = motorizedIcon();
    const marker = new H.map.Marker(
      coordinates as H.geo.Point,
      { icon } as H.map.Marker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });
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
