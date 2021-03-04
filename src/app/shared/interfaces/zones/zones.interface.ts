import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { IStore } from '@interfaces/stores/stores.interface';

export interface IZoneServiceType {
    serviceTypeCode: EDeliveryServiceType;
    serviceTypeId: string;
    segmentGap: number;
    startHour: string;
    endHour: string;
    enabled: boolean;
}

export interface IZoneAssignedStore {
    localCode: string;
    name: string;
    wmsEnabled: boolean;
    enabled: boolean;
    position: number;
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
