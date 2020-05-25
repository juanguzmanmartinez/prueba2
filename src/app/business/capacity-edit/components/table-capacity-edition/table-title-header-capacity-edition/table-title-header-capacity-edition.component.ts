import { Component, OnInit, Input } from '@angular/core';
import { IHeaderCapacity } from '../../../models/schedule.model';

@Component({
  selector: 'app-table-title-header-capacity-edition',
  templateUrl: './table-title-header-capacity-edition.component.html',
  styleUrls: ['./table-title-header-capacity-edition.component.scss']
})
export class TableTitleHeaderCapacityEditionComponent implements OnInit {

  @Input()
  quantityCapacity = { capacitiesQuantity: 0, ordersQuantity: 0 } as IHeaderCapacity;
  @Input()
  type: string;
  constructor() { }

  ngOnInit() {  }

}
