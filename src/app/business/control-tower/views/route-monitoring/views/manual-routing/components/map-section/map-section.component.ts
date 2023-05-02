import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HereMapsManualRoutingService } from '../../implements/here-maps-manual-routing.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  providers: [HereMapsManualRoutingService],
})
export class MapSectionComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  private map!: H.Map;

  constructor(private hmRoutingService: HereMapsManualRoutingService) {}

  ngAfterViewInit(): void {
    const element = this.mapElement.nativeElement;
    this.map = this.hmRoutingService.initializeMap(element);
  }
}
