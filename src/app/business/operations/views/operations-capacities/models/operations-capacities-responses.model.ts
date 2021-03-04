import { isObject } from '@helpers/objects-equal.helper';
import { CalendarServiceDefaultCapacities, ICalendarServiceDefaultCapacities } from '@models/calendar/calendar-response.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ILocalCompany, ILocalService, IServiceType, IServiceTypeSegment, IStore, ServiceType, ServiceTypeSegment } from '@interfaces/stores/stores.interface';

export class CapacitiesStore {
    localCode: string;
    name: string;
    description: string;
    position: number;
    address: string;
    wmsEnabled: boolean;
    companies: Array<ILocalCompany>;
    legacyId: number;
    latitude: number;
    longitude: number;
    inkaVentaId: string;
    startHour: string;
    endHour: string;
    drugstoreWareHouseId: number;
    localType: string;
    services: Array<ILocalService>;

    constructor(iLocal: IStore) {
        const local = isObject(iLocal) ? iLocal : {} as IStore;
        this.localCode = local.localCode;
        this.name = local.name;
    }
}


export class CapacitiesLocalServiceDefaultCapacity extends CalendarServiceDefaultCapacities {
    constructor(iCalendarServiceDefaultCapacities: ICalendarServiceDefaultCapacities) {
        super();
        const serviceDefaultCapacities = isObject(iCalendarServiceDefaultCapacities) ?
            iCalendarServiceDefaultCapacities : {} as ICalendarServiceDefaultCapacities;
        this.serviceType = serviceDefaultCapacities.serviceTypeCode;
        this.capacityQuantity = serviceDefaultCapacities.capacitiesQuantity;
    }
}

export class CapacityServiceTypeSegment extends ServiceTypeSegment {
    constructor(iServiceTypeSegment: IServiceTypeSegment) {
        super();
        this.segmentCapacity = iServiceTypeSegment.capacity || 0;
        this.segmentHour = iServiceTypeSegment.hour || '';
        this.segmentValue = iServiceTypeSegment.value || '';
    }
}


export class CapacitiesServiceType extends ServiceType {

    constructor(store: IServiceType) {
        super();
        const currentValue = isObject(store) ? store : {} as IServiceType;
        this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
        this.segmentList = currentValue.segments ? currentValue.segments
            .map((iServiceTypeSegment) => new CapacityServiceTypeSegment(iServiceTypeSegment)) : [];
        this.serviceTypeCode = currentValue.serviceTypeCode || '';
        this.startDay = store.startDay ? DatesHelper.Date(store.startDay, DATES_FORMAT.yearMonthDay).valueOf() : null;
        this.endDay = store.endDay ? DatesHelper.Date(store.endDay, DATES_FORMAT.yearMonthDay).valueOf() : null;
    }

}
