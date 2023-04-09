import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import {
  ColumnNameList,
  DBOrder,
  OrderStatusColor,
} from './constants/order.constant';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from './interfaces/order.interface';

@Component({
  selector: 'app-carrier-route',
  templateUrl: './carrier-route.component.html',
  styleUrls: ['./carrier-route.component.scss'],
})
export class CarrierRouteComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  private map!: H.Map;
  private behavior: any;
  public dataSource = new MatTableDataSource<IOrder>();

  public displayedColumns: string[] = [
    ColumnNameList.orderNumber,
    ColumnNameList.orderId,
    ColumnNameList.local,
    ColumnNameList.channel,
    ColumnNameList.service,
    ColumnNameList.promiseDate,
    ColumnNameList.address,
    ColumnNameList.status,
    ColumnNameList.timeLeft,
    ColumnNameList.actions,
  ];

  constructor(private hereMapsService: HereMapsService) {}

  ngOnInit(): void {
    this.dataSource.data = DBOrder;
  }

  ngAfterViewInit() {
    this.map = this.hereMapsService.createMap(this.mapElement.nativeElement, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: -12.046374, lng: -77.042793 },
      zoom: 13,
    });

    this.hereMapsService.resizeMap(this.behavior, this.map);
  }

  getColorStatus(status: string) {
    return OrderStatusColor[status];
  }
}
