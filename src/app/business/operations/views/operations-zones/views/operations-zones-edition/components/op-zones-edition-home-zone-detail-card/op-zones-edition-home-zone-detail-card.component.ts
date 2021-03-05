import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { CZoneLabelColor } from '../../../../models/operations-zones-label.model';

@Component({
    selector: 'app-op-zones-edition-home-zone-detail-card',
    templateUrl: './op-zones-edition-home-zone-detail-card.component.html',
    styleUrls: ['./op-zones-edition-home-zone-detail-card.component.sass']
})
export class OpZonesEditionHomeZoneDetailCardComponent implements OnInit {
    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    public labelColor = CZoneLabelColor;
    public tagAppearance = ETagAppearance;


    @Input() zoneDetail: ZoneDetail;
    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }


    editEvent() {
        this.edit.emit();
    }
}
