import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<string[]>();

  list: any[];
  status: string[];
  valueSelect: string;

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(status: string[]): void {
    this.filter.emit(status);
  }

}
