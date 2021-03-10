import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { IZone, IZoneDetail, IZoneServiceType } from '@interfaces/zones/zones.interface';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZonesStore } from './operations-zones-store.model';
import { EZoneLabel } from './operations-zones-label.model';


class ZoneBase {
    idKey: string;
    id: number;
    name: string;
    assignedStore: ZonesStore;
    assignedStoreCode: string;
    state: EState;

    constructor(iZone: IZone) {
        this.idKey = iZone.id || null;
        this.id = iZone.idZone || null;
        this.assignedStoreCode = iZone.fulfillmentCenterCode || '';
        this.name = iZone.name || '';
        this.state = iZone.enabled ? EState.active : EState.inactive;
        this.assignedStore = iZone.storeCenter ? new ZonesStore(iZone.storeCenter) : null;
    }
}


export class Zone extends ZoneBase {
    serviceTypeList: Array<EDeliveryServiceType>;

    constructor(iZone: IZone) {
        super(iZone);
        this.serviceTypeList = iZone.serviceTypes ? iZone.serviceTypes
            .map((serviceType: IZoneServiceType) => serviceType.serviceTypeCode) : [];
    }
}

export class ZoneDetail extends ZoneBase {
    serviceTypeList: Array<ZoneServiceType>;
    label: EZoneLabel;
    channel: Array<EChannel>;
    company: ECompany;

    constructor(iZoneDetail: IZoneDetail) {
        super(iZoneDetail);
        this.label = iZoneDetail.zoneType as EZoneLabel;
        this.company = iZoneDetail.companyCode;
        this.channel = iZoneDetail.channel;
        this.serviceTypeList = iZoneDetail.serviceTypes ? iZoneDetail.serviceTypes
            .map(serviceType => new ZoneServiceType(serviceType)) : [];
    }
}


export class ZoneServiceType {
    id: string;
    code: EDeliveryServiceType;
    segmentGap: number;
    startHour: number;
    endHour: number;
    state: EState;
    intervalTime: number;

    constructor(iZoneServiceType: IZoneServiceType) {
        this.id = iZoneServiceType.id || null;
        this.code = iZoneServiceType.serviceTypeCode || null;
        this.segmentGap = iZoneServiceType.segmentGap || 0;
        this.intervalTime = iZoneServiceType.intervalTime || 0;
        this.startHour = DatesHelper.date(iZoneServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iZoneServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.state = iZoneServiceType.enabled ? EState.active : EState.inactive;
    }
}
