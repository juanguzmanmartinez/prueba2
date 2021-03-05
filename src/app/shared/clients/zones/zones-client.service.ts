import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take } from 'rxjs/operators';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { Observable, of } from 'rxjs';
import { IZone, IZoneDetail, IZoneDetailUpdate, IZoneServiceTypeUpdate, IZoneServiceTypRegister } from '@interfaces/zones/zones.interface';
import { EChannel } from '@models/channel/channel.model';
import { CompanyList, ECompany } from '@models/company/company.model';
import { EZoneLabel, ZoneLabelList } from '../../../business/operations/views/operations-zones/models/operations-zones-label.model';

@Injectable()
export class ZonesClientService {
    private readonly ZONES = EndpointsParameter.GET_ZONES;
    private readonly ZONES_CHANNEL = EndpointsParameter.GET_ZONES_CHANNEL;
    private readonly ZONES_SERVICE_TYPE = EndpointsParameter.ZONES_SERVICE_TYPE;

    constructor(private generic: GenericService) {
    }

    getZoneList(): Observable<Array<IZone>> {
        return this.generic.genericGet<Array<IZone>>(this.ZONES)
            .pipe(
                take(1),
                map((response: Array<IZone>) => {
                    return isArray(response) ? response : [];
                }));

    }

    getZoneDetail(zoneId: string): Observable<IZoneDetail> {
        const endpoint = `${this.ZONES}/${zoneId}`;
        return this.generic.genericGet<IZoneDetail>(endpoint)
            .pipe(
                take(1),
                map((response: IZoneDetail) => {
                    return isObject(response) ? response : null;
                }));
    }

    putZoneDetail(zoneId: string, body: IZoneDetailUpdate): Observable<any> {
        const endpoint = `${this.ZONES}/${zoneId}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    putZoneServiceType(serviceTypeId: string, body: IZoneServiceTypeUpdate): Observable<any> {
        const endpoint = `${this.ZONES_SERVICE_TYPE}/${serviceTypeId}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    postZoneServiceType(body: IZoneServiceTypRegister): Observable<any> {
        return this.generic.genericPost<any>(this.ZONES_SERVICE_TYPE, body)
            .pipe(take(1));
    }

    getZoneChannelList(): Observable<Array<EChannel>> {
        return this.generic.genericGet<Array<EChannel>>(this.ZONES_CHANNEL)
            .pipe(
                take(1),
                map((response: Array<EChannel>) => {
                    return isArray(response) ? response : [];
                }));
    }

    getCompanyList(): Observable<ECompany[]> {
        return of(CompanyList);
    }

    getZoneLabelList(): Observable<EZoneLabel[]> {
        return of(ZoneLabelList);
    }
}
