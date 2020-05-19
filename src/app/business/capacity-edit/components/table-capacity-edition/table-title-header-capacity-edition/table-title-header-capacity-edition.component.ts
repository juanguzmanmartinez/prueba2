import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-title-header-capacity-edition',
  templateUrl: './table-title-header-capacity-edition.component.html',
  styleUrls: ['./table-title-header-capacity-edition.component.scss']
})
export class TableTitleHeaderCapacityEditionComponent implements OnInit {

  @Input()
  quantityCapacity: number;
  @Input()
  type: string;
  @Input()
  quantityRegister: number;
  constructor() { }

  ngOnInit() {
    this.quantityCapacity = 130;
    this.quantityRegister = 140;
  }

  save() {

  }

}
