import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceTypeRegistered } from '../../../../models/operations-zones-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName } from '@models/state/state.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { minuteFormat } from '@helpers/date-name.helper';

@Component({
  selector: 'app-op-zones-edition-home-backup-service-type-card',
  templateUrl: './op-zones-edition-home-backup-service-type-card.component.html',
  styleUrls: ['./op-zones-edition-home-backup-service-type-card.component.sass']
})
export class OpZonesEditionHomeBackupServiceTypeCardComponent {

  private serviceTypeName = CDeliveryServiceTypeName;
  private stateName = CStateName;

  @Input() zoneBackupDetail: ZoneDetail;
  @Input() serviceType: ZoneBackupServiceTypeRegistered;
  @Input() disabled: boolean;

  @Output() edit = new EventEmitter<EDeliveryServiceType>();
  @Output() add = new EventEmitter<EDeliveryServiceType>();

  get serviceTypeDisabled(): boolean {
    return !this.zoneBackupDetail || !this.serviceType.serviceType || this.disabled;
  }

  get segmentName(): string {
    return this.serviceTypeName[this.serviceType.code];
  }

  get startAndEndHour(): string {
    if (!this.serviceTypeDisabled) {
      const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteDateTime);
      const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteDateTime);
      return `${startHour} - ${endHour}`;
    }
    return 'No habilitado';
  }

  get segmentGap(): string {
    if (!this.serviceTypeDisabled) {
      return minuteFormat(this.serviceType.serviceType.segmentGap);
    }
    return 'No habilitado';
  }

  get forceServiceType(): string {
    if (!this.serviceTypeDisabled) {
      return this.stateName[this.serviceType.serviceType.forceService]();
    }
    return 'No habilitado';
  }

  get serviceTypePath(): string {
    let serviceTypePath;
    switch (this.serviceType.code) {
      case EDeliveryServiceType.amPm:
        serviceTypePath = ROUTER_PATH.opZones_ZoneBackupAmPmEdition();
        break;
      case EDeliveryServiceType.scheduled:
        serviceTypePath = ROUTER_PATH.opZones_ZoneBackupScheduledEdition();
        break;
    }
    return serviceTypePath;
  }

  constructor() { }

  editEvent(): void {
    this.edit.emit(this.serviceType.code);
  }

  addEvent(): void {
    this.add.emit(this.serviceType.code);
  }
}
