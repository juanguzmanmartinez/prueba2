import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreServiceTypeRegistered } from '../../../../models/operations-stores-service-type';
import { CStateValue } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

@Component({
    selector: 'app-op-stores-edition-home-service-type-card',
    templateUrl: './op-stores-edition-home-service-type-card.component.html',
    styleUrls: ['./op-stores-edition-home-service-type-card.component.sass']
})
export class OpStoresEditionHomeServiceTypeCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    private stateValue = CStateValue;

    @Input() serviceType: StoreServiceTypeRegistered;
    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.stateValue[this.serviceType.serviceType.state];
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

    editEvent() {
        this.edit.emit(this.serviceType.serviceType.code);
    }

    addEvent() {
        this.add.emit(this.serviceType.serviceType.code);
    }

}
