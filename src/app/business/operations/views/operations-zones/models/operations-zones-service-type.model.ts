import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesStoreServiceType } from './operations-zones-store.model';
import { EState } from '@models/state/state.model';
import { IZoneServiceType } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZoneBackup } from './operations-zones.model';

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

export class ZoneServiceTypeRegistered {
    serviceType: ZoneServiceType;
    registered: boolean;
    available: boolean;

    constructor(
        serviceType: ZoneServiceType,
        storeServiceType: ZonesStoreServiceType,
        serviceTypeCode: EDeliveryServiceType
    ) {
        this.available = !!storeServiceType;
        this.registered = !!serviceType;
        this.serviceType = serviceType || new ZoneServiceType({
            serviceTypeCode,
            startHour: '08:00:00',
            endHour: '19:00:00',
            id: '',
            serviceTypeId: '',
            enabled: false,
            segmentGap: 30,
            intervalTime: 360,
        });
    }
}

export class ZoneServiceTypeList {
    amPm: ZoneServiceTypeRegistered;
    express: ZoneServiceTypeRegistered;
    scheduled: ZoneServiceTypeRegistered;
    ret: ZoneServiceTypeRegistered;

    constructor(zoneServiceTypeList: ZoneServiceType[], zoneStoreServiceTypeList: ZonesStoreServiceType[]) {
        const zoneAmPm: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const zoneExpress: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const zoneScheduled: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const zoneRet: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);

        const zoneStoreAmPm: ZonesStoreServiceType = zoneStoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const zoneStoreExpress: ZonesStoreServiceType = zoneStoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const zoneStoreScheduled: ZonesStoreServiceType = zoneStoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const zoneStoreRet: ZonesStoreServiceType = zoneStoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);

        this.amPm = new ZoneServiceTypeRegistered(zoneAmPm, zoneStoreAmPm, EDeliveryServiceType.amPm);
        this.express = new ZoneServiceTypeRegistered(zoneExpress, zoneStoreExpress, EDeliveryServiceType.express);
        this.scheduled = new ZoneServiceTypeRegistered(zoneScheduled, zoneStoreScheduled, EDeliveryServiceType.scheduled);
        this.ret = new ZoneServiceTypeRegistered(zoneRet, zoneStoreRet, EDeliveryServiceType.ret);
    }

}

export class ZoneBackupServiceType {
    id: string;
    code: EDeliveryServiceType;
    segmentGap: number;
    startHour: number;
    endHour: number;
    forceService: EState;

    constructor(zoneServiceType: ZoneServiceType, forceService: EState) {
        this.id = zoneServiceType.id || null;
        this.code = zoneServiceType.code || null;
        this.segmentGap = zoneServiceType.segmentGap || 0;
        this.startHour = zoneServiceType.startHour || null;
        this.endHour = zoneServiceType.endHour || null;
        this.forceService = forceService || EState.disabled;
    }
}

export class ZoneBackupServiceTypeRegistered {
    serviceType: ZoneBackupServiceType;
    code: EDeliveryServiceType;

    constructor(
        serviceType: ZoneServiceType,
        forceService: EState,
        serviceTypeCode: EDeliveryServiceType
    ) {
        this.serviceType = serviceType ? new ZoneBackupServiceType(serviceType, forceService) : null;
        this.code = serviceTypeCode || null;
    }

}

export class ZoneBackupServiceTypeList {
    amPm: ZoneBackupServiceTypeRegistered;
    scheduled: ZoneBackupServiceTypeRegistered;

    constructor(zoneServiceTypeList: ZoneServiceType[], zoneBackup?: ZoneBackup) {
        const zoneAmPm: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const zoneScheduled: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        this.amPm = new ZoneBackupServiceTypeRegistered(zoneAmPm, zoneBackup?.forceServiceAMPM, EDeliveryServiceType.amPm);
        this.scheduled = new ZoneBackupServiceTypeRegistered(zoneScheduled, zoneBackup?.forceServiceSCHEDULED, EDeliveryServiceType.scheduled);
    }

}
