import { Component, Input } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZonesDrugstoreServiceType } from '../../../../models/operations-zones-store.model';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';

@Component({
  selector: 'app-op-zones-edition-service-type-detail-card',
  templateUrl: './op-zones-edition-service-type-detail-card.component.html',
  styleUrls: ['./op-zones-edition-service-type-detail-card.component.sass']
})
export class OpZonesEditionServiceTypeDetailCardComponent {

  public serviceTypeName = CDeliveryServiceTypeName;

  @Input() zoneDetail: ZoneDetail;
  @Input() zonesStoreServiceType: ZonesDrugstoreServiceType;

  public get serviceTypeDateRange(): string {
    const startHour = DatesHelper.date(this.zonesStoreServiceType.startHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    const endHour = DatesHelper.date(this.zonesStoreServiceType.endHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    return `${startHour} - ${endHour}`;
  }

  constructor() { }

}
