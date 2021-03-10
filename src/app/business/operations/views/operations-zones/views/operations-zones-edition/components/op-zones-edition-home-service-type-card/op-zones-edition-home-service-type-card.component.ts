import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import { ZoneServiceTypeRegistered } from '../../../../models/operations-zones-service-type.model';

@Component({
    selector: 'app-op-zones-edition-home-service-type-card',
    templateUrl: './op-zones-edition-home-service-type-card.component.html',
    styleUrls: ['./op-zones-edition-home-service-type-card.component.sass']
})
export class OpZonesEditionHomeServiceTypeCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    private stateValue = CStateValue;

    @Input() serviceType: ZoneServiceTypeRegistered;
    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.stateValue[this.serviceType.serviceType.state] || !this.serviceType.available;
    }

    get segmentName() {
        return this.serviceTypeName[this.serviceType.serviceType.code];
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `${startHour} - ${endHour}`;
    }

    get segmentGap() {
        const plural = this.serviceType.serviceType.segmentGap > 1;
        return `${this.serviceType.serviceType.segmentGap} minuto${plural ? 's' : ''}`;
    }

    editEvent() {
        this.edit.emit(this.serviceType.serviceType.code);
    }
    addEvent() {
        this.add.emit(this.serviceType.serviceType.code);
    }
}
