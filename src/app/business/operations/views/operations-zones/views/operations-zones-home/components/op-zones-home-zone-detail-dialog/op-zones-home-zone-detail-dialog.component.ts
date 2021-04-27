import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CDeliveryServiceTypeName, CDeliveryTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { CZoneLabelColor } from '../../../../models/operations-zones-label.model';
import { MatTableDataSource } from '@angular/material/table';
import { ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import { MatSort } from '@angular/material/sort';
import { CZoneTypeName } from '../../../../parameters/operations-zones-type.parameter';

@Component({
    selector: 'app-op-zones-home-zone-detail-dialog',
    templateUrl: './op-zones-home-zone-detail-dialog.component.html',
    styleUrls: ['./op-zones-home-zone-detail-dialog.component.sass']
})
export class OpZonesHomeZoneDetailDialogComponent implements OnInit {

    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    public serviceTypeName = CDeliveryServiceTypeName;
    public labelColor = CZoneLabelColor;
    public tagAppearance = ETagAppearance;
    public zoneTypeName = CZoneTypeName;
    public deliveryTypeName = CDeliveryTypeName;

    public displayedColumns: string[] = ['zoneChannel', 'zoneServiceTypeList'];
    public dataSource = new MatTableDataSource<{zoneChannel: string, zoneServiceTypeList: string}>([]);
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Input() zoneDetail: ZoneDetail;

    constructor() {
    }

    ngOnInit(): void {
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

}
