import { Platform } from '@angular/cdk/platform';
import H from '@here/maps-api-for-javascript';
import { Injectable } from '@angular/core';
import {
  OrderNameFile,
  OrderStatusColor,
} from 'app/business/control-tower/views/control-fleet/views/carrier-route/constants/order.constant';
import { IOrder } from 'app/business/control-tower/views/control-fleet/views/carrier-route/interfaces/order.interface';
import { FullScreenControl } from '@atoms/here-maps/fullscreen.control';
import { MotorizedControl } from '@atoms/here-maps/motorized.control';
import { CenterOrderControl } from '@atoms/here-maps/centerOrder.control';

@Injectable()
export class HereMapsService {
  private platform: any;
  private markers: H.map.Marker[] = [];

  constructor() {
    this.platform = new H.service.Platform({
      apikey: '8qSbVSC-sfL_vwOwToaDSbuh_iTSn_6S7dF5rRQ4MiY',
    });
  }

  createMap(element: HTMLElement, options: H.Map.Options): H.Map {
    const defaultLayers = this.defaultLayers();
    const map = new H.Map(element, defaultLayers.vector.normal.map, options);
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    const fullScreenControl = new FullScreenControl(element);
    const centerMotorizedControl = new MotorizedControl({
      lat: -12.074690847992702,
      lng: -77.09414209389209,
    });
    const centerOrderControl = new CenterOrderControl(this.centerOrdersMap);
    ui.addControl('full-screen', fullScreenControl);
    ui.addControl('center-motorized', centerMotorizedControl);
    ui.addControl('center-order', centerOrderControl);

    return map;
  }

  defaultLayers() {
    return this.platform.createDefaultLayers();
  }

  addMarker(map: H.Map, coordinates: H.geo.Point): H.map.Marker {
    const marker = new H.map.Marker(coordinates);
    map.addObject(marker);
    return marker;
  }

  svgOrderIcon(text: string, fill: string): string {
    return (
      '<svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<style>.small {font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 12px; font-weight: 600; line-height: 18px; font-style: normal;} .cursor-pointer {cursor: pointer;}</style>' +
      `<path class="cursor-pointer" fill-rule="evenodd" clip-rule="evenodd" d="M0 14.0424C0 6.30098 6.28014 0 13.9995 0C21.7199 0 28 6.30098 28 14.0424C28 23.8902 16.3351 33.4868 13.9995 34C11.664 33.4888 0 23.8922 0 14.0424Z" fill="${fill}"/>` +
      `<text x="50%" y="19" text-anchor="middle" font-weight="bold" class="small" line-height="1.5" fill="#fff">${text}</text>` +
      '</svg>'
    );
  }

  divOrderIcon(text: string, nameFile: string): string {
    return (
      '<div style="position:relative; cursor:pointer;">' +
      `<img src="/assets/icons/${nameFile}.svg" style="width:100%; height:auto;"/>` +
      `<span class="text-body-3-bold text-neutral-0" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">${text}</span>` +
      '</div>'
    );
  }

  orderIcon(order: IOrder) {
    const text = order.orderNumber;
    const fill = OrderStatusColor[order.status];
    return new H.map.Icon(this.svgOrderIcon(text, fill));
  }

  orderDomIcon(order: IOrder) {
    const text = order.orderNumber;
    const nameFile = OrderNameFile[order.status];
    return new H.map.DomIcon(this.divOrderIcon(text, nameFile));
  }

  orderMarker(map: H.Map, order: IOrder) {
    const icon = this.orderIcon(order);
    const marker = new H.map.Marker(
      order.coordinates as H.geo.Point,
      { icon } as H.map.Marker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });

    this.markers = [...this.markers, marker];
    map.addObject(marker);
  }

  orderDomMarker(map: H.Map, order: IOrder) {
    const icon = this.orderDomIcon(order);
    const marker = new H.map.DomMarker(
      order.coordinates as H.geo.Point,
      { icon } as H.map.DomMarker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });

    map.addObject(marker);
  }

  resizeMap(behavior: any, map: H.Map) {
    window.addEventListener('resize', () => map.getViewPort().resize());
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }

  uiControl(map: H.Map, defaultLayers: any) {
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  getAllMarkers() {
    return this.markers;
  }

  centerOrdersMap(map: H.Map) {
    const objects = map.getObjects();
    const markers = objects.filter(
      (obj) => obj instanceof H.map.Marker
    ) as H.map.Marker[];

    const boundingBox = new H.geo.Rect(
      Math.max(
        ...markers.map((marker) => (marker.getGeometry() as H.geo.Point).lat)
      ),
      Math.min(
        ...markers.map((marker) => (marker.getGeometry() as H.geo.Point).lng)
      ),
      Math.min(
        ...markers.map((marker) => (marker.getGeometry() as H.geo.Point).lat)
      ),
      Math.max(
        ...markers.map((marker) => (marker.getGeometry() as H.geo.Point).lng)
      )
    );
    map.getViewModel().setLookAtData({
      bounds: boundingBox,
    });
    map.setZoom(13);
  }
}
