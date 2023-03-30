import { Platform } from '@angular/cdk/platform';
import H from '@here/maps-api-for-javascript';
import { Injectable } from '@angular/core';

@Injectable()
export class HereMapsService {
  private platform: any;

  constructor() {
    this.platform = new H.service.Platform({
      apikey: '8qSbVSC-sfL_vwOwToaDSbuh_iTSn_6S7dF5rRQ4MiY',
    });
  }

  createMap(element: HTMLElement, options: H.Map.Options): H.Map {
    const defaultLayers = this.platform.createDefaultLayers();
    return new H.Map(element, defaultLayers.vector.normal.map, options);
  }

  resizeMap(behavior: any, map: H.Map) {
    window.addEventListener('resize', () => map.getViewPort().resize());
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }
}
