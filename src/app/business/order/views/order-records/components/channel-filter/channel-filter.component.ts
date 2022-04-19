import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { ChannelFilterEvent } from '../../interfaces/order-records.interface';
import { OrderFormPresenter } from '../../order-form.presenter';

@Component({
  selector: 'app-channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss'],
})
export class ChannelFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<ChannelFilterEvent>();

  list = [
    { code: 'CALL', name: 'Call Center' },
    { code: 'DIGITAL', name: 'Digital' },
  ];
  channels = this.list.map((value) => value.code);
  selectedChannels: string[];

  constructor(
    private orderFilterStore: OrderFilterStore,
    public presenter: OrderFormPresenter
  ) {}

  ngOnInit(): void {
    const { channelOfBuy } = this.orderFilterStore.getOrderFilter();
    this.selectedChannels = channelOfBuy ?? [];
  }

  selectionChange(channels: string[]): void {
    this.selectedChannels = channels;
    this.orderFilterStore.setChannelOfBuy = channels;
  }

  clearValues(): void {
    this.selectionChange([]);
    this.presenter.filterForm.get('serviceChannel').reset();
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
