import { Component, Input } from '@angular/core';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { CChannelName } from '@models/channel/channel.model';

@Component({
  selector: 'app-op-drugstores-edition-drugstore-detail-card',
  templateUrl: './op-drugstores-edition-drugstore-detail-card.component.html',
  styleUrls: ['./op-drugstores-edition-drugstore-detail-card.component.sass']
})
export class OpDrugstoresEditionDrugstoreDetailCardComponent {

  public channelName = CChannelName;

  @Input() drugstoreDetail: DrugstoreDetail;

  constructor() { }

}
