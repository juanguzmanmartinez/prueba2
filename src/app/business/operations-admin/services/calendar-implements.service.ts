import { Injectable } from '@angular/core';
import { DrugstoreClientService } from 'src/app/shared/services/calendar/drugstores-client.service';
import { CalendarClientService } from 'src/app/shared/services/calendar/calendar-client.service';
import { ICalendarRequestParams } from 'src/app/shared/services/models/calendar.model';
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
  // console.log(requestparam, 'request para,');
    return this.calendarClient.getCalendarClient$(requestparam);
  }
}
