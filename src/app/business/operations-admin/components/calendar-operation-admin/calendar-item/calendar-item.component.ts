import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { IDayList } from 'src/app/shared/services/models/calendar.model';
import { NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarItemComponent),
      multi: true
    }
  ]
})
export class CalendarItemComponent implements OnInit {

  @Input()
  dayList: IDayList = {} as IDayList;
  @Input()
  frm: FormGroup;
  @Output() redirect = new EventEmitter();

  item: IDayList;

  public isDisabled = false;
  public checked = false;

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.item = this.frm.value['day'] as IDayList;
    this.checked = this.item.check;
    this.frm.get('day').setValue(this.item.check);
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
