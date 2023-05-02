import { Injectable } from '@angular/core';
import { HereMapsService } from '@clients/here-maps/here-maps.service';

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

  addControls() {
    const ui = H.ui.UI.createDefault(
      this.hmService.getMap(),
      this.hmService.defaultLayers()
    );
  }
}
