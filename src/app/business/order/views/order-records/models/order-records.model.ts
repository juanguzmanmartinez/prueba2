import { OrderResponse } from '../interfaces/order-records.interface';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETextColor } from '@models/text/text.model';
import { CStatusOrderColor, CStatusOrderName } from '@models/status-order/status-order.model';

export class OrderModel {
  orderId: number;
  ecommerceId: number;
  local: string;
  channel: string;
  service: string;
  promiseDate: string;
  client: string;
  documentId: string;
  state: string;
  stateColor: ETextColor;

  constructor(data: OrderResponse) {
    this.orderId = data.orderId;
    this.ecommerceId = data.ecommerceId;
    this.local = data.localId;
    this.channel = CChannelName[data.serviceChannel];
    this.service = CDeliveryServiceTypeName[data.serviceTypeId];
    this.promiseDate = data.promiseDate;
    this.client = data.client;
    this.documentId = data.documentoId;
    this.state = CStatusOrderName[data.orderStatus]; // TODO: Reemplazar constante de estados alternativos
    this.stateColor = CStatusOrderColor[data.orderStatus];
  }
}
