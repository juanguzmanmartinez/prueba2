import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { GenericService } from '../generic/generic.service';
import { Observable } from 'rxjs';
import { EChannel } from '@models/channel/channel.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import {
    IDrugstore,
    IDrugstoreDetail,
    IDrugstoreDetailUpdate,
    IDrugstoreGroup,
    IDrugstoreParams,
    IDrugstoreServiceTypeRegister,
    IDrugstoreServiceTypeUpdate,
    IServiceType
} from '@interfaces/drugstores/drugstores.interface';


@Injectable()
export class DrugstoresClientService {

    private readonly DRUGSTORE_LIST = EndpointsParameter.DRUGSTORE_LIST;
    private readonly DRUGSTORE_SERVICE_TYPE = EndpointsParameter.DRUGSTORE_SERVICE_TYPE;
    private readonly DRUGSTORE_BY_SERVICE_TYPE = EndpointsParameter.DRUGSTORE_BY_SERVICE_TYPE;
    private readonly TYPE_SERVICE_ENDPOINT = EndpointsParameter.CALENDAR_SERVICE_TYPE;

    constructor(
        private generic: GenericService,
    ) {
    }

    public getDrugstoreList(): Observable<IDrugstore[]> {
        return this.generic.genericGet<IDrugstore[]>(this.DRUGSTORE_LIST)
            .pipe(
                take(1),
                map((response: IDrugstore[]) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getStoreDetail(storeCode: string): Observable<IDrugstoreDetail> {
        return this.getDrugstoreList()
            .pipe(
                take(1),
                map((iStoreList: IDrugstoreDetail[]) => {
                    const findStoreDetail = iStoreList.find((store) => store.localCode === storeCode);
                    if (!findStoreDetail) {
                        throw new Error('Store not found');
                    }
                    return findStoreDetail;
                }),
                map((response: IDrugstoreDetail) => {
                    return isObject(response) ? response : null;
                }));
    }

    public putStoreDetail(storeCode: string, body: IDrugstoreDetailUpdate): Observable<any> {
        const endpoint = `${this.DRUGSTORE_LIST}/${storeCode}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }


    public putZoneServiceType(serviceTypeId: string, body: IDrugstoreServiceTypeUpdate): Observable<any> {
        const endpoint = `${this.DRUGSTORE_SERVICE_TYPE}/${serviceTypeId}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    public postStoreServiceType(body: IDrugstoreServiceTypeRegister): Observable<any> {
        return this.generic.genericPost<any>(this.DRUGSTORE_SERVICE_TYPE, body)
            .pipe(take(1));
    }

    public getLocalByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<IDrugstore[]> {
        const endpoint = `${this.DRUGSTORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.generic.genericGet<IDrugstore[]>(endpoint)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalGroupByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<IDrugstoreGroup[]> {
        const httpParams = new HttpParams()
            .set('filter', String('GROUP'));

        const endpoint = `${this.DRUGSTORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.generic.genericGet<IDrugstoreGroup[]>(endpoint, httpParams)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getTypeOperationClient$(iLocalParams: IDrugstoreParams): Observable<IServiceType> {
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

    public getTypeOperationGroupClient$(iLocalParams: IDrugstoreParams): Observable<IServiceType> {
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
