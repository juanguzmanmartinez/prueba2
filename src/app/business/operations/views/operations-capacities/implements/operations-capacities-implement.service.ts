import { Injectable } from '@angular/core';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { CapacityClientService } from '@clients/capacities/capacity-client.service';
import { ICalendarUpdateRequestParams } from '@models/calendar/capacity.model';
import { map } from 'rxjs/operators';
import { CapacitiesDrugstore, CapacitiesDrugstoreServiceDefaultCapacity, CapacitiesServiceType } from '../models/operations-capacities-responses.model';
import { Observable } from 'rxjs';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ICalendarParams } from '@models/calendar/calendar-params.model';
import { IDrugstoreParams } from '@interfaces/drugstores/drugstores.interface';
import { ReportsClientService } from '@clients/reports/reports-client.service';

@Injectable()
export class OperationsCapacitiesImplementService {

    constructor(
        private storesClient: DrugstoresClientService,
        private calendarClient: CapacityClientService,
        private reportsClient: ReportsClientService,
    ) {
    }

    public getLocalImplement$(): Observable<CapacitiesDrugstore[]> {
        return this.storesClient.getDrugstoreList()
            .pipe(
                map((locals) => {
                    return locals ? locals.map(store => new CapacitiesDrugstore(store)) : [];
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
        } as IDrugstoreParams;
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
        } as IDrugstoreParams;
        return this.storesClient.getTypeOperationGroupClient$(params)
            .pipe(
                map((iServiceType) => {
                    return iServiceType ? new CapacitiesServiceType(iServiceType) : null;
                }));
    }

    public getCalendarDefaultCapacitiesImplement$(
        capacitiesLocal: CapacitiesDrugstore
    ): Observable<CapacitiesDrugstoreServiceDefaultCapacity[]> {
        const params = {
            fulfillmentCenter: capacitiesLocal.drugstoreCode
        } as ICalendarParams;
        return this.calendarClient.getCalendarDefaultCapacities$(params)
            .pipe(
                map((serviceDefaultCapacities) => {
                    return serviceDefaultCapacities ? serviceDefaultCapacities
                        .map(store => new CapacitiesDrugstoreServiceDefaultCapacity(store)) : [];
                })
            );
    }

    public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
        return this.calendarClient.patchCalendarUpdateClient$(request);
    }

    public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
        return this.calendarClient.patchCalendarRangeUpdateClient$(request);
    }

    public get drugstoreListReport(): string {
        return this.reportsClient.drugstoreListReport();
    }

    public get drugstoreDetailReport(): string {
        return this.reportsClient.drugstoreDetailReport();
    }
}
