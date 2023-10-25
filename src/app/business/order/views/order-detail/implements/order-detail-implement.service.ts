import { Injectable } from '@angular/core';
import { OrderClientService } from '@clients/order/order-client.service';
import { Observable } from 'rxjs';
import { OrderDetailModel } from '../models/order-detail.model';

@Injectable()
export class OrderDetailImplementService {

  constructor(
    private orderClient: OrderClientService
  ) { }

  orderDetail(id: number): Observable<OrderDetailModel> {
    return this.orderClient.getOrderDetail(id);
  }

}
