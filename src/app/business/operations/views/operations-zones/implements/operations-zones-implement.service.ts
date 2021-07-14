import { Injectable } from '@angular/core';
import { ZonesClientService } from '@clients/zones/zones-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IZone, IZoneBackupUpdate, IZoneDetail, IZoneDetailUpdate, IZoneServiceTypeRegister, IZoneServiceTypeUpdate } from '@interfaces/zones/zones.interface';
import { Zone, ZoneDetail } from '../models/operations-zones.model';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { ZonesDrugstore } from '../models/operations-zones-store.model';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EZoneLabel } from '../models/operations-zones-label.model';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { EZoneType } from '../parameters/operations-zones-type.parameter';

@Injectable()
export class OperationsZonesImplementService {
    constructor(
        private zonesClient: ZonesClientService,
        private storesClient: DrugstoresClientService,
        private resourceClient: ResourceClientService,
    ) {
    }

    get zoneList(): Observable<Zone[]> {
        return this.zonesClient.getZoneList()
            .pipe(
                map((iZoneList: IZone[]) => {
                    return iZoneList.map((iZone: IZone) => new Zone(iZone));
                })
            );
    }

    getZoneDetail(zoneCode: string): Observable<ZoneDetail> {
        return this.zonesClient.getZoneDetail(zoneCode)
            .pipe(
                map((iZoneDetail: IZoneDetail) => {
                    return new ZoneDetail(iZoneDetail);
                })
            );
    }

    get storeList() {
        return this.storesClient.getDrugstoreList()
            .pipe(
                map((drugstoreList: IDrugstore[]) => {
                    return drugstoreList ? drugstoreList.map(drugstore => new ZonesDrugstore(drugstore)) : [];
                }));
    }

    get channelList(): Observable<EChannel[]> {
        return this.zonesClient.getZoneChannelList();
    }

    get companyList(): Observable<ECompany[]> {
        return this.resourceClient.getCompanyList();
    }

    get labelList(): Observable<EZoneLabel[]> {
        return this.zonesClient.getZoneLabelList();
    }

    get zoneTypeList(): Observable<EZoneType[]> {
        return this.zonesClient.getZoneTypeList();
    }

    putZoneDetail(zoneCode: string, body: IZoneDetailUpdate) {
        return this.zonesClient.putZoneDetail(zoneCode, body);
    }

    putZoneBackup(zoneCode: string, body: IZoneBackupUpdate){
        return this.zonesClient.putZoneBackup(zoneCode, body);
    }

    putZoneServiceType(serviceTypeId: string, zoneServiceTypeUpdate: IZoneServiceTypeUpdate) {
        return this.zonesClient.putZoneServiceType(serviceTypeId, zoneServiceTypeUpdate);
    }

    postZoneServiceType(zoneServiceTypRegister: IZoneServiceTypeRegister) {
        return this.zonesClient.postZoneServiceType(zoneServiceTypRegister);
    }
}
