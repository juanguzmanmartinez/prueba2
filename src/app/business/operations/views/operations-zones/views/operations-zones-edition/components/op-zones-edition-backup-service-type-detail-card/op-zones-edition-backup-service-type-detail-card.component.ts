import { Component, Input } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceType } from '../../../../models/operations-zones-service-type.model';
import { minuteFormat } from '@helpers/date-name.helper';
import { CStateValue } from '@models/state/state.model';

@Component({
  selector: 'app-op-zones-edition-backup-service-type-detail-card',
  templateUrl: './op-zones-edition-backup-service-type-detail-card.component.html',
  styleUrls: ['./op-zones-edition-backup-service-type-detail-card.component.sass']
})
export class OpZonesEditionBackupServiceTypeDetailCardComponent {

  public serviceTypeName = CDeliveryServiceTypeName;

  @Input() zoneDetail: ZoneDetail;
  @Input() zoneBackupDetail: ZoneDetail;
  @Input() zoneBackupServiceType: ZoneBackupServiceType;

  get segmentName(): string {
    return this.serviceTypeName[this.zoneBackupServiceType.code];
  }

  get segmentState(): boolean {
    return CStateValue[this.zoneBackupServiceType.state];
  }

  get startAndEndHour(): string {
    const startHour = DatesHelper.date(this.zoneBackupServiceType.startHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    const endHour = DatesHelper.date(this.zoneBackupServiceType.endHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    return `${startHour} - ${endHour}`;
  }

  get segmentGap(): string {
    return minuteFormat(this.zoneBackupServiceType.segmentGap);
  }

  constructor() { }

}
