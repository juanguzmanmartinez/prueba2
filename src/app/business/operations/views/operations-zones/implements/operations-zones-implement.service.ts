import { Injectable } from '@angular/core';
import { ZonesClientService } from '@clients/zones/zones-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IZone, IZoneDetail, IZoneDetailUpdate } from '@interfaces/zones/zones.interface';
import { Zone, ZoneDetail } from '../models/operations-zones.model';
import { StoresClientService } from '@clients/stores/stores-client.service';
import { ZonesStore } from '../models/operations-zones-store.model';
import { IStore } from '@interfaces/stores/stores.interface';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EZoneLabel } from '../models/operations-zones-label.model';

@Injectable()
export class OperationsZonesImplementService {
    constructor(
        private zonesClient: ZonesClientService,
        private storesClient: StoresClientService,
    ) {
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

    putZoneDetail(zoneId: string, body: IZoneDetailUpdate) {
        return this.zonesClient.putZoneDetail(zoneId, body);
    }

    get storeList() {
        return this.storesClient.getStoreList()
            .pipe(
                map((storeList: Array<IStore>) => {
                    return storeList ? storeList.map(store => new ZonesStore(store)) : [];
                }));
    }

    get channelList(): Observable<Array<EChannel>> {
        return this.zonesClient.getZoneChannelList();
    }

    get companyList(): Observable<ECompany[]> {
        return this.zonesClient.getCompanyList();
    }

    get labelList(): Observable<EZoneLabel[]> {
        return this.zonesClient.getZoneLabelList();
    }
}
