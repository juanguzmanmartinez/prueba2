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
import { HereMapsRoutingService } from './implements/here-maps-routing.implement.service';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';

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

  constructor(
    private hereMapsService: HereMapsService,
    private hmRoutingService: HereMapsRoutingService,
    private ctImplService: ControlTowerImplementService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = DBOrder;
    this.ctImplService.getDetailRoute('221').subscribe();
  }

  ngAfterViewInit() {
    const element = this.mapElement.nativeElement;
    this.map = this.hmRoutingService.initializeMap(element);
    this.hmRoutingService.addOrderMarkers(DBOrder);
    this.hereMapsService.centerMarkers(this.map);
    this.hmRoutingService.calculateRoutes(
      '-12.047274740451627,-77.1237202604052',
      '-12.074690847992702,-77.09414209389209',
      [
        '-12.074690847992702,-77.09414209389209',
        '-12.058090603870156,-77.04450221443963',
        '-12.070840509867775,-77.0163855247041',
        '-12.076122568833423,-76.9991491494781',
        '-12.066033152202444,-76.9940510666648',
        '-12.090009732717025,-76.97723953114895',
        '-12.105439068808161,-76.97681469091451',
        '-12.110483081831664,-76.98209484794612',
        '-12.118909337710376,-76.99223032211069',
        '-12.118137930980883,-76.98816399415244',
      ]
    );
  }
}
