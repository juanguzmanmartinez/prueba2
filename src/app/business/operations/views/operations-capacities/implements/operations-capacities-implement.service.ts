import { Injectable } from '@angular/core';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { StoresClientService } from '@clients/stores/stores-client.service';
import { CalendarClientService } from '@clients/capacities/calendar-client.service';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { map } from 'rxjs/operators';
import { CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType, CapacitiesStore } from '../models/operations-capacities-responses.model';
import { Observable } from 'rxjs';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';
import { ILocalParams } from '@interfaces/stores/stores.interface';

@Injectable()
export class OperationsCapacitiesImplementService {

    constructor(
        private storesClient: StoresClientService,
        private calendarClient: CalendarClientService,
    ) {
    }

    public getLocalImplement$(): Observable<CapacitiesStore[]> {
        return this.storesClient.getStoreList()
            .pipe(
                map((locals) => {
                    return locals ? locals.map(store => new CapacitiesStore(store)) : [];
                }));
    }

    public getLocalByServiceTypeImplement$(serviceType: EDeliveryServiceType) {
        return this.storesClient.getLocalByServiceTypeClient$(serviceType)
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

    public getLocalGroupImplements$(serviceType: EDeliveryServiceType) {
        return this.storesClient.getLocalGroupByServiceTypeClient$(serviceType)
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
        serviceType: EDeliveryServiceType
    ): Observable<CapacitiesServiceType> {
        const params = {
            fulfillmentCenter: selectedLocal.fulfillmentCenterCode,
            detailType,
            serviceType
        } as ILocalParams;
        return this.storesClient.getTypeOperationClient$(params)
            .pipe(
                map((iServiceType) => {
                    return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
                }));
    }

    public getTypeOperationGroupImplements$(
        detailType: string,
        selectedLocal: ICustomSelectOption,
        serviceType: EDeliveryServiceType
    ): Observable<CapacitiesServiceType> {
        const params = {
            fulfillmentCenter: selectedLocal.fulfillmentCenterCode,
            detailType,
            serviceType
        } as ILocalParams;
        return this.storesClient.getTypeOperationGroupClient$(params)
            .pipe(
                map((iServiceType) => {
                    return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
                }));
    }

    public getCalendarDefaultCapacitiesImplement$(
        capacitiesLocal: CapacitiesStore
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
