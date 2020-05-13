import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { isArray } from '../../helpers/objects-equal';
import { IStoreResponse } from '../models/drugstore.model';
import { GenericService } from '../generic.service';
import { ICalendarRequestParams } from '../models/calendar.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';


@Injectable()
export class CalendarClientService {

  private readonly CALENDAR_ENDPOINT = ENDPOINTS.GET_CALENDAR;

  constructor(
    private genericService: GenericService,
  ) { }

  public getCalendarClient$(params: ICustomSelectOption): Observable<any> {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenterCode))
      .set('serviceTypeCode', String(params.serviceTypeCode))
      .set('segmentType', String(params.segmentType))
      .set('channel', String(params.channel));
    const Header = new HttpHeaders();
    return this.genericService.genericGet<IStoreResponse>(this.CALENDAR_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const calendarResponse = response;
        return calendarResponse;
      }));
  }
}
