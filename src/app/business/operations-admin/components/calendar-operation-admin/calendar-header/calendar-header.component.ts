import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {

  @Input()
  day = '';

  constructor() { }

  ngOnInit() {
  }

}
