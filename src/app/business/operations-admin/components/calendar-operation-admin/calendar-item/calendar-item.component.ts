import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IDayList } from 'src/app/shared/services/models/calendar.model';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent implements OnInit {

  @Input()
  dayList: IDayList = {} as IDayList;
  @Output() redirect = new EventEmitter();


  public isDisabled = false;
  public checked = false;

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

  writeValue(value: any): void {
    if (typeof value === 'boolean') {
      this.checked = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public clickInput(value: HTMLInputElement) {
    this.checked = value.checked;
    this.onChange(this.checked);
    this.onTouch(this.checked);
  }

  redirectCapacity() {
    this.router.navigate(['/capacity-edit']);
  }

}
