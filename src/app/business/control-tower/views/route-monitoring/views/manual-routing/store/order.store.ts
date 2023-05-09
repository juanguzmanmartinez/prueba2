import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../../../interfaces/order.interface';
import { OrderManualDB } from '../../../constants/orders.constant';

@Injectable()
export class OrderStore {
  orderList = new BehaviorSubject<IOrder[]>(OrderManualDB);

  getOrderListValue() {
    return this.orderList.getValue();
  }

  getOrderList(): Observable<IOrder[]> {
    return this.orderList.asObservable();
  }

  setOrderList(orderList: IOrder[]) {
    this.orderList.next(orderList);
  }
}
