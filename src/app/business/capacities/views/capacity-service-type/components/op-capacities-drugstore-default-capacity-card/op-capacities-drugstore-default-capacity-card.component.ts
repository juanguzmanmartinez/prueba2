import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CChannelColor, EChannel } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { DropOptionsComponent } from '@molecules/drop-options/drop-options.component';

@Component({
  selector: 'app-op-capacities-drugstore-default-capacity-card',
  templateUrl: './op-capacities-drugstore-default-capacity-card.component.html',
  styleUrls: ['./op-capacities-drugstore-default-capacity-card.component.scss'],
})
export class OpCapacitiesDrugstoreDefaultCapacityCardComponent {
  @Input() serviceName: string;
  @Input() capacityQuantity: number;
  @Input() hasDetail: boolean;
  @Input() disabled: boolean;
  @Input() isHighDemand: boolean;

  @Output() viewMore = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() interval = new EventEmitter();
  @ViewChild('dropDown') dropDown: DropOptionsComponent;
  showOptions: boolean = false;

  tagAppearance = ETagAppearance;
  channelColor = CChannelColor;

  constructor() {}

  viewMoreEvent(): void {
    this.viewMore.emit();
  }

  editEvent(): void {
    this.edit.emit();
  }

  setInterval(): void {
    this.interval.emit();
  }

  get isExpress(): boolean {
    return this.serviceName === 'Express' ? true : false;
  }

  get channelInnerClass(): string {
    return 'py-3 px-2 border border-complementary-three';
  }

  get segmentChannelColor(): string {
    return this.channelColor[EChannel.digital];
  }
}
