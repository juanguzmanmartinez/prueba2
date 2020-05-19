import { Component, OnInit, Input } from '@angular/core';
import { IBlockSchedule } from '../../../models/schedule.model';

@Component({
  selector: 'app-table-block-capacity-edition',
  templateUrl: './table-block-capacity-edition.component.html',
  styleUrls: ['./table-block-capacity-edition.component.scss']
})
export class TableBlockCapacityEditionComponent implements OnInit {

  @Input()
  block: IBlockSchedule;
  constructor() {
    this.block = { block: '', schedule: '' };
  }

  ngOnInit() {
  }

}
