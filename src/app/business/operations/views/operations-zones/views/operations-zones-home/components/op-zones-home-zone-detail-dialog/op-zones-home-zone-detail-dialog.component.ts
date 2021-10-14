import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Zone, ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateTag, CStateValue } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CDeliveryServiceTypeName, CDeliveryTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { CZoneLabelColor } from '../../../../models/operations-zones-label.model';
import { MatTableDataSource } from '@angular/material/table';
import { ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import { MatSort } from '@angular/material/sort';
import { CZoneTypeName } from '../../../../parameters/operations-zones-type.parameter';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-op-zones-home-zone-detail-dialog',
    templateUrl: './op-zones-home-zone-detail-dialog.component.html',
    styleUrls: ['./op-zones-home-zone-detail-dialog.component.sass']
})
export class OpZonesHomeZoneDetailDialogComponent implements OnInit {

    public stateTag = CStateTag;
    public stateName = CStateName;
    private stateValue = CStateValue;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    public serviceTypeName = CDeliveryServiceTypeName;
    public labelColor = CZoneLabelColor;
    public tagAppearance = ETagAppearance;
    public zoneTypeName = CZoneTypeName;
    public deliveryTypeName = CDeliveryTypeName;

    public zoneDetailLoader = true;
    public zoneDetail: ZoneDetail;
    public errorResponse: HttpErrorResponse;

    public displayedColumns: string[] = ['zoneChannel', 'zoneServiceTypeList'];
    public dataSource = new MatTableDataSource<{ zoneChannel: string, zoneServiceTypeList: string }>([]);
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Input() zone: Zone;

    constructor(
        private _operationsZonesImplement: OperationsZonesImplementService,
    ) {
    }

    ngOnInit(): void {
        this.getZoneDetail(this.zone.id);
    }

    getZoneDetail(zoneCode: string): void {
        this._operationsZonesImplement.getZoneDetail(zoneCode)
            .subscribe((zoneDetail: ZoneDetail) => {
                this.zoneDetail = zoneDetail;
                this.settingDataSource();
            }, (error) => {
                this.zoneDetail = null;
                this.errorResponse = error;
            }, () => {
                this.zoneDetailLoader = false;
            });
    }

    settingDataSource() {
        this.dataSource.data = this.zoneDetail.channelList
            .map((zoneChannel) => {
                const serviceTypeList = this.zoneDetail.serviceTypeList
                    .filter((serviceType: ZoneServiceType) => serviceType.channel === zoneChannel)
                    .map((serviceType: ZoneServiceType) => this.serviceTypeName[serviceType.code])
                    .join(' - ');
                return {
                    zoneChannel: this.channelName[zoneChannel],
                    zoneServiceTypeList: serviceTypeList
                };
            });
        this.dataSource.sort = this.sort;
    }


    get zoneEditionZoneBackup() {
        return !this.zoneDetail?.zoneBackup ?
            'Sin zona backup' : this.stateValue[this.zoneDetail.zoneBackup.state] ?
                `${this.zoneDetail.zoneBackup.name} - ${this.zoneDetail.zoneBackup.code}` :
                this.stateName[this.zoneDetail.zoneBackup.state]();
    }

    get zoneEditionDrugstoreBackup() {
        return !this.zoneDetail?.zoneBackup ?
            'Sin local backup' : this.stateValue[this.zoneDetail.zoneBackup.state] ?
                `${this.zoneDetail.zoneBackup.assignedStoreCode} - ${this.zoneDetail.zoneBackup.assignedStoreName}` :
                this.stateName[this.zoneDetail.zoneBackup.state]();
    }

}
