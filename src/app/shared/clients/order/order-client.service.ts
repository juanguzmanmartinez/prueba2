import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { Observable, of } from 'rxjs';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take, catchError } from 'rxjs/operators';
import {
  OrderRecords,
  OrderRecordsResponse,
  OrderResponse,
  OrderStatus,
  OrderStatusResponse,
} from '../../../business/order/views/order-records/interfaces/order-records.interface';
import { OrderModel } from '../../../business/order/views/order-records/models/order-records.model';
import { isArray } from '@helpers/objects-equal.helper';
import { CStatusOrderName } from '@models/status-order/status-order.model';
import { OrderDetailModel } from '../../../business/order/views/order-detail/models/order-detail.model';
import { OrderDetailResponse } from '../../../business/order/views/order-detail/interfaces/order-detail.interface';
import { OrderReasonCancelResponse } from 'app/business/order/views/order-cancel-dialog/interfaces/order-reason-cancel-response';
import { OrderReasonCancelModel } from 'app/business/order/views/order-cancel-dialog/models/OrderReasonCancelModel';
import { OrderCancelRequest } from './../../../business/order/views/order-cancel-dialog/interfaces/order-cancel-request';
import { HttpParams } from '@angular/common/http';
import { CancelOrderResponse } from 'app/business/order/views/order-cancel-dialog/interfaces/order-cancel-response';

@Injectable()
export class OrderClientService {
  private readonly ORDER_LIST = EndpointsParameter.ORDER_LIST;
  private readonly ORDER_DETAIL = EndpointsParameter.ORDER_DETAIL;
  private readonly ORDER_STATUS = EndpointsParameter.ORDER_STATUS;
  private readonly ORDER_REPORT = EndpointsParameter.ORDER_REPORT;
  private readonly ORDER_REASON_CANCELATION = EndpointsParameter.ORDER_REASON_CANCELATION;
  private readonly ORDER_CANCELATION = EndpointsParameter.ORDER_CANCELATION;

  constructor(private generic: GenericService) {}

  getOrderList(body): Observable<OrderRecords> {
    const endpoint = `${this.ORDER_LIST}`;
    return this.generic.genericPost<OrderRecordsResponse>(endpoint, body).pipe(
      take(1),
      map((response: OrderRecordsResponse) => {
        const orders = response.orders.map((value: OrderResponse) => {
          return new OrderModel(value);
        });
        return {
          orders,
          page: response.page,
          currentRecords: response.currentRecords,
          totalRecords: response.totalRecords,
        };
      })
    );
  }

  getOrderReport(body): Observable<OrderRecords> {
    const endpoint = `${this.ORDER_REPORT}`;
    return this.generic.genericPost<OrderRecordsResponse>(endpoint, body).pipe(
      take(1),
      map((response: OrderRecordsResponse) => {
        const orders = response.orders.map((value: OrderResponse) => {
          return new OrderModel(value);
        });
        return {
          orders,
        };
      })
    );
  }

  getStatusList(): Observable<OrderStatus[]> {
    return this.generic
      .genericGet<OrderStatusResponse[]>(this.ORDER_STATUS)
      .pipe(
        take(1),
        map((response: OrderStatusResponse[]) => {
          if (isArray(response)) {
            return response.map((value) => {
              return {
                id: value.code,
                code: value.name,
                name: CStatusOrderName[value.name],
              };
            });
          }
          return [];
        })
      );
  }

  getOrderDetail(id: number): Observable<OrderDetailModel> {
    const endpoint = `${this.ORDER_DETAIL}/${id}`;
    return this.generic.genericGet<OrderDetailResponse>(endpoint).pipe(
      take(1),
      map((response: OrderDetailResponse) => {
        return new OrderDetailModel(response);
      })
    );
  }
  getOptionListReason():Observable<Array<OrderReasonCancelModel>>{
    const endpoint = `${this.ORDER_REASON_CANCELATION}`;
    const params = new HttpParams()
      .set('appType','DIGITAL,CALL')
      .set('type','CANCELLED');
    return this.generic.genericGet<Array<OrderReasonCancelResponse>>(endpoint,params).pipe(
      take(1),
      map((response: Array<OrderReasonCancelResponse>) => {
        const list = response.map((r:OrderReasonCancelResponse)=> new OrderReasonCancelModel(r))
        return (list);
      })
    );
  }
  cancelOrder(body:OrderCancelRequest,orderId): Observable<CancelOrderResponse> {
    const endpoint = `${this.ORDER_CANCELATION}/${orderId}`;
    return this.generic.genericPatch<CancelOrderResponse>(endpoint, body);
  }

}
