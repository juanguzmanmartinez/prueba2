import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarImplementService } from '../../services/calendar-implements.service';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { IDrugstore, IServices, Drugstore } from 'src/app/shared/services/models/drugstore.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { OperationAdminCalendarService } from '../../operations-forms/operations-admin-calendar';
import { ICalendar, Calendar, IDayList, IDayBlockedRequest } from 'src/app/shared/services/models/calendar.model';

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
export class CalendarOperationAdminComponent implements OnInit {

  InfoDrugstores: Drugstore[] = [] as Drugstore[];
  newInfoDrugstore: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public calendarResponse: Calendar[] = [] as Calendar[];
  @Output() dataDrugstore = new EventEmitter();

  public drugstoreSelected = -1;

  title = 'Calendar';

  daysName = [
    { day: 'Lunes' },
    { day: 'Martes' },
    { day: 'Miercoles' },
    { day: 'Jueves' },
    { day: 'Viernes' },
    { day: 'Sabado' },
    { day: 'Domingos' },
  ];

  daysNumber = [];
  data = [];
  totalDays = 31;
  initDay = 3;
  monthActive = 3;
  currentDate = 17;
  public dayNumberMonth = [];
  monthActuality = '';
  infoCheckedSelected: IDayList[] = [] as IDayList[];

  constructor(
    private drugstoreImplement: CalendarImplementService,
    public formService: OperationAdminCalendarService,
  ) { }

  ngOnInit() {
    this.loadDrugStores();
    this.InitialCalendar();
    this.formService.dropdowControl.valueChanges.subscribe(x => {
      this.loadCalendarResponse(x);
    });
  }

  public loadCalendarResponse(dropdownValue: ICustomSelectOption) {
    this.drugstoreImplement.getCalendarImplements$(dropdownValue)
      .pipe(take(1))
      .subscribe(response => {
        this.calendarResponse = response;
        this.setInfoCheckedSelected();
      });
  }

  public InitialCalendar() {
    const f = new Date();
    const meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    const mes = f.getMonth();
    const diasMes = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    for (let i = 1; i <= diasMes[mes]; i++) {
      this.daysNumber = [...this.daysNumber, i];
    }
    this.dayNumberMonth = this.daysNumber;

    const month = {
      daysList: this.daysNumber,
      month: meses[f.getMonth()],
      year: f.getFullYear().toString(),
    } as Calendar;

    this.monthActuality = meses[f.getMonth()] + ' ' + f.getFullYear().toString();
    const calendar = [month];
    this.calendarResponse = calendar;

  }

  private setInfoCheckedSelected() {
    let i = 0;
    this.infoCheckedSelected = [];
    this.calendarResponse[0].daysList.forEach(value => {

      this.infoCheckedSelected.push({
        id: i,
        capacity: value.capacity,
        check: value.check,
        day: value.day,
        dayNumber: value.dayNumber,
        dayToShow: value.dayToShow,
        order: value.order,
        restrictedDay: value.restrictedDay
      });
      i++;
      
    });
    this.formService.addItemsToCalendar01(this.infoCheckedSelected);
  }

  private loadDrugStores() {
    this.drugstoreImplement.getDrugstoreImplements$()
      .pipe(tap(stores => {
        this.InfoDrugstores = stores;
      }))
      .pipe(switchMap((stores) => {
        this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
        const initialDrugstoreOption = this.newInfoDrugstore[31];
        this.formService.dropdowControl.setValue(initialDrugstoreOption);
        return this.drugstoreImplement.getCalendarImplements$(initialDrugstoreOption);
      }))
      .pipe(take(1))
      .subscribe(calendarResponse => {
        this.calendarResponse = calendarResponse;
        this.setInfoCheckedSelected();

      });
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
    console.log('funciona?');
    const code = {
      fulfillmentCenterCode: 'B88'
    } as IDayBlockedRequest;
    const variabe = '2020-05-21,2020-05-22';
    const type = '0,0';
    this.drugstoreImplement.patchCalendarImplements$(code, variabe, type)
      .pipe(take(1))
      .subscribe(stores => {
        console.log(stores);
      });

  }

  redirectEditCapacity() {
  }

}
