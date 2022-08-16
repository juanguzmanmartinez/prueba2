import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CDeliveryServiceTypeName,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import {
  ZoneServiceType,
  ZoneServiceTypeRegistered,
} from '../../../../models/operations-zones-service-type.model';
import { CChannelColor, CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { minuteFormat } from '@helpers/date-name.helper';
import {
  CCompanyColor,
  CCompanyIcon,
  CCompanyName,
  ECompany,
} from '@models/company/company.model';

@Component({
  selector: 'app-op-zones-edition-home-main-service-type-card',
  templateUrl: './op-zones-edition-home-main-service-type-card.component.html',
  styleUrls: ['./op-zones-edition-home-main-service-type-card.component.sass'],
})
export class OpZonesEditionHomeMainServiceTypeCardComponent {
  private serviceTypeName = CDeliveryServiceTypeName;
  private stateValue = CStateValue;
  private channelName = CChannelName;
  private channelColor = CChannelColor;
  private companyName = CCompanyName;
  private companyColor = CCompanyColor;

  public companyIcon = CCompanyIcon;
  public tagAppearance = ETagAppearance;

  @Input() serviceType: ZoneServiceTypeRegistered;
  @Input() service: ZoneServiceType;
  @Input() company: ECompany;
  @Output() edit = new EventEmitter<ZoneServiceType>();
  @Output() add = new EventEmitter<EDeliveryServiceType>();

  get serviceTypeDisabled(): boolean {
    // return (
    //   !this.serviceType.serviceType ||
    //   !this.stateValue[this.serviceType.serviceType.state]
    // );

    return (!this.serviceType.serviceType || !this.serviceType.available);
  }

  // get serviceTypeDisabled(): boolean {
  //   return !this.service || !this.stateValue[this.service.state];
  // }

  get segmentName(): string {
    return this.serviceTypeName[this.serviceType.code];
  }
  // get segmentName(): string {
  //   return this.serviceTypeName[this.service.code];
  // }

  get segmentChannelName(): string {
    return this.channelName[this.serviceType.channel];
  }
  // get segmentChannelName(): string {
  //   return this.channelName[this.service.channel];
  // }

  get segmentChannelColor(): string {
    return this.serviceTypeDisabled
      ? 'gray-3'
      : this.channelColor[this.serviceType.channel];
  }
  // get segmentChannelColor(): string {
  //   return this.serviceTypeDisabled
  //     ? 'gray-3'
  //     : this.channelColor[this.service.channel];
  // }

  // get segmentCompanyName(): string {
  //   return this.companyName[this.service.companyCode];
  // }

  // get segmentCompanyIcon(): string {
  //   return this.companyIcon[this.service.companyCode];
  // }

  get segmentCompanyName(): string {
    return this.companyName[this.company];
  }

  get segmentCompanyIcon(): string {
    return this.companyIcon[this.company];
  }

  // get segmentCompanyColor(): string {
  //   return this.serviceTypeDisabled
  //     ? 'gray-3'
  //     : this.companyColor[this.service.companyCode];
  // }
  get segmentCompanyColor(): string {
    return this.serviceTypeDisabled
      ? 'gray-3'
      : this.companyColor[this.company];
  }

  // get startAndEndHour(): string {
  //   if (this.service) {
  //     const startHour = DatesHelper.date(
  //       this.service.startHour,
  //       DATES_FORMAT.millisecond
  //     ).format(DATES_FORMAT.hourMinuteDateTime);
  //     const endHour = DatesHelper.date(
  //       this.service.endHour,
  //       DATES_FORMAT.millisecond
  //     ).format(DATES_FORMAT.hourMinuteDateTime);
  //     return `${startHour} - ${endHour}`;
  //   }
  //   return 'No habilitado';
  // }

  get startAndEndHour(): string {
    if (this.serviceType.serviceType) {
      const startHour = DatesHelper.date(
        this.serviceType.serviceType.startHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteDateTime);
      const endHour = DatesHelper.date(
        this.serviceType.serviceType.endHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteDateTime);
      return `${startHour} - ${endHour}`;
    }
    return 'No habilitado';
  }

  // get segmentGap(): string {
  //   if (this.service) {
  //     return minuteFormat(this.service.segmentGap);
  //   }
  //   return 'No habilitado';
  // }
  get segmentGap(): string {
    if (this.serviceType.serviceType) {
      return minuteFormat(this.serviceType.serviceType.segmentGap);
    }
    return 'No habilitado';
  }

  get serviceTypePath(): string {
    this.serviceType.company = this.company;
    return ROUTER_PATH.opZones_ZoneServiceTypeEdition();
  }
  // get serviceTypePath(): string {
  //   // this.serviceType.company = this.company;
  //   return ROUTER_PATH.opZones_ZoneServiceTypeEdition();
  // }

  // get isAvailable(): boolean {
  //   return CStateValue[this.service.state];
  // }
  get isAvailable(): boolean {
    return CStateValue[this.serviceType.serviceType.state];
  }

  // get flagServiceType() {
  //   return this.service.flagServiceType;
  // }
  get flagServiceType() {
    return this.serviceType.serviceType.flagServiceType;
  }

  // get textFlagServiceType() {
  //   return this.service.flagServiceType === 'P'
  //     ? 'Precio personalizado'
  //     : 'Precio por defecto';
  // }
  get textFlagServiceType() {
    return this.serviceType.serviceType.flagServiceType === 'P'
      ? 'Precio personalizado'
      : 'Precio por defecto';
  }

  // get priceServideType(): string {
  //   return this.service.serviceCost.toFixed(2);
  // }
  get priceServideType(): string {
    if (!this.serviceTypeDisabled) {
      return `S/ ${this.serviceType?.serviceType?.serviceCost?.toFixed(2)}`;
    }
    return 'No habilitado';
  }

  constructor() {}

  // editEvent(): void {
  //   this.edit.emit(this.service);
  // }

  // addEvent(): void {
  //   this.add.emit(this.service.code);
  // }

  editEvent(): void {
    this.edit.emit(this.serviceType.serviceType);
  }

  addEvent(): void {
    this.add.emit(this.serviceType.code);
  }
}
