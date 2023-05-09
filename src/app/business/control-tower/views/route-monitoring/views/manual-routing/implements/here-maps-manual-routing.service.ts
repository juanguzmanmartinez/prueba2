import { Injectable } from '@angular/core';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import { IOrder } from '../../../interfaces/order.interface';

@Injectable()
export class HereMapsManualRoutingService {
  constructor(private hmService: HereMapsService) {}

  initializeMap(element: HTMLElement): H.Map {
    const map = this.createMap(element);
    this.hmService.resizeMap();
    this.addControls();
    return map;
  }

  createMap(element: HTMLElement): H.Map {
    return this.hmService.createMap(element, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: -12.046374, lng: -77.042793 },
      zoom: 13,
    });
  }

  addControls(): void {
    const ui = H.ui.UI.createDefault(
      this.hmService.getMap(),
      this.hmService.defaultLayers()
    );
  }

  divOrderIcon(text: string): string {
    return (
      '<div style="position:relative; cursor:pointer;">' +
      `<img src="/assets/icons/location-neutral.svg" style="width:100%; height:auto;"/>` +
      `<span class="text-body-3-bold text-neutral-0" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">${text}</span>` +
      '</div>'
    );
  }

  orderIcon(index: number): H.map.DomIcon {
    const text = index.toString();
    return new H.map.DomIcon(this.divOrderIcon(text));
  }

  orderMarker(order: IOrder, index: number) {
    const map = this.hmService.getMap();
    const icon = this.orderIcon(index + 1);
    const marker = new H.map.DomMarker(
      order.coordinates as H.geo.Point,
      { icon } as H.map.DomMarker.Options
    );
    marker.addEventListener('tap', function (evt) {
      console.log('Marker clicked!');
    });

    map.addObject(marker);
  }

  addOrderMarkers(orders: IOrder[]) {
    const map = this.hmService.getMap();
    if (map) {
      orders.forEach((order: IOrder, index: number) => {
        this.orderMarker(order, index);
      });
    }
  }

  removeAllMarkers() {
    const map = this.hmService.getMap();
    if (map && map.getObjects()) {
      map.removeObjects(map.getObjects());
    }
  }
}
