import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DrugstoreServiceTypeRegistered } from '../../../../models/operations-drugstores-service-type.model';
import { CStateValue } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CPaymentMethodName } from '@models/payment-method/payment-method.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-op-drugstores-edition-home-main-service-type-card',
  templateUrl: './op-drugstores-edition-home-main-service-type-card.component.html',
  styleUrls: ['./op-drugstores-edition-home-main-service-type-card.component.sass']
})
export class OpDrugstoresEditionHomeMainServiceTypeCardComponent {

  private paymentMethodName = CPaymentMethodName;
  private serviceTypeName = CDeliveryServiceTypeName;
  private stateValue = CStateValue;

  @Input() serviceType: DrugstoreServiceTypeRegistered;
  @Output() edit = new EventEmitter<EDeliveryServiceType>();
  @Output() add = new EventEmitter<EDeliveryServiceType>();

  get serviceTypeDisabled(): boolean {
    return !this.serviceType.serviceType || !this.stateValue[this.serviceType.serviceType.state];
  }

  get segmentName(): string {
    return this.serviceTypeName[this.serviceType.code];
  }

  get startAndEndHour(): string {
    if (this.serviceType.serviceType) {
      const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteDateTime);
      const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteDateTime);
      return `${startHour} - ${endHour}`;
    }
    return 'No habilitado';
  }

  get paymentMethod(): string {
    if (this.serviceType.serviceType) {
      return this.serviceType.serviceType.paymentMethodList
        .map((paymentMethod) => this.paymentMethodName[paymentMethod])
        .join(' - ');
    }
    return 'No habilitado';
  }

  get serviceTypePath(): string {
    return ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition();
  }

  constructor() { }

  editEvent(): void {
    this.edit.emit(this.serviceType.code);
  }

  addEvent(): void {
    this.add.emit(this.serviceType.code);
  }

}
