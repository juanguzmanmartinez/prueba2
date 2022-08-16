import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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

  @Output() viewMore = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() interval = new EventEmitter();
  @ViewChild('dropDown') dropDown: DropOptionsComponent;
  showOptions: boolean = false;

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
}
