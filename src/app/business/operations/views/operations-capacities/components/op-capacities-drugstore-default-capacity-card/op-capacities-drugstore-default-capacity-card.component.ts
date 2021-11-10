import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-op-capacities-drugstore-default-capacity-card',
  templateUrl: './op-capacities-drugstore-default-capacity-card.component.html',
  styleUrls: ['./op-capacities-drugstore-default-capacity-card.component.scss']
})
export class OpCapacitiesDrugstoreDefaultCapacityCardComponent {

  @Input() serviceName: string;
  @Input() capacityQuantity: number;
  @Input() hasDetail: boolean;
  @Input() disabled: boolean;

  @Output() viewMore = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor() { }

  viewMoreEvent(): void {
    this.viewMore.emit();
  }

  editEvent(): void {
    this.edit.emit();
  }
}
