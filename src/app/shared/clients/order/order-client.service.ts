import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { Observable } from 'rxjs';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take } from 'rxjs/operators';
import { OrderRecordsResponse } from '../../../business/order/views/order-records/interfaces/order-records.interface';
import { OrderModel } from '../../../business/order/views/order-records/models/order-records.model';

@Injectable()
export class OrderClientService {

  private readonly ORDER_LIST = EndpointsParameter.ORDER_LIST;

  constructor(
    private generic: GenericService
  ) { }

  getOrderList(params): Observable<OrderModel[]> {
    const endpoint = `${this.ORDER_LIST + params}`;
    return this.generic.genericGet<OrderModel[]>(endpoint)
      .pipe(
        take(1),
        map((response: []) => {
          return response.map((value: OrderRecordsResponse) => {
            return new OrderModel(value);
          });
        })
      );
  }
}
