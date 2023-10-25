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
  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;
  private map!: H.Map;
  private behavior: any;
  public dataSource = new MatTableDataSource<OrderRoute>();
  public detailRoute$: Observable<Partial<CarrierRoute>>;
  public orderRouteList$: Observable<OrderRoute[]>;
  public points: PointRoute[];
  public idCarrier: string;
  public hasRoute: boolean;
  public loading: boolean = true;
  public isPendingFinalized: boolean;
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
        this.isPendingFinalized = data.pendingFinalized;
        this.hasRoute = data.hasRoute;
        this.loading = false;
        if (!this.hasRoute || this.isPendingFinalized) {
          this.mapElement.nativeElement.style.height = '100px';
        } else if (
          this.hasRoute &&
          this.mapElement &&
          this.mapElement.nativeElement
        ) {
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

  ngAfterViewInit() {}

  navigateToOrder(id: string) {
    this.hmRoutingService.navigateToOrder(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
