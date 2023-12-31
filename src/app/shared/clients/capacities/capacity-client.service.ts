import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

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


  private readonly DEPARTAMENTS = EndpointsParameter.DEPARTAMENTS;
  private readonly PROVINCES = EndpointsParameter.PROVINCES;
  private readonly DISTRICTS = EndpointsParameter.DISTRICS;
  private readonly STORES_LIST = EndpointsParameter.STORES_LIST;
  private readonly CAPACITY_TEMPLATE = EndpointsParameter.CAPACITY_TEMPLATE;
  private readonly PTACH_CAPACITIES = EndpointsParameter.PTACH_CAPACITIES;
  private readonly VALIDATE_STORES = EndpointsParameter.VALIDATE_STORES;
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
  
  public getDepartamentsList$(params?: any): Observable<any[]> {
    return this.genericService.genericGet<any[]>(this.DEPARTAMENTS).pipe(
      take(1),
      map((response) => {
        return isArray(response) ? response : [];
      })
    );
  }

  public getProvincesList$(params?: any): Observable<any[]> {
    const URI = `${this.PROVINCES}/${params}`;
    return this.genericService.genericGet<any[]>(URI).pipe(
      take(1),
      map((response) => {
        return isArray(response) ? response : [];
      })
    );
  }

  public getDistricsList$(params?: any): Observable<any[]> {
    const URI = `${this.DISTRICTS}/${params}`;
    return this.genericService.genericGet<any[]>(URI).pipe(
      take(1),
      map((response) => {
        return isArray(response) ? response : [];
      })
    );
  }

  public getStoresList$(params?: any): Observable<any[]> {
    const URI = `${this.STORES_LIST}/${params}`;
    return this.genericService.genericGet<any[]>(URI).pipe(
      take(1),
      map((response) => {
        return isArray(response) ? response : [];
      })
    );
  }

  public getCapacityFromStores$(codes: any, params?: any): Observable<any[]> {
    const httpParams = new HttpParams().set(
      'serviceTypes',
      String(params.serviceTypes)
    );
    const URI = `${this.CAPACITY_TEMPLATE}/${codes}`;
    return this.genericService.genericGet<any[]>(URI, httpParams).pipe(
      take(1),
      map((response) => {
        return isArray(response) ? response : [];
      })
    );
  }

  public patchCapacitiesStores$(request: any) {
    return this.genericService
      .genericPost<ICapacity[]>(this.PTACH_CAPACITIES, request)
      .pipe(
        map((response) => {
          return response;

        })
      );
  }
  public validateDataStores$(request: any) {
    return this.genericService
      .genericPost<ICapacity[]>(this.VALIDATE_STORES, request)
      .pipe(
        map((response) => {
          return response;

        })
      );
  }
}
