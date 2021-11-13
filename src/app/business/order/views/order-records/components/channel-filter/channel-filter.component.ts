import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss']
})
export class ChannelFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<string[]>();

  list = [
    { code: 'CALL', name: 'Call Center'},
    { code: 'DIGITAL', name: 'Digital'}
  ];
  channels = ['CALL', 'DIGITAL'];
  valueSelect: string;

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(channels: string[]): void {
    if (channels.length === 1) {
      this.valueSelect = this.getChannelName(channels[0]);
    } else if (channels.length === 2) {
      this.valueSelect = `${this.getChannelName(channels[0])}, ${this.getChannelName(channels[1])}`;
    } else if (channels.length > 2) {
      this.valueSelect = `${this.getChannelName(channels[0])}, ${this.getChannelName(channels[1])} (+${channels.length - 2} otros`;
    }
    console.log(channels);
    this.filter.emit(channels);
  }

  getChannelName(option: string): string {
    return this.list.find(channel => channel.code === option).name;
  }

}
