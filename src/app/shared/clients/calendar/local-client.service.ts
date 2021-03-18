import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { GenericService } from '../generic/generic.service';
import { ILocal } from '@models/local/local.model';
import { IServiceType } from '@models/local/service-type.model';
import { ILocalParams } from '@models/local/local-params.model';
import { ILocalGroup } from '@models/local/local-group.model';
import { Observable } from 'rxjs';
import { EChannel } from '@models/channel/channel.model';
import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';


@Injectable()
export class LocalClientService {

    private readonly LOCAL = EndpointsParameter.GET_DRUGSTORE;
    private readonly LOCAL_BY_SERVICE_TYPE_ENDPOINT = EndpointsParameter.GET_DRUGSTORE_BY_SERVICE_TYPE;
    private readonly TYPE_SERVICE_ENDPOINT = EndpointsParameter.GET_CALENDAR_SERVICE_TYPE;

    constructor(
        private genericService: GenericService,
    ) {
    }

    public getLocalClient$(): Observable<ILocal[]> {
        const endpoint = `${this.LOCAL}`;
        return this.genericService.genericGet<ILocal[]>(endpoint)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<ILocal[]> {
        const endpoint = `${this.LOCAL_BY_SERVICE_TYPE_ENDPOINT}${serviceType}`;
        return this.genericService.genericGet<ILocal[]>(endpoint)
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
