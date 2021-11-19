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
import { CStateOrderName } from '@models/state-order/state-order.model';

@Injectable()
export class OrderClientService {

  private readonly ORDER_LIST = EndpointsParameter.ORDER_LIST;
  private readonly ORDER_STATUS = EndpointsParameter.ORDER_STATUS;

  constructor(
    private generic: GenericService
  ) { }

  getOrderList(body): Observable<OrderRecords> {
    const endpoint = `${this.ORDER_LIST}`;
    return this.generic.genericGet<OrderRecordsResponse>(endpoint, null, null, body)
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
                code: value.code,
                type: value.type,
                description: value.description,
                name: CStateOrderName[value.type]
              };
            });
          }
          return [];
        })
      );
  }
}
