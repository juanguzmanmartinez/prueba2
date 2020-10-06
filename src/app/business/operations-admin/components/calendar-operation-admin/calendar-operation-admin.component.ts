import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { CalendarImplementService } from '../../services/calendar-implements.service';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { IDrugstore, IServices, Drugstore } from 'src/app/shared/services/models/drugstore.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { OperationAdminCalendarService } from '../../operations-forms/operations-admin-calendar';
import { ICalendar, Calendar, IDayList, IDayBlockedRequest, SelectedDay, Week } from 'src/app/shared/services/models/calendar.model';
import { Subscription } from 'rxjs';
import { CompanyDrugstoresStoreService } from 'src/app/commons/business-factories/factories-stores/company-drugstores-store.service';
import { Router } from '@angular/router';
import { ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';
import { CapacityEditImplementService } from 'src/app/business/capacity-edit/services/capacity-edit-implements.service';
import { CalendarStoreService } from '../../store/calendar-store.service';

export interface ICheckboxState {
  isMark: boolean;
}

export const CHECKBOX_STATE = {
  isMark: false,
};


@Component({
  selector: 'app-calendar-operation-admin',
  templateUrl: './calendar-operation-admin.component.html',
  styleUrls: ['./calendar-operation-admin.component.scss']
})
export class CalendarOperationAdminComponent implements OnInit, OnDestroy {

  InfoDrugstores: Drugstore[] = [] as Drugstore[];
  newInfoDrugstore: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public calendarResponse: Calendar[] = [] as Calendar[];

  currentMonthNumber = 0;
  currentMonthName = '';
  currentYear = '';
  showButtonSave = false;
  showButtonActive = true;
  showActiveChecks = true;
  showLinks = false;

  infoCheckedSelected: IDayList[] = [] as IDayList[];
  selectedDayArray: SelectedDay[] = [] as SelectedDay[];
  public initialDrugstoreOption: ICustomSelectOption = {} as ICustomSelectOption;

  weeks: Week[] = [] as Week[];

  private isDoneFirstLoad = false;
  private subscription: Subscription[] = [];

  constructor(
    private drugstoreImplement: CalendarImplementService,
    public formService: OperationAdminCalendarService,
    private companyDrugstoresStore: CompanyDrugstoresStoreService,
    private capacityEditImplementService: CapacityEditImplementService,
    public calendarStoreService: CalendarStoreService,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.getFormattedDrugstore = this.getFormattedDrugstore.bind(this);
  }

  ngOnInit() {
    this.isDoneFirstLoad = false;
    window.scrollTo(0, 0);
    const dropdownSub = this.formService.dropdowControl.valueChanges
      .subscribe(drugstore => {
        if (this.isDoneFirstLoad) {
          this.initialDrugstoreOption = drugstore;
          this.loadCalendarResponse(this.initialDrugstoreOption);
        }
      });
    this.loadDrugStores();
    this.subscription.push(dropdownSub);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private loadDrugStores() {
    const { drugstores, selectedDrugstore } = this.companyDrugstoresStore;
    if (drugstores && drugstores.length) {
      this.newInfoDrugstore = this.getFormattedDrugstoreOptions(drugstores);
      const _currentDrugstore = selectedDrugstore.localCode ? selectedDrugstore : drugstores[0];
      const _formattedCurrentDrugstore = this.getFormattedDrugstore(_currentDrugstore);

      this.formService.dropdowControl.setValue(_formattedCurrentDrugstore);
      this.drugstoreImplement.getCalendarImplements$(_formattedCurrentDrugstore)
        .pipe(take(1))
        .subscribe(calendarResponse => {
          this.isDoneFirstLoad = true;
          this.calendarResponse = calendarResponse;
          this.currentYear = this.calendarResponse[0].year;

          this.setInfoCheckedSelected();
        });
    } else {

      this.drugstoreImplement.getDrugstoreImplements$()
        .pipe(tap(stores => {
          this.InfoDrugstores = stores;
          this.companyDrugstoresStore.setDrugstores(stores);
        }))
        .pipe(switchMap((stores) => {
          this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
          this.initialDrugstoreOption = JSON.parse(JSON.stringify(this.newInfoDrugstore[31])) as ICustomSelectOption;
          this.companyDrugstoresStore.setSelectedDrugstore(stores[31]);
          this.formService.dropdowControl.setValue(this.initialDrugstoreOption);
          return this.drugstoreImplement.getCalendarImplements$(this.initialDrugstoreOption);
        }))
        .pipe(take(1))
        .subscribe(calendarResponse => {
          this.isDoneFirstLoad = true;
          this.calendarResponse = calendarResponse;
          this.currentYear = this.calendarResponse[0].year;
          this.setInfoCheckedSelected();
        });
    }
  }

  public loadCalendarResponse(dropdownValue: ICustomSelectOption) {
    this.companyDrugstoresStore.setSelectedDrugstoreByLocalCode(dropdownValue.code);
    this.drugstoreImplement.getCalendarImplements$(dropdownValue)
      .pipe(take(1))
      .subscribe(response => {
        this.calendarResponse = response;
        this.setInfoCheckedSelected();
      });
  }

  private loadOtherCalendarMonth() {
    const { selectedDrugstore } = this.companyDrugstoresStore;
    const _formattedCurrentDrugstore = this.getFormattedDrugstore(selectedDrugstore);
    this.drugstoreImplement.getCalendarImplements$(_formattedCurrentDrugstore)
      .pipe(take(1))
      .subscribe(response => {
        this.showButtonSave = false;
        this.showButtonActive = true;
        this.showActiveChecks = true;
        this.showLinks = false;

        this.calendarResponse = response;
        this.setInfoCheckedSelected();
      });
  }

  public goToBack() {
    this.currentMonthNumber -= 1;
    this.currentYear = this.calendarResponse[0].year;

    if (this.currentMonthNumber < 0) {
      alert('Solo puedes editar los meses de ' + this.calendarResponse[0].month + ' y ' + this.calendarResponse[1].month);
      this.currentMonthNumber = 0;
    } else {
      this.loadOtherCalendarMonth();
    }
  }

  public goToNext() {
    this.currentMonthNumber += 1;
    this.currentYear = this.calendarResponse[1].year;
    if (this.currentMonthNumber > 1) {
      alert('Solo puedes editar los meses de ' + this.calendarResponse[0].month + ' y ' + this.calendarResponse[1].month);
      this.currentMonthNumber = 1;
    } else {
      this.loadOtherCalendarMonth();
    }
  }

  private setInfoCheckedSelected() {
    let i = 0;
    this.infoCheckedSelected = [];
    this.weeks = [];

    this.currentMonthName = this.calendarResponse[this.currentMonthNumber].month;

    this.calendarResponse[this.currentMonthNumber].daysList.forEach((value, index) => {
      this.infoCheckedSelected.push({
        id: i,
        capacity: value.capacity,
        check: value.check,
        day: value.day,
        dayNumber: value.dayNumber,
        dayToShow: value.dayToShow,
        orders: value.orders,
        restrictedDay: value.restrictedDay,
        today: value.today,
        pastDay: value.pastDay,
        dayType: 'active'
      });
      i++;

    });

    if (this.calendarResponse[this.currentMonthNumber].startDay > 1) {
      for (let j = 0; j < this.calendarResponse[this.currentMonthNumber].startDay - 1; j++) {
        this.infoCheckedSelected.unshift({
          id: undefined,
          capacity: undefined,
          check: undefined,
          day: undefined,
          dayNumber: undefined,
          dayToShow: undefined,
          orders: undefined,
          restrictedDay: undefined,
          today: undefined,
          pastDay: undefined,
          dayType: 'empty'
        });
      }
    }

    const weeksNumber = this.infoCheckedSelected.length / 7;

    for (let k = 0; k < weeksNumber; k++) {
      const week = new Week(
        this.dayValidator(this.infoCheckedSelected[0]),
        this.dayValidator(this.infoCheckedSelected[1]),
        this.dayValidator(this.infoCheckedSelected[2]),
        this.dayValidator(this.infoCheckedSelected[3]),
        this.dayValidator(this.infoCheckedSelected[4]),
        this.dayValidator(this.infoCheckedSelected[5]),
        this.dayValidator(this.infoCheckedSelected[6]));
      this.weeks.push(week);
      this.infoCheckedSelected.splice(0, 7);
    }

  }

  private dayValidator(day: IDayList) {
    if (day !== undefined) {
      return day;
    } else {
      return {
        id: undefined,
        capacity: undefined,
        check: undefined,
        day: undefined,
        dayNumber: undefined,
        dayToShow: undefined,
        orders: undefined,
        restrictedDay: undefined,
        today: undefined,
        pastDay: undefined,
        dayType: 'empty'
      } as IDayList;
    }
  }

  private getFormattedDrugstoreOptions(drugstores: Drugstore[]) {
    return drugstores.map(this.getFormattedDrugstore);
  }

  private getFormattedDrugstore(drugstore: Drugstore) {
    return {
      text: drugstore.name,
      value: drugstore.localCode,
      code: drugstore.localCode,
      fulfillmentCenterCode: drugstore.localCode,
      channel: drugstore.channel,
      segmentType: drugstore.segmentType.name,
      serviceTypeCode: this.getTypeService(drugstore.services),
    } as ICustomSelectOption;
  }

  getTypeService(type: IServices[]) {
    if (type.length === 1) {
      return type[0].code;
    } else if (type.length === 2) {
      return type[0].code + ',' + type[1].code;
    }
  }

  save() {
    if (this.selectedDayArray.length) {
      let dates = '';
      let types = '';

      this.selectedDayArray.forEach((value, index) => {
        if (index === this.selectedDayArray.length - 1) {
          dates = dates + value.dayList.day;
          types = types + (value.isSelected ? '1' : '0');
        } else {
          dates = dates + value.dayList.day + ',';
          types = types + (value.isSelected ? '1' : '0') + ',';
        }
      });

      const selectedDrugstore = String(this.formService.dropdowControl.value.value);
      const code = {
        fulfillmentCenterCode: selectedDrugstore
      } as IDayBlockedRequest;
      this.drugstoreImplement.patchCalendarImplements$(code, dates, types)
        .pipe(take(1))
        .subscribe(response => {
          this.selectedDayArray = [];
          this.showButtonSave = false;
          this.showButtonActive = true;
          this.showActiveChecks = true;
          this.showLinks = false;
        });
    }

  }

  daySelectionEvent(selectedDay: SelectedDay) {
    const matchedDayIndex = this.selectedDayArray.findIndex(day => day.dayList.day === selectedDay.dayList.day);
    if (matchedDayIndex === -1) {
      this.selectedDayArray.push(selectedDay);
    } else {
      this.selectedDayArray.splice(matchedDayIndex, 1);
    }
  }
  showActive() {
    this.showButtonSave = true;
    this.showButtonActive = false;
    this.showActiveChecks = false;
    this.showLinks = true;
  }

  showDefault() {
    const { drugstores, selectedDrugstore } = this.companyDrugstoresStore;
    if (drugstores && drugstores.length) {

      this.newInfoDrugstore = this.getFormattedDrugstoreOptions(drugstores);
      const _currentDrugstore = selectedDrugstore.localCode ? selectedDrugstore : drugstores[0];
      const _formattedCurrentDrugstore = this.getFormattedDrugstore(_currentDrugstore);

      const requestParams = {
        segmentType: _formattedCurrentDrugstore.segmentType,
        fulfillmentCenterCode: _formattedCurrentDrugstore.fulfillmentCenterCode,
        channel: _formattedCurrentDrugstore.channel
      } as ICapacityRequestParams;

      this.capacityEditImplementService.getBlockScheduleImplements$(requestParams)
        .pipe(take(1))
        .subscribe(response => {
          const showActivePageDefault = true;
          this.calendarStoreService.setCapacitiesForDay(response);
          this.calendarStoreService.setShowCapacityDefault(showActivePageDefault);
          this.router.navigate(['/capacity-edit']);
        });
    }
  }

}
