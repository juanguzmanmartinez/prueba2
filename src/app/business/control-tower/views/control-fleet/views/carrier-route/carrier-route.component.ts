import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HereMapsService } from '@clients/here-maps/here-maps.service';

@Component({
  selector: 'app-carrier-route',
  templateUrl: './carrier-route.component.html',
})
export class CarrierRouteComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  private map!: H.Map;
  private behavior: any;

  constructor(private hereMapsService: HereMapsService) {}

  ngAfterViewInit() {
    this.map = this.hereMapsService.createMap(this.mapElement.nativeElement, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: -12.046374, lng: -77.042793 },
      zoom: 13,
    });

    this.hereMapsService.resizeMap(this.behavior, this.map);
  }
}
