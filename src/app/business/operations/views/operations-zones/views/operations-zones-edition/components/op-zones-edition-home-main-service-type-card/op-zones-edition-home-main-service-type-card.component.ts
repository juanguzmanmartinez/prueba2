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
import {
  CChannelColor,
  CChannelName,
  EChannel,
} from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { minuteFormat } from '@helpers/date-name.helper';
import {
  CCompanyColor,
  CCompanyIcon,
  CCompanyIconDisable,
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
  public companyIconDisable = CCompanyIconDisable;
  public tagAppearance = ETagAppearance;
 
  @Input() serviceType: ZoneServiceTypeRegistered;
  @Input() service: ZoneServiceType;
  @Input() company: ECompany;
  @Output() edit = new EventEmitter<ZoneServiceType>();
  @Output() add = new EventEmitter<ZoneServiceTypeRegistered>();

  get serviceTypeDisabled(): boolean {
    return !this.serviceType?.serviceType || !this.serviceType?.available;
  }

  get appearanceChannel(): string {
    return this.serviceType?.channel === EChannel.digital
      ? this.tagAppearance.coloredFullBluePill
      : this.tagAppearance.coloredFullPurplePill;
  }

  get channelInnerClass(): string {
    return this.serviceType?.channel === EChannel.digital
      ? 'py-3 px-2 border border-complementary-three'
      : 'py-3 px-2 border border-secondary';
  }

  get segmentName(): string {
    return this.serviceTypeName[this.serviceType?.code];
  }

  get segmentChannelName(): string {
    return this.channelName[this.serviceType?.channel];
  }

  get segmentChannelColor(): string {
    return this.serviceTypeDisabled
      ? 'gray-3'
      : this.channelColor[this.serviceType?.channel];
  }

  get segmentCompanyName(): string {
    return this.companyName[this.serviceType?.company];
  }

  get segmentCompanyIcon(): string {
    return !!this.serviceTypeDisabled
      ? this.companyIconDisable[this.serviceType?.company]
      : this.companyIcon[this.serviceType?.company];
  }

  get segmentCompanyColor(): string {
    return !!this.serviceTypeDisabled
      ? 'gray-50'
      : this.companyColor[this.serviceType?.company];
  }

  get startAndEndHour(): string {
    if (this.serviceType?.serviceType) {
      const startHour = DatesHelper.date(
        this.serviceType?.serviceType?.startHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteDateTime);
      const endHour = DatesHelper.date(
        this.serviceType?.serviceType?.endHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteDateTime);
      return `${startHour} - ${endHour}`;
    }
    return 'No habilitado';
  }

  get segmentGap(): string {
    if (this.serviceType?.serviceType) {
      return minuteFormat(this.serviceType?.serviceType?.segmentGap);
    }
    return 'No habilitado';
  }

  get serviceTypePath(): string {
    // this.serviceType.company = this.company;
    return ROUTER_PATH.opZones_ZoneServiceTypeEdition();
  }

  get isAvailable(): boolean {
    return CStateValue[this.serviceType?.serviceType?.state];
  }

  get flagServiceType() {
    return this.serviceType?.serviceType?.flagServiceType;
  }

  get textFlagServiceType() {
    return this.serviceType?.serviceType?.flagServiceType === 'P'
      ? 'Precio personalizado'
      : 'Precio por defecto';
  }

  get priceServideType(): string {
    if (!this.serviceTypeDisabled) {
      return `S/ ${this.serviceType?.serviceType?.serviceCost?.toFixed(2)}`;
    }
    return 'No habilitado';
  }

  get tooltipDescription(): string {
    return `Editar ${this.segmentName}`;
  }

  constructor() {}

  editEvent(): void {
    this.edit.emit(this.serviceType?.serviceType);
  }

  addEvent(): void {
    this.add.emit(this.serviceType);
  }
}
