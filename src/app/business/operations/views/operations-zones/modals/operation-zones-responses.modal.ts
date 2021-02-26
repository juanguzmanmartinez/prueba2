import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';
import { IZone, IZoneAssignedStore, IZoneDetail } from '@interfaces/zones/zone.interface';
import { EChannel } from '@models/channel/channel.model';
import { ECompanyCode } from '@models/company-code/company-code.model';
import { EState } from '@models/state/state.model';


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
    state: EState;

    constructor(iZone: IZone) {
        this.id = iZone.idZone || null;
        this.code = iZone.fulfillmentCenterCode || '';
        this.name = iZone.name || '';
        this.state = iZone.enabled ? EState.active : EState.inactive;
        this.assignedStore = iZone.storeCenter ? new ZoneAssignedStore(iZone.storeCenter) : null;
        this.serviceTypeList = iZone.serviceTypes ? iZone.serviceTypes
            .map((serviceType) => serviceType.serviceTypeCode) : [];
    }
}

export class ZoneDetail extends Zone {
    label: string;
    channel: Array<EChannel>;
    company: ECompanyCode;

    constructor(iZoneDetail: IZoneDetail) {
        super(iZoneDetail);
        this.label = iZoneDetail.zoneType;
        this.company = iZoneDetail.companyCode;
        this.channel = iZoneDetail.channel;
    }
}
