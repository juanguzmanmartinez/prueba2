import { Component, Input, OnInit } from '@angular/core';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { CChannelName } from '@models/channel/channel.model';

@Component({
  selector: 'app-op-stores-edition-store-detail-card',
  templateUrl: './op-stores-edition-store-detail-card.component.html',
  styleUrls: ['./op-stores-edition-store-detail-card.component.sass']
})
export class OpStoresEditionStoreDetailCardComponent implements OnInit {
  public channelName = CChannelName;

  @Input() storeDetail: StoreDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
