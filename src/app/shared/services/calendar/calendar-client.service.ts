import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { GenericService } from '../generic.service';
import { Blocked, Calendar, IBlocked, ICalendar, IDayBlockedRequest } from '../../models/calendar/calendar.model';
import { ICustomSelectOption } from 'src/app/shared/interfaces/custom-controls.interface';
import { isArray } from '../../helpers/objects-equal';
import { Capacity, ICalendarUpdateRequestParams, ICapacity } from '../../models/calendar/capacity.model';
import { EChannel } from '../../models/channel/channel.model';
import { ICalendarParams } from '../../models/calendar/calendar-params.model';
import { Observable } from 'rxjs';
import { ICalendarServiceDefaultCapacities } from '../../models/calendar/calendar-response.model';


@Injectable()
export class CalendarClientService {

  private readonly CALENDAR_ENDPOINT = ENDPOINTS.GET_CALENDAR;
  private readonly BLOCKED_DAY_ENDPOINT = ENDPOINTS.PATCH_CALENDAR;
  private readonly CALENDAR_UPDATE_ENDPOINT = ENDPOINTS.PATCH_CALENDAR_UPDATE;
  private readonly CALENDAR_UPDATE_RANGE_ENDPOINT = ENDPOINTS.PATCH_CALENDAR_RANGE_UPDATE;
  private readonly CALENDAR_CAPACITIES = ENDPOINTS.GET_CALENDAR_CAPACITIES;

  constructor(
    private genericService: GenericService,
  ) { }

  public getCalendarClient$(params: ICustomSelectOption) {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenterCode))
      .set('serviceTypeCode', String(params.serviceTypeCode))
      .set('segmentType', String(params.segmentType))
      .set('channel', String(params.channel));
    return this.genericService.genericGet<ICalendar[]>(this.CALENDAR_ENDPOINT, httpParams)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        return current.map(e => new Calendar(e));
      }));
  }


  public patchCalendarClient$(params: IDayBlockedRequest, days: string, unchecked: string) {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenterCode));
    const ENDPOINT = this.BLOCKED_DAY_ENDPOINT + '/' + days + '/checks/' + unchecked;
    return this.genericService.genericPatchWithoutBody<IBlocked[]>(ENDPOINT, httpParams)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        return current.map(e => new Blocked(e));
      }));
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.genericService.genericPatch<IBlocked[]>(this.CALENDAR_UPDATE_ENDPOINT, request)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        return current.map(e => new Blocked(e));
      }));
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.genericService.genericPatch<ICapacity[]>(this.CALENDAR_UPDATE_RANGE_ENDPOINT, request)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        return current.map(e => new Capacity(e));
      }));
  }

  public getCalendarDefaultCapacities$(params: ICalendarParams): Observable<ICalendarServiceDefaultCapacities[]> {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenter))
      .set('channel', String(EChannel.digital));
    return this.genericService.genericGet<ICalendarServiceDefaultCapacities[]>(this.CALENDAR_CAPACITIES, httpParams)
      .pipe(
        take(1),
        map(response => {
        return  isArray(response) ? response : [];
      }));
  }
}
