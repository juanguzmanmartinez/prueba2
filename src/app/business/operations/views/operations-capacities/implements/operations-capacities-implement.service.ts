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

    public getDrugstoreImplement$(): Observable<CapacitiesDrugstore[]> {
        return this.storesClient.getDrugstoreList()
            .pipe(
                map((drugstoreList) => {
                    return drugstoreList ? drugstoreList.map(drugstore => new CapacitiesDrugstore(drugstore)) : [];
                }));
    }

    public getDrugstoreByServiceTypeImplement$(serviceType: EDeliveryServiceType) {
        return this.storesClient.getDrugstoreByServiceTypeClient$(serviceType)
            .pipe(
                map((iDrugstoreList) => {
                    return iDrugstoreList ? iDrugstoreList.map(iDrugstore => {
                        return {
                            text: iDrugstore.description,
                            value: iDrugstore.localCode,
                            code: iDrugstore.localCode,
                            fulfillmentCenterCode: iDrugstore.localCode,
                        } as ICustomSelectOption;
                    }) : [];
                }));
    }

    public getDrugstoreGroupImplements$(serviceType: EDeliveryServiceType) {
        return this.storesClient.getDrugstoreGroupByServiceTypeClient$(serviceType)
            .pipe(
                map((iDrugstoreGroupList) => {
                    return iDrugstoreGroupList ? iDrugstoreGroupList.map(iDrugstore => {
                        return {
                            text: iDrugstore.description,
                            value: iDrugstore.localCode,
                            code: iDrugstore.localCode,
                            fulfillmentCenterCode: iDrugstore.localCode,
                        } as ICustomSelectOption;
                    }) : [];
                }));
    }

    public getTypeOperationImplements$(
        detailType: string,
        selectedDrugstore: ICustomSelectOption,
        serviceType: EDeliveryServiceType
    ): Observable<CapacitiesServiceType> {
        const params = {
            fulfillmentCenter: selectedDrugstore.fulfillmentCenterCode,
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
        selectedDrugstore: ICustomSelectOption,
        serviceType: EDeliveryServiceType
    ): Observable<CapacitiesServiceType> {
        const params = {
            fulfillmentCenter: selectedDrugstore.fulfillmentCenterCode,
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
        capacitiesDrugstore: CapacitiesDrugstore
    ): Observable<CapacitiesDrugstoreServiceDefaultCapacity[]> {
        const params = {
            fulfillmentCenter: capacitiesDrugstore.drugstoreCode
        } as ICalendarParams;
        return this.calendarClient.getCalendarDefaultCapacities$(params)
            .pipe(
                map((serviceDefaultCapacities) => {
                    return serviceDefaultCapacities ? serviceDefaultCapacities
                        .map(drugstore => new CapacitiesDrugstoreServiceDefaultCapacity(drugstore)) : [];
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
