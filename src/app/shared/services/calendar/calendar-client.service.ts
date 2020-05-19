import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { GenericService } from '../generic.service';
import { ICalendar, Calendar, IDayBlockedRequest, IBlocked, Blocked } from '../models/calendar.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { isArray } from '../../helpers/objects-equal';


@Injectable()
export class CalendarClientService {

  private readonly CALENDAR_ENDPOINT = ENDPOINTS.GET_CALENDAR;
  private readonly BLOCKED_DAY_ENDPONINT = ENDPOINTS.PATCH_CALENDAR;

  constructor(
    private genericService: GenericService,
  ) { }

  public getCalendarClient$(params: ICustomSelectOption) {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenterCode))
      .set('serviceTypeCode', String(params.serviceTypeCode))
      .set('segmentType', String(params.segmentType))
      .set('channel', String(params.channel));
    const Header = new HttpHeaders();
    return this.genericService.genericGet<ICalendar[]>(this.CALENDAR_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        const responses = current.map(e => new Calendar(e));
        return responses;
      }));
  }


  public patchCalendarClient$(params: IDayBlockedRequest, days: string, unchecked: string) {
    const httpParams = new HttpParams().set('fulfillmentCenterCode', String(params.fulfillmentCenterCode));
    const ENPOINT = this.BLOCKED_DAY_ENDPONINT + '/' + days + '/checks/' + unchecked;
    const Header = new HttpHeaders();
    return this.genericService.genericPatch<IBlocked[]>(ENPOINT, httpParams, Header)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        const responses = current.map(e => new Blocked(e));
        return responses;
      }));
  }
}
