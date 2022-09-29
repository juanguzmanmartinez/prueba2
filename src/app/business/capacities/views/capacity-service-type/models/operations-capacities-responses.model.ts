import { isObject } from '@helpers/objects-equal.helper';
import {
  CalendarServiceDefaultCapacities,
  ICalendarServiceDefaultCapacities,
} from '@models/calendar/calendar-response.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import {
  IDrugstore,
  IDrugstoreCompany,
  IDrugstoreServiceType,
  IServiceType,
  IServiceTypeSegment,
  ServiceType,
  ServiceTypeSegment,
} from '@interfaces/drugstores/drugstores.interface';

export class CapacitiesDrugstore {
  drugstoreCode: string;
  name: string;
  description: string;
  position: number;
  address: string;
  wmsEnabled: boolean;
  companies: IDrugstoreCompany[];
  legacyId: number;
  latitude: number;
  longitude: number;
  inkaVentaId: string;
  startHour: string;
  endHour: string;
  drugstoreWareHouseId: number;
  drugstoreType: string;
  services: IDrugstoreServiceType[];

  constructor(iDrugstore: IDrugstore) {
    const validIDrugstore = isObject(iDrugstore)
      ? iDrugstore
      : ({} as IDrugstore);
    this.drugstoreCode = validIDrugstore.localCode;
    this.name = validIDrugstore.name;
  }
}

export class CapacitiesDrugstoreServiceDefaultCapacity extends CalendarServiceDefaultCapacities {
  constructor(
    iCalendarServiceDefaultCapacities: ICalendarServiceDefaultCapacities
  ) {
    super();
    const serviceDefaultCapacities = isObject(iCalendarServiceDefaultCapacities)
      ? iCalendarServiceDefaultCapacities
      : ({} as ICalendarServiceDefaultCapacities);
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
  constructor(iServiceType: IServiceType) {
    super();
    const currentValue = isObject(iServiceType)
      ? iServiceType
      : ({} as IServiceType);
    this.capacitiesQuantity = currentValue.capacitiesQuantity || 0;
    this.segmentList = currentValue.segments
      ? currentValue.segments.map(
          (iServiceTypeSegment) =>
            new CapacityServiceTypeSegment(iServiceTypeSegment)
        )
      : [];
    this.serviceTypeCode = currentValue.serviceTypeCode || '';
    this.startDay = iServiceType.startDay
      ? DatesHelper.Date(
          iServiceType.startDay,
          DATES_FORMAT.yearMonthDay
        ).valueOf()
      : null;
    this.endDay = iServiceType.endDay
      ? DatesHelper.Date(
          iServiceType.endDay,
          DATES_FORMAT.yearMonthDay
        ).valueOf()
      : null;
  }
}
