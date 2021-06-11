import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { GenericService } from '../generic/generic.service';
import { Observable } from 'rxjs';
import { EChannel } from '@models/channel/channel.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ILocalGroup, ILocalParams, IServiceType, IStore, IStoreDetail, IStoreDetailUpdate, IStoreServiceTypeRegister, IStoreServiceTypeUpdate } from '@interfaces/stores/stores.interface';


@Injectable()
export class StoresClientService {

    private readonly STORE_LIST = EndpointsParameter.GET_DRUGSTORE;
    private readonly STORE_SERVICE_TYPE = EndpointsParameter.STORE_SERVICE_TYPE;
    private readonly STORE_BY_SERVICE_TYPE = EndpointsParameter.GET_DRUGSTORE_BY_SERVICE_TYPE;
    private readonly TYPE_SERVICE_ENDPOINT = EndpointsParameter.GET_CALENDAR_SERVICE_TYPE;

    constructor(
        private generic: GenericService,
    ) {
    }

    public getStoreList(): Observable<IStore[]> {
        return this.generic.genericGet<IStore[]>(this.STORE_LIST)
            .pipe(
                take(1),
                map((response: IStore[]) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getStoreDetail(storeCode: string): Observable<IStoreDetail> {
        return this.getStoreList()
            .pipe(
                take(1),
                map((iStoreList: IStoreDetail[]) => {
                    const findStoreDetail = iStoreList.find((store) => store.localCode === storeCode);
                    if (!findStoreDetail) {
                        throw new Error('Store not found');
                    }
                    return findStoreDetail;
                }),
                map((response: IStoreDetail) => {
                    return isObject(response) ? response : null;
                }));
    }

    public putStoreDetail(storeCode: string, body: IStoreDetailUpdate): Observable<any> {
        const endpoint = `${this.STORE_LIST}/${storeCode}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }


    public putZoneServiceType(serviceTypeId: string, body: IStoreServiceTypeUpdate): Observable<any> {
        const endpoint = `${this.STORE_SERVICE_TYPE}/${serviceTypeId}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    public postStoreServiceType(body: IStoreServiceTypeRegister): Observable<any> {
        return this.generic.genericPost<any>(this.STORE_SERVICE_TYPE, body)
            .pipe(take(1));
    }

    public getLocalByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<IStore[]> {
        const endpoint = `${this.STORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.generic.genericGet<IStore[]>(endpoint)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalGroupByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<ILocalGroup[]> {
        const httpParams = new HttpParams()
            .set('filter', String('GROUP'));

        const endpoint = `${this.STORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.generic.genericGet<ILocalGroup[]>(endpoint, httpParams)
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
        return this.generic.genericGet<IServiceType>(endpoint, httpParams)
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
        return this.generic.genericGet<IServiceType>(endpoint, httpParams)
            .pipe(
                take(1),
                map(response => {
                    return isObject(response) ? response : response;
                }));
    }
}
