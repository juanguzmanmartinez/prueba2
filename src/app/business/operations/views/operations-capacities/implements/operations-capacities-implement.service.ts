import { Injectable } from '@angular/core';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { CapacityClientService } from '@clients/capacities/capacity-client.service';
import {
  Capacity,
  ICalendarUpdateRequestParams,
} from '@models/calendar/capacity.model';
import { map } from 'rxjs/operators';
import {
  CapacitiesDrugstore,
  CapacitiesDrugstoreServiceDefaultCapacity,
  CapacitiesServiceType,
} from '../models/operations-capacities-responses.model';
import { Observable } from 'rxjs';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';
import { IDrugstoreParams } from '@interfaces/drugstores/drugstores.interface';
import { ReportsClientService } from '@clients/reports/reports-client.service';
import { Blocked } from '@interfaces/capacities/calendar.interface';

@Injectable()
export class OperationsCapacitiesImplementService {
  get drugstoreListReport(): string {
    return this.reportsClient.drugstoreListReport();
  }

  get drugstoreDetailReport(): string {
    return this.reportsClient.drugstoreDetailReport();
  }

  constructor(
    private storesClient: DrugstoresClientService,
    private calendarClient: CapacityClientService,
    private reportsClient: ReportsClientService
  ) {}

  getDrugstoreImplement$(): Observable<CapacitiesDrugstore[]> {
    return this.storesClient.getDrugstoreList().pipe(
      map((drugstoreList) => {
        return drugstoreList
          ? drugstoreList.map((drugstore) => new CapacitiesDrugstore(drugstore))
          : [];
      })
    );
  }

  getDrugstoreByServiceTypeImplement$(serviceType: EDeliveryServiceType) {
    return this.storesClient.getDrugstoreByServiceTypeClient$(serviceType).pipe(
      map((iDrugstoreList) => {
        return iDrugstoreList
          ? iDrugstoreList.map((iDrugstore) => {
              return {
                text: iDrugstore.description,
                value: iDrugstore.localCode,
                code: iDrugstore.localCode,
                fulfillmentCenterCode: iDrugstore.localCode,
              } as ICustomSelectOption;
            })
          : [];
      })
    );
  }

  getDrugstoreGroupImplements$(serviceType: EDeliveryServiceType) {
    return this.storesClient
      .getDrugstoreGroupByServiceTypeClient$(serviceType)
      .pipe(
        map((iDrugstoreGroupList) => {
          return iDrugstoreGroupList
            ? iDrugstoreGroupList.map((iDrugstore) => {
                return {
                  text: iDrugstore.description,
                  value: iDrugstore.localCode,
                  code: iDrugstore.localCode,
                  fulfillmentCenterCode: iDrugstore.localCode,
                } as ICustomSelectOption;
              })
            : [];
        })
      );
  }

  getTypeOperationImplements$(
    detailType: string,
    selectedDrugstore: ICustomSelectOption,
    serviceType: EDeliveryServiceType
  ): Observable<CapacitiesServiceType> {
    const params = {
      fulfillmentCenter: selectedDrugstore.fulfillmentCenterCode,
      detailType,
      serviceType,
    } as IDrugstoreParams;
    return this.storesClient.getTypeOperationClient$(params).pipe(
      map((iServiceType) => {
        return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
      })
    );
  }

  getTypeOperationGroupImplements$(
    detailType: string,
    selectedDrugstore: ICustomSelectOption,
    serviceType: EDeliveryServiceType
  ): Observable<CapacitiesServiceType> {
    const params = {
      fulfillmentCenter: selectedDrugstore.fulfillmentCenterCode,
      detailType,
      serviceType,
    } as IDrugstoreParams;
    return this.storesClient.getTypeOperationGroupClient$(params).pipe(
      map((iServiceType) => {
        return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
      })
    );
  }

  getCalendarDefaultCapacitiesImplement$(
    capacitiesDrugstore: CapacitiesDrugstore
  ): Observable<CapacitiesDrugstoreServiceDefaultCapacity[]> {
    const params = {
      fulfillmentCenter: capacitiesDrugstore.drugstoreCode,
    } as ICalendarParams;
    return this.calendarClient.getCalendarDefaultCapacities$(params).pipe(
      map((serviceDefaultCapacities) => {
        return serviceDefaultCapacities
          ? serviceDefaultCapacities.map(
              (drugstore) =>
                new CapacitiesDrugstoreServiceDefaultCapacity(drugstore)
            )
          : [];
      })
    );
  }

  patchCalendarUpdateClient$(
    request: ICalendarUpdateRequestParams
  ): Observable<Blocked[]> {
    return this.calendarClient.patchCalendarUpdateClient$(request);
  }

  patchCalendarRangeUpdateClient$(
    request: ICalendarUpdateRequestParams
  ): Observable<Capacity[]> {
    return this.calendarClient.patchCalendarRangeUpdateClient$(request);
  }

  getDepartamentClient$(): Observable<any[]> {
    return this.calendarClient.getDepartamentsList$().pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }

  getProvincesClient$(params: any): Observable<any[]> {
    return this.calendarClient.getProvincesList$(params).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }

  getDistrictsClient$(params: any): Observable<any[]> {
    return this.calendarClient.getDistricsList$(params).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }

  getStoresClient$(params: any): Observable<any[]> {
    return this.calendarClient.getStoresList$(params).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }

  getCapcitiesTemplateClient$(codes: any, services: any): Observable<any[]> {
    const params = {
      serviceTypes: services,
    };
    return this.calendarClient.getCapacityFromStores$(codes, params).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }
  updateCapacitiesStores$(codes: any): Observable<any[]> {
    return this.calendarClient.patchCapacitiesStores$(codes).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }
  validateStores$(codes: any): Observable<any[]> {
    return this.calendarClient.validateDataStores$(codes).pipe(
      map((drugstoreList) => {
        return drugstoreList;
      })
    );
  }
}
