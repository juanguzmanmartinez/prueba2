import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';

export interface IZone {
    id: string;
    idZone: number;
    name: string;
    enabled: boolean;
    fulfillmentCenterCode: string;
    serviceTypes: Array<IZoneServiceType>;
    storeCenter: IZoneAssignedStore;
}

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


