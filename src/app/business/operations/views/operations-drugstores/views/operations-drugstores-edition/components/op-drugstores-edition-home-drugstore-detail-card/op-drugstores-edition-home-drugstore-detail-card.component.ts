import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-op-drugstores-edition-home-drugstore-detail-card',
  templateUrl: './op-drugstores-edition-home-drugstore-detail-card.component.html',
  styleUrls: ['./op-drugstores-edition-home-drugstore-detail-card.component.sass']
})
export class OpDrugstoresEditionHomeDrugstoreDetailCardComponent {

  public stateTag = CStateTag;
  public stateName = CStateName;
  public companyName = CCompanyName;
  public channelName = CChannelName;
  public tagAppearance = ETagAppearance;

  @Input() storeDetail: DrugstoreDetail;
  @Output() edit = new EventEmitter();

  get startAndEndHour() {
    const startHour = DatesHelper.date(this.storeDetail.startHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    const endHour = DatesHelper.date(this.storeDetail.endHour, DATES_FORMAT.millisecond)
      .format(DATES_FORMAT.hourMinuteDateTime);
    return `De ${startHour} a ${endHour}`;
  }

  get storeEditionPath() {
    return ROUTER_PATH.opZones_ZoneEdition();
  }

  constructor() { }

  editEvent(): void {
    this.edit.emit();
  }

}
