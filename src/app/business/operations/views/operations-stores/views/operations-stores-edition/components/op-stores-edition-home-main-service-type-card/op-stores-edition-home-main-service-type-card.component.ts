import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreServiceTypeRegistered } from '../../../../models/operations-stores-service-type.model';
import { CStateValue } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CPaymentMethodName } from '@models/payment-method/payment-method.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-op-stores-edition-home-main-service-type-card',
    templateUrl: './op-stores-edition-home-main-service-type-card.component.html',
    styleUrls: ['./op-stores-edition-home-main-service-type-card.component.sass']
})
export class OpStoresEditionHomeMainServiceTypeCardComponent implements OnInit {
    private paymentMethodName = CPaymentMethodName;
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
        return !this.serviceType.serviceType || !this.stateValue[this.serviceType.serviceType.state];
    }

    get segmentName() {
        return this.serviceTypeName[this.serviceType.code];
    }

    get startAndEndHour() {
        if (this.serviceType.serviceType) {
            const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            return `${startHour} - ${endHour}`;
        }
        return 'No habilitado';
    }

    get paymentMethod() {
        if (this.serviceType.serviceType) {
            return this.serviceType.serviceType.paymentMethodList
                .map((paymentMethod) => this.paymentMethodName[paymentMethod])
                .join(' - ');
        }
        return 'No habilitado';
    }

    get serviceTypePath() {
        return ROUTER_PATH.opStores_StoreServiceTypeEdition();
    }

    editEvent() {
        this.edit.emit(this.serviceType.code);
    }

    addEvent() {
        this.add.emit(this.serviceType.code);
    }

}
