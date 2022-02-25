import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { ChannelFilterEvent } from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss'],
})
export class ChannelFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<ChannelFilterEvent>();

  list = [
    {code: 'CALL', name: 'Call Center'},
    {code: 'DIGITAL', name: 'Digital'},
  ];
  channels = ['CALL', 'DIGITAL'];
  valueSelect: string;
  selectedChannels: string[];

  constructor(
    private orderFilterStore: OrderFilterStore
  ) {
  }

  ngOnInit(): void {
    const {channelOfBuy} = this.orderFilterStore.getOrderFilter();
    this.selectedChannels = channelOfBuy ?? [];
  }

  selectionChange(channels: string[]): void {
    if (channels.length === 1) {
      this.valueSelect = this.getChannelName(channels[0]);
    } else if (channels.length === 2) {
      this.valueSelect = `${this.getChannelName(
        channels[0]
      )}, ${this.getChannelName(channels[1])}`;
    }
    this.filter.emit({channels, notFound: this.getChannelsName(channels)});
  }

  getChannelName(option: string): string {
    return this.list.find((channel) => channel.code === option).name;
  }

  private getChannelsName(channels: string[]): string {
    const channelsWithName = channels.map((value) => {
      return this.getChannelName(value);
    });
    return channelsWithName.toString();
  }
}
