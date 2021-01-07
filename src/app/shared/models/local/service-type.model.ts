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

export class ServiceTypeSegment {
    segmentCapacity: number;
    segmentHour: string;
    segmentValue: string;
    segmentEnabled?: boolean;
    segmentOrders?: number;
}

export class ServiceType {
    serviceTypeCode: string;
    capacitiesQuantity: number;
    ordersQuantity: number;
    selectDaysQuantity: number;
    startDay: string;
    endDay: string;
    segmentList: Array<ServiceTypeSegment>;
}
