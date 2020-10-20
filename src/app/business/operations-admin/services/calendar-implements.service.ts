import { Injectable } from '@angular/core';
import { DrugstoreClientService } from 'src/app/shared/services/calendar/drugstores-client.service';
import { CalendarClientService } from 'src/app/shared/services/calendar/calendar-client.service';
import { ICalendarRequestParams, IDayBlockedRequest } from 'src/app/shared/models/calendar/calendar.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';

@Injectable()
export class CalendarImplementService {

  public params: ICalendarRequestParams[];
  constructor(
    private drugstoreClient: DrugstoreClientService,
    private calendarClient: CalendarClientService,
  ) { }

  public getDrugstoreImplements$() {
    return this.drugstoreClient.getDrugstoreClient$();
  }

  public getCalendarImplements$(requestparam: ICustomSelectOption) {
    return this.calendarClient.getCalendarClient$(requestparam);
  }
  public patchCalendarImplements$(requestparam: IDayBlockedRequest, variable: string, type: string) {
    return this.calendarClient.patchCalendarClient$(requestparam, variable, type);
  }
}
