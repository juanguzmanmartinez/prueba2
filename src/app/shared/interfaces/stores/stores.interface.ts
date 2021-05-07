import { EDeliveryServiceType, EDeliveryType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

export interface IStore {
    legacyId: number;
    localCode: string;
    name: string;
    description: string;
    localType: EDeliveryType;
    wmsEnabled: boolean;
    enabled: boolean;
    position: number;
    services: IStoreServiceType[];
    companies: IStoreCompany[];
    channel: EChannel[];
    address: string;
    latitude: number;
    longitude: number;
    startHour: string;
    endHour: string;
}

export interface IStoreDetail extends IStore {
    group: string;
    paymentMethodList: EPaymentMethod[];
    zoneList: IStoreZone[];
}

export interface IStoreDetailUpdate {
    enabled: boolean;
    companyList: ECompany[];
    latitude: string;
    longitude: string;
    startHour: string;
    endHour: string;
}

export interface IStoreServiceType {
    id: string;
    code: EDeliveryServiceType;
    service: string;
    shortName: string;
    startHour: string;
    endHour: string;
    enabled: boolean;
    intervalTime: number;
}

export interface IStoreServiceTypeUpdate {
    enabled: boolean;
    startHour: string;
    endHour: string;
    paymentMethod: EPaymentMethod[];
}

export interface IStoreServiceTypeRegister {
    localCode: string;
    serviceTypeCode: string;
    startHour: string;
    endHour: string;
}

export interface IStoreCompany {
    company: string;
    code: ECompany;
}

export interface IStoreZone {
    idZone: string;
    name: string;
    backupZone: string;
    backupAssignedStore: string;
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
    segments: IServiceTypeSegment[];
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
    segmentList: ServiceTypeSegment[];
}
