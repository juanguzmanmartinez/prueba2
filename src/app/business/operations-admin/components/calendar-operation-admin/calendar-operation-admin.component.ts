import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CalendarImplementService } from '../../services/calendar-implements.service';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { IDrugstore, IServices, Drugstore } from 'src/app/shared/services/models/drugstore.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { OperationAdminCalendarService } from '../../operations-forms/operations-admin-calendar';
import { ICalendar, Calendar, IDayList, IDayBlockedRequest, SelectedDay, Week } from 'src/app/shared/services/models/calendar.model';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';
import { Subscription } from 'rxjs';
import { CompanyDrugstoresStoreService } from 'src/app/commons/business-factories/factories-stores/company-drugstores-store.service';

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

  infoCheckedSelected: IDayList[] = [] as IDayList[];
  selectedDayArray: SelectedDay[] = [] as SelectedDay[];

  weeks: Week[] = [] as Week[];

  private isDoneFirstLoad = false;
  private subscription: Subscription[] = [];

  constructor(
    private drugstoreImplement: CalendarImplementService,
    public formService: OperationAdminCalendarService,
    private mainLoaderService: MainLoaderService,
    private companyDrugstoresStore: CompanyDrugstoresStoreService,
  ) { }

  ngOnInit() {

    this.loadDrugStores();
    const dropdownSub = this.formService.dropdowControl.valueChanges
      .subscribe(x => {
        if (this.isDoneFirstLoad) {
          this.mainLoaderService.isLoaded = true;
          this.loadCalendarResponse(x);
        }
      });
    this.subscription.push(dropdownSub);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private loadDrugStores() {
    this.mainLoaderService.isLoaded = true;
    this.drugstoreImplement.getDrugstoreImplements$()
      .pipe(tap(stores => {
        this.InfoDrugstores = stores;
        this.companyDrugstoresStore.setDrugstores(stores);
      }))
      .pipe(switchMap((stores) => {
        this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
        const initialDrugstoreOption = this.newInfoDrugstore[31];
        this.companyDrugstoresStore.setSelectedDrugstore(stores[31]);
        this.formService.dropdowControl.setValue(initialDrugstoreOption);
        return this.drugstoreImplement.getCalendarImplements$(initialDrugstoreOption);
      }))
      .pipe(take(1))
      .subscribe(calendarResponse => {
        this.mainLoaderService.isLoaded = false;
        this.isDoneFirstLoad = true;
        this.calendarResponse = calendarResponse;
        this.setInfoCheckedSelected();
      });
  }

  public loadCalendarResponse(dropdownValue: ICustomSelectOption) {
    this.companyDrugstoresStore.setSelectedDrugstoreByLocalCode(dropdownValue.code);
    this.drugstoreImplement.getCalendarImplements$(dropdownValue)
      .pipe(take(1))
      .subscribe(response => {
        this.calendarResponse = response;
        this.mainLoaderService.isLoaded = false;
        this.setInfoCheckedSelected();
      });
  }

  public goToBack() {
    this.currentMonthNumber -= 1;
    if (this.currentMonthNumber < 0) {
      alert('May and June only, going to May');
      this.currentMonthNumber = 0;
    }
    this.setInfoCheckedSelected();
  }

  public goToNext() {
    this.currentMonthNumber += 1;
    if (this.currentMonthNumber > 1) {
      alert('May and June only, going back to May');
      this.currentMonthNumber = 0;
    }
    this.setInfoCheckedSelected();
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
        order: value.order,
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
          order: undefined,
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
        order: undefined,
        restrictedDay: undefined,
        today: undefined,
        pastDay: undefined,
        dayType: 'empty'
      } as IDayList;
    }
  }

  private getFormattedDrugstoreOptions(drugstores: Drugstore[]) {
    return drugstores.map(store => {
      return {
        text: store.name,
        value: store.localCode,
        code: store.localCode,
        fulfillmentCenterCode: store.localCode,
        channel: store.channel,
        segmentType: store.segmentType.name,
        serviceTypeCode: this.getTypeService(store.services),
      } as ICustomSelectOption;
    });
  }

  getTypeService(type: IServices[]) {
    if (type.length === 1) {
      return type[0].code;
    } else if (type.length === 2) {
      return type[0].code + ', ' + type[1].code;
    }
  }

  save() {
    this.mainLoaderService.isLoaded = true;
    if (null !== this.selectedDayArray && undefined !== this.selectedDayArray && [] !== this.selectedDayArray &&
      0 !== this.selectedDayArray.length) {
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
          this.mainLoaderService.isLoaded = false;
          this.selectedDayArray = [];
        });
    }

  }

  daySelectionEvent(selectedDay) {
    this.selectedDayArray.push(selectedDay);
  }

}
