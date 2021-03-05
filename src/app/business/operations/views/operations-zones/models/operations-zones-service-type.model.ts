import { ZoneServiceType } from './operations-zones.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';

export class ZoneServiceTypeRegistered {
    serviceType: ZoneServiceType;
    registered: boolean;

    constructor(
        serviceType: ZoneServiceType,
        serviceTypeCode: EDeliveryServiceType
    ) {
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

    constructor(zoneServiceTypeList: Array<ZoneServiceType>) {
        const amPm: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const express: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const scheduled: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const ret: ZoneServiceType = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);

        this.amPm = new ZoneServiceTypeRegistered(amPm, EDeliveryServiceType.amPm);
        this.express = new ZoneServiceTypeRegistered(express, EDeliveryServiceType.express);
        this.scheduled = new ZoneServiceTypeRegistered(scheduled, EDeliveryServiceType.scheduled);
        this.ret = new ZoneServiceTypeRegistered(ret, EDeliveryServiceType.ret);
    }

}
