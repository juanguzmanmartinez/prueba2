import { isObject } from '../../helpers/objects-equal';

export interface IServiceType {
  capacitiesQuantity: number;
  endDay: string;
  ordersQuantity: number;
  segments: Array<IServiceTypeSegment>;
  selectDaysQuantity?: number;
  serviceTypeCode: string;
  startDay: string;
}

export interface IServiceTypeSegment {
  capacity: number;
  orders: number;
  enabled: boolean;
  hour?: string;
  value?: string;
}

export class ServiceType {
  serviceTypeCode: string;
  capacitiesQuantity: number;
  ordersQuantity: number;
  selectDaysQuantity: number;
  startDay: string;
  endDay: string;
  segments: Array<IServiceTypeSegment>;

  constructor(store: IServiceType) {
    const currentValue = isObject(store) ? store : {} as IServiceType;
    this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
    this.endDay = currentValue.endDay || '';
    this.ordersQuantity = currentValue.ordersQuantity || 0;
    this.segments = currentValue.segments || [];
    this.selectDaysQuantity = currentValue.selectDaysQuantity || 0;
    this.serviceTypeCode = currentValue.serviceTypeCode || '';
    this.startDay = currentValue.startDay || '';
  }

}
