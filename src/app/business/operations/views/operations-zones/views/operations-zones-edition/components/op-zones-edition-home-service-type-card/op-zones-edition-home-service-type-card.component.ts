import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneServiceType } from '../../../../models/operations-zones.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';

@Component({
    selector: 'app-op-zones-edition-home-service-type-card',
    templateUrl: './op-zones-edition-home-service-type-card.component.html',
    styleUrls: ['./op-zones-edition-home-service-type-card.component.sass']
})
export class OpZonesEditionHomeServiceTypeCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    private stateValue = CStateValue;

    @Input() serviceType: ZoneServiceType;
    @Output() edit = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.stateValue[this.serviceType.state];
    }

    get segmentName() {
        return this.serviceTypeName[this.serviceType.code];
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.serviceType.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.serviceType.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `${startHour} - ${endHour}`;
    }

    get segmentGap() {
        const plural = this.serviceType.segmentGap > 1;
        return `${this.serviceType.segmentGap} minuto${plural ? 's' : ''}`;
    }

    editEvent() {
        this.edit.emit(this.serviceType.code);
    }
}
