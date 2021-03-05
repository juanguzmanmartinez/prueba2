import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { IStore } from '@interfaces/stores/stores.interface';

export interface IZoneServiceType {
    id: string;
    serviceTypeId: string;
    serviceTypeCode: EDeliveryServiceType;
    segmentGap: number;
    startHour: string;
    endHour: string;
    enabled: boolean;
    intervalTime: number;
}

export interface IZoneServiceTypeUpdate {
    enabled: boolean;
    startHour: string;
    endHour: string;
    segmentGap: number;
}
export interface IZoneServiceTypRegister {
    zoneId: string;
    serviceTypeCode: string;
    startHour: string;
    endHour: string;
    segmentGap: string;
}

export interface IZone {
    id: string;
    idZone: number;
    name: string;
    enabled: boolean;
    fulfillmentCenterCode: string;
    serviceTypes: Array<IZoneServiceType>;
    storeCenter: IStore;
}

export interface IZoneDetail extends IZone {
    zoneType: string;
    channel: Array<EChannel>;
    companyCode: ECompany;
}

export interface IZoneDetailUpdate {
    fulfillmentCenterCode: string;
    enabled: boolean;
    zoneType: string;
    channel: Array<EChannel>;
    companyCode: ECompany;
}
