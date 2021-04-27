import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take } from 'rxjs/operators';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { Observable, of } from 'rxjs';
import { IZone, IZoneBackupUpdate, IZoneDetail, IZoneDetailUpdate, IZoneServiceTypeRegister, IZoneServiceTypeUpdate } from '@interfaces/zones/zones.interface';
import { EChannel } from '@models/channel/channel.model';
import { EZoneLabel, ZoneLabelList } from '../../../business/operations/views/operations-zones/models/operations-zones-label.model';

@Injectable()
export class ZonesClientService {

    private readonly ZONE_LIST = EndpointsParameter.GET_ZONES;
    private readonly ZONE_BACKUP = EndpointsParameter.ZONE_BACKUP;
    private readonly ZONE_CHANNEL = EndpointsParameter.GET_ZONES_CHANNEL;
    private readonly ZONE_SERVICE_TYPE = EndpointsParameter.ZONES_SERVICE_TYPE;

    constructor(
        private generic: GenericService
    ) {
    }

    getZoneList(): Observable<IZone[]> {
        return this.generic.genericGet<IZone[]>(this.ZONE_LIST)
            .pipe(
                take(1),
                map((response: IZone[]) => {
                    return isArray(response) ? response : [];
                }));

    }

    getZoneDetail(zoneCode: string): Observable<IZoneDetail> {
        const endpoint = `${this.ZONE_LIST}/${zoneCode}`;
        return this.generic.genericGet<IZoneDetail>(endpoint)
            .pipe(
                take(1),
                map((response: IZoneDetail) => {
                    return isObject(response) ? response : null;
                }));
    }

    putZoneDetail(zoneCode: string, body: IZoneDetailUpdate): Observable<any> {
        const endpoint = `${this.ZONE_LIST}/${zoneCode}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    putZoneBackup(zoneCode: string, body: IZoneBackupUpdate): Observable<any> {
        const endpoint = `${this.ZONE_BACKUP}/${zoneCode}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    putZoneServiceType(serviceTypeId: string, body: IZoneServiceTypeUpdate): Observable<any> {
        const endpoint = `${this.ZONE_SERVICE_TYPE}/${serviceTypeId}`;
        return this.generic.genericPut<any>(endpoint, body)
            .pipe(take(1));
    }

    postZoneServiceType(body: IZoneServiceTypeRegister): Observable<any> {
        return this.generic.genericPost<any>(this.ZONE_SERVICE_TYPE, body)
            .pipe(take(1));
    }

    getZoneChannelList(): Observable<EChannel[]> {
        return this.generic.genericGet<EChannel[]>(this.ZONE_CHANNEL)
            .pipe(
                take(1),
                map((response: EChannel[]) => {
                    return isArray(response) ? response : [];
                }));
    }

    getZoneLabelList(): Observable<EZoneLabel[]> {
        return of(ZoneLabelList);
    }
}
