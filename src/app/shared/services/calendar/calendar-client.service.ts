import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { GenericService } from '../generic.service';
import { ICalendarResponse, CalendarResponse, ICalendar, Calendar } from '../models/calendar.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { isArray } from '../../helpers/objects-equal';


@Injectable()
export class CalendarClientService {

  private readonly CALENDAR_ENDPOINT = ENDPOINTS.GET_CALENDAR;

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
        return current.map(e => new Calendar(e));
      }));
  }
}
