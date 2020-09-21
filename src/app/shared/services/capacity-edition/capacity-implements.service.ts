import { Injectable } from '@angular/core';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { LocalClientService } from 'src/app/shared/services/calendar/local-client.service';
import { CalendarClientService } from '../calendar/calendar-client.service';
import { ICalendarUpdateRequestParams } from '../models/capacity.model';

@Injectable()
export class CapacityImplementService {

  constructor(
    private localClient: LocalClientService,
    private calendarClient: CalendarClientService,
  ) { }

  public getLocalImplements$(serviceType: string) {
    return this.localClient.getLocalClient$(serviceType);
  }

  public getTypeOperationImplements$(serviceType: string, selectedLocal: ICustomSelectOption, serviceTypeCode: string) {
    return this.localClient.getTypeOperationClient$(serviceType, selectedLocal, serviceTypeCode);
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarUpdateClient$(request);
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarRangeUpdateClient$(request);
  }

}
