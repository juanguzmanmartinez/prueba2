import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

@Component({
    selector: 'app-op-zones-edition-service-type-detail-card',
    templateUrl: './op-zones-edition-service-type-detail-card.component.html',
    styleUrls: ['./op-zones-edition-service-type-detail-card.component.sass']
})
export class OpZonesEditionServiceTypeDetailCardComponent implements OnInit {

    @Input() zoneDetail: ZoneDetail;

    constructor() {
    }

    ngOnInit(): void {
    }

    public get serviceTypeDateRange() {
        const startHour = DatesHelper.date(this.zoneDetail.assignedStore.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinute24Hours);
        const endHour = DatesHelper.date(this.zoneDetail.assignedStore.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinute24Hours);
        return `${startHour} - ${endHour}`;
    }

}
