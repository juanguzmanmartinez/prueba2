import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.scss']
})
export class CalendarButtonComponent implements OnInit {

  @Input() isDisabled = false;
  @Output() onclick = new EventEmitter();

  constructor( ) { }

  ngOnInit(): void {

  }

  public buttonClick() {
    if (!this.isDisabled) {
      this.onclick.emit();
    }
  }
}
