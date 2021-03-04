import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { GenericService } from '../generic/generic.service';
import { Observable } from 'rxjs';
import { EChannel } from '@models/channel/channel.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ILocalGroup, ILocalParams, IServiceType, IStore } from '@interfaces/stores/stores.interface';


@Injectable()
export class StoresClientService {

    private readonly STORE_LIST = EndpointsParameter.GET_DRUGSTORE;
    private readonly LOCAL_BY_SERVICE_TYPE_ENDPOINT = EndpointsParameter.GET_DRUGSTORE_BY_SERVICE_TYPE;
    private readonly TYPE_SERVICE_ENDPOINT = EndpointsParameter.GET_CALENDAR_SERVICE_TYPE;

    constructor(
        private genericService: GenericService,
    ) {
    }

    public getStoreList(): Observable<IStore[]> {
        return this.genericService.genericGet<IStore[]>(this.STORE_LIST)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<IStore[]> {
        const endpoint = `${this.LOCAL_BY_SERVICE_TYPE_ENDPOINT}${serviceType}`;
        return this.genericService.genericGet<IStore[]>(endpoint)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalGroupByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<ILocalGroup[]> {
        const httpParams = new HttpParams()
            .set('filter', String('GROUP'));

        const endpoint = `${this.LOCAL_BY_SERVICE_TYPE_ENDPOINT}${serviceType}`;
        return this.genericService.genericGet<ILocalGroup[]>(endpoint, httpParams)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getTypeOperationClient$(iLocalParams: ILocalParams): Observable<IServiceType> {
        const httpParams = new HttpParams()
            .set('fulfillmentCenterCode', String(iLocalParams.fulfillmentCenter))
            .set('serviceTypeCode', String(iLocalParams.serviceType))
            .set('detailType', String(iLocalParams.detailType))
            .set('channel', String(EChannel.digital));

        const endpoint = `${this.TYPE_SERVICE_ENDPOINT}`;
        return this.genericService.genericGet<IServiceType>(endpoint, httpParams)
            .pipe(
                take(1),
                map(response => {
                    return isObject(response) ? response : response;
                }));
    }

    public getTypeOperationGroupClient$(iLocalParams: ILocalParams): Observable<IServiceType> {
        const httpParams = new HttpParams()
            .set('fulfillmentCenterCode', String(iLocalParams.fulfillmentCenter))
            .set('serviceTypeCode', String(iLocalParams.serviceType))
            .set('detailType', String(iLocalParams.detailType))
            .set('channel', String(EChannel.digital))
            .set('filter', String('GROUP'));

        const endpoint = `${this.TYPE_SERVICE_ENDPOINT}`;
        return this.genericService.genericGet<IServiceType>(endpoint, httpParams)
            .pipe(
                take(1),
                map(response => {
                    return isObject(response) ? response : response;
                }));
    }
}
