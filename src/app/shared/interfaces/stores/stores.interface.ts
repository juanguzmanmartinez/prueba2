import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';

export interface IStore {
    localCode: string;
    name: string;
    description: string;
    position: number;
    address: string;
    enabled: boolean;
    wmsEnabled: boolean;
    companies: Array<ILocalCompany>;
    legacyId: number;
    latitude: number;
    longitude: number;
    inkaVentaId: string;
    startHour: string;
    endHour: string;
    drugstoreWareHouseId: number;
    localType: string;
    services: Array<ILocalService>;
}

export interface ILocalService {
    code: string;
    service: string;
    shortName: string;
    enabled: boolean;
}

export interface ILocalCompany {
    company: string;
    code: string;
}

export interface ILocalGroup {
    description: string;
    localCode: string;
    position: number;
    wmsEnabled: boolean;
}

export interface ILocalParams {
    detailType: string;
    fulfillmentCenter: string;
    serviceType: EDeliveryServiceType;
}

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
    startDay: number;
    endDay: number;
    segmentList: Array<ServiceTypeSegment>;
}
