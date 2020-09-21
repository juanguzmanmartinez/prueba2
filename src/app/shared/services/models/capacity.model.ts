import { isObject } from 'util';
import { isArray } from '../../helpers/objects-equal';

export interface ICapacityRequestParams {
  fulfillmentCenterCode: string; // B88
  serviceTypeCode: string; // RAD o RET
  segmentType: string; // PROGRAMMED
  day: string; // '2020-04-27'
  channel: string; // DIGITAL, CALL
  hours: string;
  quantities: string;
}


export interface ICalendarUpdateRequestParams {
  fulfillmentCenterCode: string;
  serviceTypeCode: string;
  days: string;
  channel: string;
  hours: string;
  quantities: string;
}

export interface ICapacity {
  serviceTypeCode: string;
  capacitiesQuantity: number;
  ordersQuantity: number;
  segments: Array<ISegment>;
}

export interface ISegment {
  id: number;
  group: null;
  capacity: number;
  orders: number;
  hour: string;
  scheduleSegment: string;
  enabled: boolean;
  dayType?: 'empty' | 'only_number' | 'active';
}


export class Capacity {
  public serviceTypeCode: string;
  public capacitiesQuantity: number;
  public ordersQuantity: number;
  public segments: Array<ISegment>;

  constructor(schedules: ICapacity) {
    const currentValue = isObject(schedules) ? schedules : {} as ICapacity;
    this.serviceTypeCode = currentValue.serviceTypeCode || '';
    this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
    this.ordersQuantity = currentValue.ordersQuantity || 0;
    this.segments = currentValue.segments || [];
  }

}

export class ResponseDetailCapacity {
  public serviceTypeCode: string;
  public capacitiesQuantity: number;
  public ordersQuantity: number;
  public segments: Array<ISegment>;

  constructor(schedules: ICapacity) {
    const currentValue = isObject(schedules) ? schedules : {} as ICapacity;
    this.serviceTypeCode = currentValue.serviceTypeCode || '';
    this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
    this.ordersQuantity = currentValue.ordersQuantity || 0;
    this.segments = currentValue.segments || [];
  }
}
