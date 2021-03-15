import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { IZone, IZoneBackUp, IZoneDetail, IZoneServiceType } from '@interfaces/zones/zones.interface';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { CStateSettingValue, EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZonesStore } from './operations-zones-store.model';
import { EZoneLabel } from './operations-zones-label.model';


class ZoneBase {
    id: string;
    code: string;
    name: string;
    assignedStore: ZonesStore;
    assignedStoreCode: string;
    state: EState;

    constructor(iZone: IZone) {
        this.id = iZone.id || null;
        this.code = `${iZone.idZone}` || null;
        this.assignedStoreCode = iZone.fulfillmentCenterCode || '';
        this.name = iZone.name || '';
        this.state = iZone.enabled ? EState.active : EState.inactive;
        this.assignedStore = iZone.storeCenter ? new ZonesStore(iZone.storeCenter) : null;
    }
}


export class Zone extends ZoneBase {
    serviceTypeList: EDeliveryServiceType[];

    constructor(iZone: IZone) {
        super(iZone);
        this.serviceTypeList = iZone.serviceTypes ? iZone.serviceTypes
            .map((serviceType: IZoneServiceType) => serviceType.serviceTypeCode) : [];
    }
}

export class ZoneDetail extends ZoneBase {
    serviceTypeList: ZoneServiceType[];
    label: EZoneLabel;
    channelList: EChannel[];
    company: ECompany;
    zoneBackup: ZoneBackup;

    constructor(iZoneDetail: IZoneDetail) {
        super(iZoneDetail);
        this.label = iZoneDetail.zoneType as EZoneLabel;
        this.company = iZoneDetail.companyCode || null;
        this.channelList = iZoneDetail.channel || [];
        this.serviceTypeList = iZoneDetail.serviceTypes ? iZoneDetail.serviceTypes
            .map(serviceType => new ZoneServiceType(serviceType)) : [];
        if (iZoneDetail.zoneBackup) {
            this.zoneBackup = new ZoneBackup(iZoneDetail.zoneBackup);
        }
    }
}

export class ZoneBackup {
    id: string;
    name: string;
    favorite: boolean;
    assignedStoreCode: string;
    assignedStoreName: string;

    constructor(iZoneBackup: IZoneBackUp) {
        this.id = iZoneBackup.zoneId;
        this.name = iZoneBackup.name;
        this.favorite = CStateSettingValue[iZoneBackup.preferableLocalBackupToShow];
        this.assignedStoreCode = iZoneBackup.fulfillmentCenterCode;
        this.assignedStoreName = iZoneBackup.fulfillmentCenterName;
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
