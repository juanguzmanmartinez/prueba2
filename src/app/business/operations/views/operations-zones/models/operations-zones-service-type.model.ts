import { ZoneServiceType } from './operations-zones.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesStoreServiceType } from './operations-zones-store.model';

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

export class ZonesServiceTypeList {
    amPm: ZoneServiceTypeRegistered;
    express: ZoneServiceTypeRegistered;
    scheduled: ZoneServiceTypeRegistered;
    ret: ZoneServiceTypeRegistered;

    constructor(zoneServiceTypeList: Array<ZoneServiceType>, zoneStoreServiceTypeList: Array<ZonesStoreServiceType>) {
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
