import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-op-capacities-local-default-capacity-card',
  templateUrl: './op-capacities-local-default-capacity-card.component.html',
  styleUrls: ['./op-capacities-local-default-capacity-card.component.scss']
})
export class OpCapacitiesLocalDefaultCapacityCardComponent implements OnInit {

  @Input() localCapacityName: string;
  @Input() localCapacityQuantity: number;
  @Input() localCapacityDetail: boolean;
  @Input() localCapacityDisabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
