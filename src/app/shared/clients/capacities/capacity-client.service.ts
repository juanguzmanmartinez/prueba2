import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { GenericService } from '../generic/generic.service';
import { Blocked, IBlocked } from '@interfaces/capacities/calendar.interface';
import { isArray } from '@helpers/objects-equal.helper';
import {
  Capacity,
  ICalendarUpdateRequestParams,
  ICapacity,
} from '@models/calendar/capacity.model';
import { EChannel } from '@models/channel/channel.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';
import { Observable } from 'rxjs';
import { ICalendarServiceDefaultCapacities } from '@models/calendar/calendar-response.model';
import {
  IExpressIntervalTimeParams,
  IExpressIntervalTimeRequest,
  IExpressIntervalTimeResponse,
} from '@interfaces/capacities/interval-time.interface';

@Injectable()
export class CapacityClientService {
  private readonly CALENDAR_UPDATE = EndpointsParameter.CALENDAR_UPDATE;
  private readonly CALENDAR_UPDATE_RANGE =
    EndpointsParameter.CALENDAR_RANGE_UPDATE;
  private readonly CALENDAR_CAPACITIES = EndpointsParameter.CALENDAR_CAPACITIES;
  private readonly CAPACITY_INTERVAL_TIME_EXPRESS =
    EndpointsParameter.CAPACITY_INTERVAL_TIME_EXPRESS;

  constructor(private genericService: GenericService) {}

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.genericService
      .genericPatch<IBlocked[]>(this.CALENDAR_UPDATE, request)
      .pipe(
        map((response) => {
          const current = isArray(response) ? response : [];
          return current.map((e) => new Blocked(e));
        })
      );
  }

  public patchCalendarRangeUpdateClient$(
    request: ICalendarUpdateRequestParams
  ) {
    return this.genericService
      .genericPatch<ICapacity[]>(this.CALENDAR_UPDATE_RANGE, request)
      .pipe(
        map((response) => {
          const current = isArray(response) ? response : [];
          return current.map((e) => new Capacity(e));
        })
      );
  }

  public getCalendarDefaultCapacities$(
    params: ICalendarParams
  ): Observable<ICalendarServiceDefaultCapacities[]> {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(params.fulfillmentCenter))
      .set('channel', String(EChannel.digital));
    return this.genericService
      .genericGet<ICalendarServiceDefaultCapacities[]>(
        this.CALENDAR_CAPACITIES,
        httpParams
      )
      .pipe(
        take(1),
        map((response) => {
          return isArray(response) ? response : [];
        })
      );
  }

  public getCapacityIntervalTimeExpress(
    params: IExpressIntervalTimeParams
  ): Observable<IExpressIntervalTimeResponse> {
    const httpParams = new HttpParams()
      .set('localCode', String(params.localCode))
      .set('serviceType', String(params.serviceType));

    return this.genericService
      .genericGet<IExpressIntervalTimeResponse>(
        this.CAPACITY_INTERVAL_TIME_EXPRESS,
        httpParams
      )
      .pipe(take(1));
  }

  public saveCapacityIntervalTimeExpress(request: IExpressIntervalTimeRequest) {
    return this.genericService
      .genericPost(this.CAPACITY_INTERVAL_TIME_EXPRESS, request)
      .pipe(take(1));
  }
}
