import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { IDayList, SelectedDay } from 'src/app/shared/services/models/calendar.model';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';
import { CapacityEditImplementService } from 'src/app/business/capacity-edit/services/capacity-edit-implements.service';
import { take } from 'rxjs/operators';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';

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
  weekDay: IDayList;

  frm: FormGroup;

  @Output() messageEvent = new EventEmitter<SelectedDay>();

  item: IDayList;
  selectedDay: SelectedDay;

  public isDisabled = false;
  public checked = false;

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private capacityEditImplementService: CapacityEditImplementService,
    private mainLoaderService: MainLoaderService,
  ) { }

  ngOnInit() {
    this.item = this.weekDay;
    console.log(this.weekDay, 'weekDayweekDayweekDay');

    if (this.item.dayType !== 'empty') {
      this.checked = this.item.check;
      this.frm = this.formBuilder.group({
        day: this.item
      });
    } else {
      this.frm = this.formBuilder.group({
        day: undefined
      });
    }

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

    this.selectedDay = new SelectedDay();
    this.selectedDay.dayList = this.item;
    console.log(this.selectedDay.dayList);
    this.selectedDay.isSelected = this.checked;
    console.log(this.selectedDay.isSelected);

    this.messageEvent.emit(this.selectedDay);

    this.onChange(this.checked);
    this.onTouch(this.checked);
  }

  redirectCapacity() {
    this.mainLoaderService.isLoaded = false;
    const requestParams = {
      segmentType: 'PROGRAMMED',
      day: '2020-04-27',
      fulfillmentCenterCode: 'B88',
      channel: 'DIGITAL'
    } as ICapacityRequestParams;

    this.capacityEditImplementService.getBlockScheduleImplements$(requestParams)
      .pipe(take(1))
      .subscribe(response => {
        console.log(response, 'response');
        // this.responseCapacity = response;
        this.router.navigate(['/capacity-edit']);
      });
  }

}
