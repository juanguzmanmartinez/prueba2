import { EDeliveryServiceType, EDeliveryType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

export interface IDrugstore {
    legacyId: number;
    localCode: string;
    name: string;
    description: string;
    localType: EDeliveryType;
    wmsEnabled: boolean;
    enabled: boolean;
    position: number;
    services: IDrugstoreServiceType[];
    companies: IDrugstoreCompany[];
    channel: EChannel[];
    address: string;
    latitude: number;
    longitude: number;
    startHour: string;
    endHour: string;
}

export interface IDrugstoreDetail extends IDrugstore {
    group: string;
    paymentMethodList: EPaymentMethod[];
    zoneList: IDrugstoreZone[];
}

export interface IDrugstoreDetailUpdate {
    enabled: boolean;
    companyList: ECompany[];
    latitude: string;
    longitude: string;
    startHour: string;
    endHour: string;
}

export interface IDrugstoreServiceType {
    id: string;
    code: EDeliveryServiceType;
    service: string;
    shortName: string;
    startHour: string;
    endHour: string;
    enabled: boolean;
    intervalTime: number;
}

export interface IDrugstoreServiceTypeUpdate {
    enabled: boolean;
    startHour: string;
    endHour: string;
    paymentMethod: EPaymentMethod[];
}

export interface IDrugstoreServiceTypeRegister {
    localCode: string;
    serviceTypeCode: string;
    startHour: string;
    endHour: string;
}

export interface IDrugstoreCompany {
    company: string;
    code: ECompany;
}

export interface IDrugstoreZone {
    idZone: string;
    name: string;
    backupZone: string;
    backupAssignedStore: string;
}

export interface IDrugstoreGroup {
    description: string;
    localCode: string;
    position: number;
    wmsEnabled: boolean;
}

export interface IDrugstoreParams {
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
