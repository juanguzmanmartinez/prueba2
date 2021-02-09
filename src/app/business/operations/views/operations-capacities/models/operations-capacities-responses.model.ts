import { ILocal, Local } from '@models/local/local.model';
import { isObject } from '@helpers/objects-equal.helper';
import { CalendarServiceDefaultCapacities, ICalendarServiceDefaultCapacities } from '@models/calendar/calendar-response.model';
import { IServiceType, IServiceTypeSegment, ServiceType, ServiceTypeSegment } from '@models/local/service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

export class CapacitiesLocal extends Local {
  constructor(iLocal: ILocal) {
    super();
    const local = isObject(iLocal) ? iLocal : {} as ILocal;
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
