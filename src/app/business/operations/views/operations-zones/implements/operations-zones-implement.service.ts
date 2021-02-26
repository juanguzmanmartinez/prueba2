import { Injectable } from '@angular/core';
import { ZonesClientService } from '@clients/zones/zones-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IZone, IZoneDetail } from '@interfaces/zones/zone.interface';
import { Zone, ZoneDetail } from '../modals/operation-zones-responses.modal';

@Injectable()
export class OperationsZonesImplementService {
    constructor(private zonesClient: ZonesClientService) {
    }

    get zoneList(): Observable<Array<Zone>> {
        return this.zonesClient.getZoneList()
            .pipe(
                map((iZoneList: Array<IZone>) => {
                    return iZoneList.map((iZone: IZone) => new Zone(iZone));
                })
            );
    }

    getZoneDetail(zoneId: string): Observable<ZoneDetail> {
        return this.zonesClient.getZoneDetail(zoneId)
            .pipe(
                map((iZoneDetail: IZoneDetail) => {
                    return new ZoneDetail(iZoneDetail);
                })
            );
    }
}
