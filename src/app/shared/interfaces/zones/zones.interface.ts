import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { IStore } from '@interfaces/stores/stores.interface';
import { EStateSetting } from '@models/state/state.model';

export interface IZoneServiceType {
    id: string;
    serviceTypeId: string;
    serviceTypeCode: EDeliveryServiceType;
    segmentGap: number;
    startHour: string;
    endHour: string;
    enabled: boolean;
    intervalTime: number;
    channel: EChannel;
}

export interface IZoneServiceTypeUpdate {
    enabled: boolean;
    startHour: string;
    endHour: string;
    segmentGap: number;
    channel: EChannel;
}

export interface IZoneServiceTypeRegister {
    zoneId: string;
    serviceTypeCode: string;
    startHour: string;
    endHour: string;
    segmentGap: string;
    channel: EChannel;
}

export interface IZone {
    id: string;
    idZone: string;
    name: string;
    enabled: boolean;
    fulfillmentCenterCode: string;
    serviceTypes: IZoneServiceType[];
    storeCenter: IStore;
    channel: EChannel[];
    backUpZone: boolean;
}

export interface IZoneDetail extends IZone {
    zoneType: string;
    companyCode: ECompany[];
    zoneBackup: IZoneBackUp;
    backUpZone: boolean;
}

export interface IZoneDetailUpdate {
    fulfillmentCenterCode: string;
    enabled: boolean;
    backUpZone: boolean;
    zoneType: string;
    deliveryServiceId: number;
    channel: EChannel[];
    companyCode: ECompany[];
}

export interface IZoneBackUp {
    zoneId: string;
    idZone: number;
    name: string;
    preferableLocalBackupToShow: EStateSetting;
    forceServiceAMPM: EStateSetting;
    forceServicePROG: EStateSetting;
    fulfillmentCenterCode: string;
    fulfillmentCenterName: string;
}

export interface IZoneBackupUpdate {
    zoneId: string;
    preferableLocalBackupToShow: EStateSetting;
    forceServiceAMPM: EStateSetting;
    forceServicePROG: EStateSetting;
}
