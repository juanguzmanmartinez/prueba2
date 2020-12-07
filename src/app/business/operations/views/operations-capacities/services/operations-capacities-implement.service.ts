import { Injectable } from '@angular/core';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { LocalClientService } from '@services/calendar/local-client.service';
import { CalendarClientService } from '@services/calendar/calendar-client.service';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { map } from 'rxjs/operators';
import { ILocalParams } from '@models/local/local-params.model';
import { CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType } from '../models/operations-capacities-responses.model';
import { Observable } from 'rxjs';
import { ECapacitiesServiceType } from '@models/capacities/capacities-service-type.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';

@Injectable()
export class OperationsCapacitiesImplementService {

  constructor(
    private localClient: LocalClientService,
    private calendarClient: CalendarClientService,
  ) {
  }

  public getLocalImplement$(): Observable<CapacitiesLocal[]> {
    return this.localClient.getLocalClient$()
      .pipe(
        map((locals) => {
          return locals ? locals.map(store => new CapacitiesLocal(store)) : [];
        }));
  }

  public getLocalByServiceTypeImplement$(serviceType: ECapacitiesServiceType) {
    return this.localClient.getLocalByServiceTypeClient$(serviceType)
      .pipe(
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

  public getLocalGroupImplements$(serviceType: ECapacitiesServiceType) {
    return this.localClient.getLocalGroupByServiceTypeClient$(serviceType)
      .pipe(
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

  public getTypeOperationImplements$(
    detailType: string,
    selectedLocal: ICustomSelectOption,
    serviceType: ECapacitiesServiceType
  ): Observable<CapacitiesServiceType> {
    const params = {
      fulfillmentCenter: selectedLocal.fulfillmentCenterCode,
      detailType,
      serviceType
    } as ILocalParams;
    return this.localClient.getTypeOperationClient$(params)
      .pipe(
        map((iServiceType) => {
          return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
        }));
  }

  public getTypeOperationGroupImplements$(
    detailType: string,
    selectedLocal: ICustomSelectOption,
    serviceType: ECapacitiesServiceType
  ): Observable<CapacitiesServiceType> {
    const params = {
      fulfillmentCenter: selectedLocal.fulfillmentCenterCode,
      detailType,
      serviceType
    } as ILocalParams;
    return this.localClient.getTypeOperationGroupClient$(params)
      .pipe(
        map((iServiceType) => {
          return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
        }));
  }

  public getCalendarDefaultCapacitiesImplement$(
    capacitiesLocal: CapacitiesLocal
  ): Observable<CapacitiesLocalServiceDefaultCapacity[]> {
    const params = {
      fulfillmentCenter: capacitiesLocal.localCode
    } as ICalendarParams;
    return this.calendarClient.getCalendarDefaultCapacities$(params)
      .pipe(
        map((serviceDefaultCapacities) => {
          return serviceDefaultCapacities ? serviceDefaultCapacities
            .map(store => new CapacitiesLocalServiceDefaultCapacity(store)) : [];
        })
      );
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarUpdateClient$(request);
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarRangeUpdateClient$(request);
  }

}
