import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';

@Component({
    selector: 'app-op-zones-edition-zone-detail-card',
    templateUrl: './op-zones-edition-zone-detail-card.component.html',
    styleUrls: ['./op-zones-edition-zone-detail-card.component.sass']
})
export class OpZonesEditionZoneDetailCardComponent implements OnInit {

    @Input() zoneDetail: ZoneDetail;

    constructor() {
    }

    ngOnInit(): void {
    }

}
