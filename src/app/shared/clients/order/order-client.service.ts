import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { Observable } from 'rxjs';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take } from 'rxjs/operators';
import {
  OrderRecords,
  OrderRecordsResponse,
  OrderResponse,
  OrderStatus,
  OrderStatusResponse
} from '../../../business/order/views/order-records/interfaces/order-records.interface';
import { OrderModel } from '../../../business/order/views/order-records/models/order-records.model';
import { isArray } from '@helpers/objects-equal.helper';
import { CStatusOrderName } from '@models/status-order/status-order.model';
import { OrderDetailModel } from '../../../business/order/views/order-detail/models/order-detail.model';
import { OrderDetailResponse } from '../../../business/order/views/order-detail/interfaces/order-detail.interface';

@Injectable()
export class OrderClientService {

  private readonly ORDER_LIST = EndpointsParameter.ORDER_LIST;
  private readonly ORDER_DETAIL = EndpointsParameter.ORDER_DETAIL;
  private readonly ORDER_STATUS = EndpointsParameter.ORDER_STATUS;

  constructor(
    private generic: GenericService
  ) { }

  getOrderList(body): Observable<OrderRecords> {
    const endpoint = `${this.ORDER_LIST}`;
    return this.generic.genericPost<OrderRecordsResponse>(endpoint, body)
      .pipe(
        take(1),
        map((response: OrderRecordsResponse) => {
          const orders = response.orders.map((value: OrderResponse) => {
            return new OrderModel(value);
          });
          return {
            orders,
            page: response.page,
            currentRecords: response.currentRecords,
            totalRecords: response.totalRecords
          };
        })
      );
  }

  getStatusList(): Observable<OrderStatus[]> {
    return this.generic.genericGet<OrderStatusResponse[]>(this.ORDER_STATUS)
      .pipe(
        take(1),
        map((response: OrderStatusResponse[]) => {
          if (isArray(response)) {
            return response.map(value => {
              return {
                id: value.code,
                code: value.name,
                name: CStatusOrderName[value.name]
              };
            });
          }
          return [];
        })
      );
  }

  getOrderDetail(id: number): Observable<OrderDetailModel> {
    const endpoint = `${this.ORDER_DETAIL}/${id}`;
    return this.generic.genericGet<OrderDetailResponse>(endpoint)
      .pipe(
        take(1),
        map((response: OrderDetailResponse) => {
          return new OrderDetailModel(response);
        })
      );
  }
}
