import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';
import { IZone, IZoneAssignedStore } from '@interfaces/zones/zone.interface';

export const CZoneStateName = {
    true: 'activo',
    false: 'inactivo'
};

class ZoneAssignedStore {
    code: string;
    name: string;
    state: boolean;

    constructor(iZoneAssignedStore: IZoneAssignedStore) {
        this.code = iZoneAssignedStore.localCode;
        this.name = iZoneAssignedStore.name;
        this.state = iZoneAssignedStore.enabled;
    }

}

export class Zone {
    id: number;
    code: string;
    name: string;
    serviceTypeList: Array<EDeliveryServiceType>;
    assignedStore: ZoneAssignedStore;
    state: boolean;

    constructor(iZone: IZone) {
        this.id = iZone.idZone || null;
        this.code = iZone.fulfillmentCenterCode || '';
        this.name = iZone.name || '';
        this.state = iZone.enabled || false;
        this.assignedStore = iZone.storeCenter ? new ZoneAssignedStore(iZone.storeCenter) : null;
        this.serviceTypeList = iZone.serviceTypes ? iZone.serviceTypes
            .map((serviceType) => serviceType.serviceTypeCode) : [];
    }
}
