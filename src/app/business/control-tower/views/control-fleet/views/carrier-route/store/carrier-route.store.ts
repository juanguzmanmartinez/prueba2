import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarrierRoute } from '../models/carrier-route.model';
import { OrderRoute } from '../models/order-route.model';

@Injectable()
export class CarrierRouteStore {
  private detailRoute = new BehaviorSubject<Partial<CarrierRoute>>(null);
  private orderRouteList = new BehaviorSubject<OrderRoute[]>(null);

  public detailRoute$ = this.detailRoute.asObservable();
  public orderRouteList$ = this.orderRouteList.asObservable();

  setdetailRoute(detailRoute: Partial<CarrierRoute>) {
    this.detailRoute.next(detailRoute);
  }
  setOrderRouteList(orderRouteList: OrderRoute[]) {
    this.orderRouteList.next(orderRouteList);
  }

  detailRouteValue() {
    return this.detailRoute.value;
  }

  orderRouteListValue() {
    return this.orderRouteList.value;
  }
}
