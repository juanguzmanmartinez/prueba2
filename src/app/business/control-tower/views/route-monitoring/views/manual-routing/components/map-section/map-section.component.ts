import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HereMapsManualRoutingService } from '../../implements/here-maps-manual-routing.service';
import { OrderRouteStore } from '../../store/order.store';
import { IOrder } from '../../../../interfaces/order.interface';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import { AssignedRouteDialogService } from '../assigned-route-dialog/assigned-route-dialog.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  providers: [HereMapsManualRoutingService],
})
export class MapSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  private map!: H.Map;
  public orderList: IOrder[];

  constructor(
    private hmService: HereMapsService,
    private hmOrderService: HereMapsManualRoutingService,
    private orderStore: OrderRouteStore,
    private dialog: AssignedRouteDialogService
  ) {}

  ngOnInit(): void {
    this.orderStore.getOrderList().subscribe((orderList) => {
      this.orderList = orderList;
      this.hmOrderService.removeAllMarkers();
      if (orderList) {
        this.hmOrderService.addOrderMarkers(this.orderList);
      }
    });
  }

  ngAfterViewInit(): void {
    const element = this.mapElement.nativeElement;
    this.map = this.hmOrderService.initializeMap(element);
    this.hmOrderService.addOrderMarkers(this.orderList);
    this.hmService.centerMarkers(this.map);
  }

  openDialog(): void {
    this.dialog.open().afterClosed().subscribe();
  }
}
