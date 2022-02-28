import {
  CStatusOrderName,
  EStatusOrder,
} from '@models/status-order/status-order.model';
import { OrderTimeline } from '../interfaces/order-detail.interface';

export class TimelineModel {
  flow: 'done' | 'pending' | 'cancel';
  status: string;
  info: string;
  infoDetail: string;
  date: string;
  name: string;

  constructor(data: OrderTimeline) {
    this.flow =
      data?.code && data.selected
        ? this.getFlow(data.code, data.selected)
        : 'pending';
    this.status = data?.code ? this.getStatus(data.code) : '-';
    this.info = '';
    this.infoDetail = '';
    this.date = data?.time ? this.formatDate(data.time) : '-';
    // this.name = data.updatedBy ? data.updatedBy : '-';
    this.name = '';
  }

  private getFlow = (
    code: string,
    selected: boolean
  ): 'done' | 'pending' | 'cancel' => {
    if (
      (code === EStatusOrder.cancelled || code === EStatusOrder.rejected) &&
      selected
    ) {
      return 'cancel';
    }

    if (
      code !== EStatusOrder.cancelled &&
      code !== EStatusOrder.rejected &&
      selected
    ) {
      return 'done';
    }

    if (!selected) {
      return 'pending';
    }
  }

  private getStatus = (code: string): string => {
    return CStatusOrderName[code];
  }

  private formatDate = (time: string): string => {
    if (time === 'Automatic') {
      return 'Automatico';
    }

    const day = time.slice(0, 2);
    const month = time.slice(3, 5);
    const hour = time.slice(9, 14);
    const daySlot = this.formatDaySlot(time.slice(15).toLowerCase());
    return `${day}/${month} a las ${hour} ${daySlot}`;
  }

  private formatDaySlot = (daySlot: string): string => {
    return `${daySlot.charAt(0)}.${daySlot.charAt(1)}.`;
  }
}
