import { Injectable } from '@angular/core';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { LocalClientService } from 'src/app/shared/services/calendar/local-client.service';
import { CalendarClientService } from '../calendar/calendar-client.service';
import { ICalendarUpdateRequestParams } from '../models/capacity.model';
import {map, take} from 'rxjs/operators';

@Injectable()
export class CapacityImplementService {

  constructor(
    private localClient: LocalClientService,
    private calendarClient: CalendarClientService,
  ) { }

  public getLocalImplements$(serviceType: string) {
    return this.localClient.getLocalClient$(serviceType)
      .pipe(take(1),
        map((locals) => {
          return locals ? locals.map(store => {
            return {
              text: store.description,
              value: store.localCode,
              code: store.localCode,
              fulfillmentCenterCode: store.localCode,
            } as ICustomSelectOption;
          }) : [];
        }));
  }

  public getLocalGroupImplements$(serviceType: string) {
    return this.localClient.getGroupLocalClient$(serviceType)
      .pipe(take(1),
        map((locals) => {
          return locals ? locals.map(store => {
            return {
              text: store.description,
              value: store.localCode,
              code: store.localCode,
              fulfillmentCenterCode: store.localCode,
            } as ICustomSelectOption;
          }) : [];
        }));
  }

  public getTypeOperationImplements$(serviceType: string, selectedLocal: ICustomSelectOption, serviceTypeCode: string) {
    return this.localClient.getTypeOperationClient$(serviceType, selectedLocal, serviceTypeCode)
      .pipe(take(1));
  }

  public getTypeOperationGroupImplements$(serviceType: string, selectedLocal: ICustomSelectOption, serviceTypeCode: string) {
    return this.localClient.getTypeOperationGroupClient$(serviceType, selectedLocal, serviceTypeCode)
      .pipe(take(1));
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarUpdateClient$(request)
      .pipe(take(1));
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarRangeUpdateClient$(request)
      .pipe(take(1));
  }

}
