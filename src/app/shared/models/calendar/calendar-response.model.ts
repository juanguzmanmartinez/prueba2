import { EDeliveryServiceType } from '../service-type/delivery-service-type.model';

export interface ICalendarServiceDefaultCapacities {
    serviceTypeCode: EDeliveryServiceType;
    capacitiesQuantity: number;
    ordersQuantity: number;
    isHighDemand?: boolean;
}

export class CalendarServiceDefaultCapacities {
    serviceType: EDeliveryServiceType;
    capacityQuantity: number;
    isHighDemand: boolean;
}
