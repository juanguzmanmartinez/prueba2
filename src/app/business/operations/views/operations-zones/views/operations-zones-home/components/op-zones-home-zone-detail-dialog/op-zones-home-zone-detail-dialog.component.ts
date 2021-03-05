import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { CZoneLabelColor } from '../../../../models/operations-zones-label.model';

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

    @Input() zoneDetail: ZoneDetail;

    constructor() {
    }

    ngOnInit(): void {
    }

}
