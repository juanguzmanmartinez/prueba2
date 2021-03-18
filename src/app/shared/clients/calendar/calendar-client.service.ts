import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { GenericService } from '../generic/generic.service';
import { Blocked, IBlocked } from '@models/calendar/calendar.model';
import { isArray } from '@helpers/objects-equal.helper';
import { Capacity, ICalendarUpdateRequestParams, ICapacity } from '@models/calendar/capacity.model';
import { EChannel } from '@models/channel/channel.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';
import { Observable } from 'rxjs';
import { ICalendarServiceDefaultCapacities } from '@models/calendar/calendar-response.model';


@Injectable()
export class CalendarClientService {

  private readonly CALENDAR_UPDATE_ENDPOINT = EndpointsParameter.PATCH_CALENDAR_UPDATE;
  private readonly CALENDAR_UPDATE_RANGE_ENDPOINT = EndpointsParameter.PATCH_CALENDAR_RANGE_UPDATE;
  private readonly CALENDAR_CAPACITIES = EndpointsParameter.GET_CALENDAR_CAPACITIES;

  constructor(
    private genericService: GenericService,
  ) { }

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
