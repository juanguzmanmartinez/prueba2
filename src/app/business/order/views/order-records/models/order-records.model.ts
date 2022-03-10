import { OrderResponse } from '../interfaces/order-records.interface';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETextColor } from '@models/text/text.model';
import { CStatusOrderColor, CStatusOrderName } from '@models/status-order/status-order.model';
import { reformatCamelCase } from '../../../../../shared/utils/reformat-camelcase.util';

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
    this.orderId = data.orderId ? data.orderId : 0;
    this.ecommerceId = data.ecommerceId ? data.ecommerceId : 0;
    this.local = data.localId ? data.localId : '-' ;
    this.channel = data.serviceChannel ? CChannelName[data.serviceChannel] : '-';
    this.service = data.serviceTypeId ? CDeliveryServiceTypeName[data.serviceTypeId] : '-';
    this.promiseDate = data.promiseDate ? this.formatPromiseDate(data.promiseDate) : '-';
    this.client = data.client ? reformatCamelCase(data.client) : '-';
    this.documentId = data.documentoId ? data.documentoId : '-';
    this.state = data.orderStatus ? CStatusOrderName[data.orderStatus] : '-';
    this.stateColor = data.orderStatus ? CStatusOrderColor[data.orderStatus] : '-';
  }

  private formatPromiseDate = (promiseDate: string): string => {
    const day = promiseDate.slice(0, 2);
    const month = promiseDate.slice(3, 5);
    const year = promiseDate.slice(6, 8);
    const firstHour = promiseDate.slice(9, 11);
    const firstMinutes = promiseDate.slice(12, 14);
    const firstSlotTime = this.transformAmOrPm(promiseDate.slice(15, 17));

    if (promiseDate.length === 17) {
      return `${day}/${month}/${year} <br> ${firstHour}:${firstMinutes} ${firstSlotTime}`;
    } else {
      const SecondHour = promiseDate.slice(29, 31);
      const SecondMinutes = promiseDate.slice(32, 34);
      const SecondSlotTime = this.transformAmOrPm(promiseDate.slice(35, 37));
      return `${day}/${month}/${year} <br> ${firstHour}:${firstMinutes} ${firstSlotTime} - ${SecondHour}:${SecondMinutes} ${SecondSlotTime}`;
    }
  }

  private transformAmOrPm = (values: string): string => {
    if (values === 'AM') {
      return 'a.m.';
    }

    if (values === 'PM') {
      return 'p.m.';
    }
  }
}
