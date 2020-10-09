import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { IDayList, SelectedDay } from 'src/app/shared/services/models/calendar.model';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';
import { CapacityEditImplementService } from 'src/app/business/capacity-edit/services/capacity-edit-implements.service';
import { take } from 'rxjs/operators';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { CalendarStoreService } from '../../../store/calendar-store.service';
import { CompanyDrugstoresStoreService } from 'src/app/commons/business-factories/factories-stores/company-drugstores-store.service';

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

  @Input()
  chosenDrugstore: ICustomSelectOption;

  @Input()
  showActiveChecks: boolean;

  @Input()
  showLinks: boolean;

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
    public calendarStoreService: CalendarStoreService,
    private companyDrugstoresStore: CompanyDrugstoresStoreService,
  ) { }

  ngOnInit() {
    this.item = this.weekDay;
    if (this.item.dayType !== 'empty') {
      const control = new FormControl(this.item.check);
      this.frm = this.formBuilder.group({
        day: control
      });
      this.checked = this.item.check;
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

    this.selectedDay.isSelected = this.checked;

    this.messageEvent.emit(this.selectedDay);

    this.onChange(this.checked);
    this.onTouch(this.checked);
  }

  redirectCapacity() {

    const requestParams = {
      segmentType: this.chosenDrugstore.segmentType,
      day: this.item.day,
      fulfillmentCenterCode: this.chosenDrugstore.fulfillmentCenterCode,
      channel: this.chosenDrugstore.channel
    } as ICapacityRequestParams;
    this.companyDrugstoresStore.setSelectedDayForCapacitites(this.item.day);

    this.capacityEditImplementService.getBlockScheduleImplements$(requestParams)
      .pipe(take(1))
      .subscribe(response => {
        const showActivePageDefault = false;
        this.calendarStoreService.setShowCapacityDefault(showActivePageDefault);
        this.calendarStoreService.setCapacitiesForDay(response);
        this.router.navigate(['/capacity-edit']);
      });
  }

}
