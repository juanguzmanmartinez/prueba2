import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
import { CarrierRouteService } from './service/carrier-route.service';
import { Observable, Subscription } from 'rxjs';
import { CarrierRoute } from './models/carrier-route.model';
import { OrderRoute } from './models/order-route.model';
import { PointRoute } from './models/point-route.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ORDER_ROUTER_PATH } from '@parameters/router/routing/order/order-router-path.parameter';

@Component({
  selector: 'app-carrier-route',
  templateUrl: './carrier-route.component.html',
  styleUrls: ['./carrier-route.component.scss'],
})
export class CarrierRouteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapElement') mapElement: ElementRef;
  private map!: H.Map;
  private behavior: any;
  public dataSource = new MatTableDataSource<OrderRoute>();
  public detailRoute$: Observable<Partial<CarrierRoute>>;
  public orderRouteList$: Observable<OrderRoute[]>;
  public points: PointRoute[];
  public idCarrier: string;
  public hasRoute: boolean;
  private subscription: Subscription;

  public displayedColumns: string[] = [
    ColumnNameList.orderNumber,
    ColumnNameList.orderId,
    ColumnNameList.local,
    ColumnNameList.channel,
    ColumnNameList.service,
    ColumnNameList.promiseDate,
    ColumnNameList.address,
    ColumnNameList.state,
    ColumnNameList.timeLeft,
    ColumnNameList.actions,
  ];

  constructor(
    private hereMapsService: HereMapsService,
    private hmRoutingService: HereMapsRoutingService,
    private crService: CarrierRouteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.dataSource.data = DBOrder;
    // 550DVP4QQV8362S2HC8C1XQI5RN9UV
    this.idCarrier = this.route.snapshot.params['idCarrier'];
    this.detailRoute$ = this.crService.getDetailRoute();
    this.orderRouteList$ = this.crService.getOrderRouteList();
    this.subscription = this.crService
      .loadDetailRoute(this.idCarrier)
      .subscribe((data: CarrierRoute) => {
        this.hasRoute = data.hasRoute;
        if (this.hasRoute) {
          const element = this.mapElement.nativeElement;
          this.map = this.hmRoutingService.initializeMap(
            element,
            data.motorizedCoordinates
          );
          this.points = data.points;
          this.hmRoutingService.addPointMarkers(this.points);
          this.hmRoutingService.pointMotorized(data.motorizedCoordinates);
          this.hereMapsService.centerMarkers(this.map);
          this.hmRoutingService.calculateRoutes(
            data.routes.origin,
            data.routes.destination,
            data.routes.vias
          );
        }
      });
  }

  ngAfterViewInit() {
    // const element = this.mapElement.nativeElement;
    // this.map = this.hmRoutingService.initializeMap(element);
    // this.hmRoutingService.addOrderMarkers(DBOrder); // data dummy
    // this.hmRoutingService.calculateRoutes(
    //   '-12.047274740451627,-77.1237202604052',
    //   '-12.074690847992702,-77.09414209389209',
    //   [
    //     '-12.074690847992702,-77.09414209389209',
    //     '-12.058090603870156,-77.04450221443963',
    //     '-12.070840509867775,-77.0163855247041',
    //     '-12.076122568833423,-76.9991491494781',
    //     '-12.066033152202444,-76.9940510666648',
    //     '-12.090009732717025,-76.97723953114895',
    //     '-12.105439068808161,-76.97681469091451',
    //     '-12.110483081831664,-76.98209484794612',
    //     '-12.118909337710376,-76.99223032211069',
    //     '-12.118137930980883,-76.98816399415244',
    //   ]
    // );
  }

  navigateToOrder(id: string) {
    this.router.navigate([ORDER_ROUTER_PATH.orderDetail(id)]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
