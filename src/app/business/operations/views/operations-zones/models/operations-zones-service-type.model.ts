import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesStoreServiceType } from './operations-zones-store.model';
import { CStateValue, EState } from '@models/state/state.model';
import { IZoneServiceType } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZoneBackup } from './operations-zones.model';
import { EChannel } from '@models/channel/channel.model';
import { CZoneServiceTypeSegmentGap } from '../parameters/operations-zones-service-type.parameter';

export class ZoneServiceType {
    id: string;
    code: EDeliveryServiceType;
    segmentGap: number;
    startHour: number;
    endHour: number;
    state: EState;
    intervalTime: number;
    channel: EChannel;

    constructor(iZoneServiceType: IZoneServiceType) {
        this.id = iZoneServiceType.id || null;
        this.code = iZoneServiceType.serviceTypeCode || null;
        this.segmentGap = iZoneServiceType.segmentGap || 0;
        this.intervalTime = iZoneServiceType.intervalTime || 0;
        this.startHour = DatesHelper.date(iZoneServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iZoneServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.state = iZoneServiceType.enabled ? EState.active : EState.inactive;
        this.channel = iZoneServiceType.channel || EChannel.default;
    }
}

export class ZoneServiceTypeRegistered {
    serviceType: ZoneServiceType;
    code: EDeliveryServiceType;
    channel: EChannel;
    registered: boolean;
    available: boolean;

    constructor(
        serviceType: ZoneServiceType,
        storeServiceType: ZonesStoreServiceType,
        serviceTypeCode: EDeliveryServiceType,
        serviceTypeChannel: EChannel
    ) {
        this.available = !!storeServiceType && CStateValue[storeServiceType.state];
        this.registered = !!serviceType;
        this.code = serviceTypeCode;
        this.channel = serviceTypeChannel;
        this.serviceType = serviceType || null;

        // Exception RET Digital
        if (serviceTypeCode === EDeliveryServiceType.ret && serviceTypeChannel === EChannel.digital) {
            this.available = false;
            this.serviceType = null;

            if (!!storeServiceType) {
                this.serviceType = new ZoneServiceType({} as IZoneServiceType);
                this.serviceType.state = EState.inactive;
                this.serviceType.startHour = storeServiceType.startHour;
                this.serviceType.endHour = storeServiceType.endHour;
                this.serviceType.segmentGap = CZoneServiceTypeSegmentGap[serviceTypeCode];
            }
        }

    }
}

export class ZoneServiceTypeList {
    amPm: ZoneServiceTypeRegistered;
    express: ZoneServiceTypeRegistered;
    scheduled: ZoneServiceTypeRegistered;
    ret: ZoneServiceTypeRegistered;

    constructor(
        zoneServiceTypeList: ZoneServiceType[],
        zoneStoreServiceTypeList: ZonesStoreServiceType[],
        zoneChannel: EChannel
    ) {
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

        this.amPm = new ZoneServiceTypeRegistered(zoneAmPm, zoneStoreAmPm, EDeliveryServiceType.amPm, zoneChannel);
        this.express = new ZoneServiceTypeRegistered(zoneExpress, zoneStoreExpress, EDeliveryServiceType.express, zoneChannel);
        this.scheduled = new ZoneServiceTypeRegistered(zoneScheduled, zoneStoreScheduled, EDeliveryServiceType.scheduled, zoneChannel);
        this.ret = new ZoneServiceTypeRegistered(zoneRet, zoneStoreRet, EDeliveryServiceType.ret, zoneChannel);
    }
}

export class ZoneChannelServiceTypeList {
    channel: EChannel;
    serviceTypeList: ZoneServiceTypeList;

    constructor(
        zoneServiceTypeList: ZoneServiceType[],
        zoneStoreServiceTypeList: ZonesStoreServiceType[],
        zoneChannel: EChannel) {

        const zoneChannelServiceTypeList: ZoneServiceType[] = zoneServiceTypeList
            .filter((serviceType: ZoneServiceType) => serviceType.channel === zoneChannel);

        this.channel = zoneChannel;
        this.serviceTypeList = new ZoneServiceTypeList(
            zoneChannelServiceTypeList,
            zoneStoreServiceTypeList,
            zoneChannel);
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
        const zoneDigitalServiceTypeList = zoneServiceTypeList
            .filter((zoneServiceType) => zoneServiceType.channel === EChannel.digital && CStateValue[zoneServiceType.state]);
        const zoneAmPm: ZoneServiceType = zoneDigitalServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const zoneScheduled: ZoneServiceType = zoneDigitalServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        this.amPm = new ZoneBackupServiceTypeRegistered(zoneAmPm, zoneBackup?.forceServiceAMPM, EDeliveryServiceType.amPm);
        this.scheduled = new ZoneBackupServiceTypeRegistered(zoneScheduled, zoneBackup?.forceServiceSCHEDULED, EDeliveryServiceType.scheduled);
    }

}
