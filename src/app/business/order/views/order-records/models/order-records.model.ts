import { OrderRecordsResponse } from '../interfaces/order-records.interface';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETextColor } from '@models/text/text.model';
import { CStateOrderColor, CStateOrderName } from '@models/state-order/state-order.model';

export class OrderModel {
  orderId: number;
  ecommerceId: number;
  local: string;
  channel: string;
  service: string;
  promiseDate: Date;
  client: string;
  documentId: string;
  state: string;
  stateColor: ETextColor;

  constructor(data: OrderRecordsResponse) {
    this.orderId = data.orderId;
    this.ecommerceId = data.ecommerceId;
    this.local = data.localId;
    this.channel = CChannelName[data.serviceChannel];
    this.service = CDeliveryServiceTypeName[data.serviceTypeId];
    this.promiseDate = new Date(data.fechaPromesa);
    this.client = data.razonSocial;
    this.documentId = data.documentoId;
    this.state = CStateOrderName[data.orderStatus];
    this.stateColor = CStateOrderColor[data.orderStatus];
  }

}
