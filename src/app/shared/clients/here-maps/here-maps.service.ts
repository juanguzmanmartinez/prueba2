import H from '@here/maps-api-for-javascript';
import { Injectable } from '@angular/core';

@Injectable()
export class HereMapsService {
  private platform: any;
  private map: H.Map;
  private behavior: any;

  constructor() {
    this.platform = new H.service.Platform({
      apikey: '8qSbVSC-sfL_vwOwToaDSbuh_iTSn_6S7dF5rRQ4MiY',
    });
  }

  createMap(element: HTMLElement, options: H.Map.Options): H.Map {
    const defaultLayers = this.defaultLayers();
    this.map = new H.Map(element, defaultLayers.vector.normal.map, options);
    return this.map;
  }

  getMap() {
    return this.map;
  }

  defaultLayers() {
    return this.platform.createDefaultLayers();
  }

  getPlatform() {
    return this.platform;
  }

  resizeMap() {
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    this.behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
  }

  centerMarkers(map: H.Map) {
    const objects = map.getObjects();
    const markers = objects.filter(
      (obj) => obj instanceof H.map.Marker || H.map.DomMarker
    ) as H.map.Marker[] | H.map.DomMarker[];

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
