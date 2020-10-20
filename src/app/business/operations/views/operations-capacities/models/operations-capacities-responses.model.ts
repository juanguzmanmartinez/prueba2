import {ILocal, Local} from '../../../../../shared/models/local/local.model';
import {isObject} from '../../../../../shared/helpers/objects-equal';
import {CalendarServiceDefaultCapacities, ICalendarServiceDefaultCapacities} from '../../../../../shared/models/calendar/calendar-response.model';

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
    const serviceDefaultCapacities = isObject(iCalendarServiceDefaultCapacities) ? iCalendarServiceDefaultCapacities : {} as ICalendarServiceDefaultCapacities;
    this.serviceType = serviceDefaultCapacities.serviceTypeCode;
    this.capacityQuantity = serviceDefaultCapacities.capacitiesQuantity;
  }
}
