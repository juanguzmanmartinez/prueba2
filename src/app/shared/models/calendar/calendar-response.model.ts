import { ECapacitiesServiceType } from '../capacities/capacities-service-type.model';

export interface ICalendarServiceDefaultCapacities {
    serviceTypeCode: ECapacitiesServiceType;
    capacitiesQuantity: number;
    ordersQuantity: number;
}

export class CalendarServiceDefaultCapacities {
    serviceType: ECapacitiesServiceType;
    capacityQuantity: number;
}
