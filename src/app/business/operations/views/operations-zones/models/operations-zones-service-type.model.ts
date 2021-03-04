import { ZoneServiceType } from './operations-zones.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';


export class ZonesServiceTypeList {
    amPm: ZoneServiceType;
    express: ZoneServiceType;
    scheduled: ZoneServiceType;
    ret: ZoneServiceType;

    constructor(zoneServiceTypeList: Array<ZoneServiceType>) {
        const amPm = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const express = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const scheduled = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const ret = zoneServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);

        this.amPm = amPm || this.defaultServiceType(EDeliveryServiceType.amPm);
        this.express = express || this.defaultServiceType(EDeliveryServiceType.express);
        this.scheduled = scheduled || this.defaultServiceType(EDeliveryServiceType.scheduled);
        this.ret = ret || this.defaultServiceType(EDeliveryServiceType.ret);
    }

    defaultServiceType(serviceType: EDeliveryServiceType) {
        return new ZoneServiceType({
            serviceTypeCode: serviceType,
            startHour: '08:00:00',
            endHour: '19:00:00',
            serviceTypeId: '',
            enabled: false,
            segmentGap: 30
        });
    }

}
