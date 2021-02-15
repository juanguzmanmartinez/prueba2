import { EDeliveryServiceType } from '../capacities/capacities-service-type.model';

export interface ICalendarServiceDefaultCapacities {
    serviceTypeCode: EDeliveryServiceType;
    capacitiesQuantity: number;
    ordersQuantity: number;
}

export class CalendarServiceDefaultCapacities {
    serviceType: EDeliveryServiceType;
    capacityQuantity: number;
}
