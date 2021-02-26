import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../modals/operation-zones-responses.modal';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company-code/company-code.model';
import { CDeliveryServiceTypeName } from '@models/capacities/capacities-service-type.model';

@Component({
    selector: 'app-op-zones-home-zone-detail-dialog',
    templateUrl: './op-zones-home-zone-detail-dialog.component.html',
    styleUrls: ['./op-zones-home-zone-detail-dialog.component.sass']
})
export class OpZonesHomeZoneDetailDialogComponent implements OnInit {

    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public serviceTypeName = CDeliveryServiceTypeName;

    @Input() zoneDetail: ZoneDetail;

    constructor() {
    }

    ngOnInit(): void {
    }

}
