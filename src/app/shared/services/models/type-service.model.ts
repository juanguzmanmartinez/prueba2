import { isObject } from '../../helpers/objects-equal';

export interface ITypeService {
  capacitiesQuantity: number;
  endDay: string;
  ordersQuantity: number;
  segments: Array<ISegement>;
  selectDaysQuantity: number;
  serviceTypeCode: string;
  startDay: string;
}

export interface ISegement {
  capacity: number;
  orders: number;
  enabled: boolean;
  hour?: string;
}

export class TypeService {
  serviceTypeCode: string;
  capacitiesQuantity: number;
  ordersQuantity: number;
  selectDaysQuantity: number;
  startDay: string;
  endDay: string;
  segments: Array<ISegement>;

  constructor(store: ITypeService) {
    const currentValue = isObject(store) ? store : {} as ITypeService;
    this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
    this.endDay = currentValue.endDay || '';
    this.ordersQuantity = currentValue.ordersQuantity || 0;
    this.segments = currentValue.segments || [];
    this.selectDaysQuantity = currentValue.selectDaysQuantity || 0;
    this.serviceTypeCode = currentValue.serviceTypeCode || '';
    this.startDay = currentValue.startDay || '';
  }

}
