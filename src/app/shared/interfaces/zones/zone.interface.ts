import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompanyCode } from '@models/company-code/company-code.model';

export interface IZoneServiceType {
    serviceTypeCode: EDeliveryServiceType;
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
    storeCenter: IZoneAssignedStore;
}

export interface IZoneDetail extends IZone {
    zoneType: string;
    channel: Array<EChannel>;
    companyCode: ECompanyCode;
}
