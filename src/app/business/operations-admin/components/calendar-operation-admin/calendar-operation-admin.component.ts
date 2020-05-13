import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarImplementService } from '../../services/calendar-implements.service';
import { take, switchMap } from 'rxjs/operators';
import { IDrugstore, IServices } from 'src/app/shared/services/models/drugstore.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { OperationAdminCalendarService } from '../../operations-forms/operations-admin-calendar';
import { ICalendar, Calendar, IDayList } from 'src/app/shared/services/models/calendar.model';

@Component({
  selector: 'app-calendar-operation-admin',
  templateUrl: './calendar-operation-admin.component.html',
  styleUrls: ['./calendar-operation-admin.component.scss']
})
export class CalendarOperationAdminComponent implements OnInit {

  InfoDrugstores: IDrugstore[] = [] as IDrugstore[];
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


  constructor(
    private drugstoreImplement: CalendarImplementService,
    public formService: OperationAdminCalendarService,
  ) { }

  ngOnInit() {
    this.getDrugStores();
    this.InitialCalendar();
    this.formService.dropdowControl.valueChanges.subscribe(x => {
      this.drugstoreImplement.getCalendarImplements$(x)
        .pipe(take(1))
        .subscribe(response => {
          this.calendarResponse = response;
          console.log(this.calendarResponse, 'this.calendarResponse');
        });
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

    const month = {
      daysList: this.daysNumber,
      month: meses[f.getMonth()],
      year: f.getFullYear().toString(),
    } as Calendar;

    const calendar = [month];
    this.calendarResponse = calendar;

  }
  private getDrugStores() {
    this.drugstoreImplement.getDrugstoreImplements$()
      .pipe(take(1))
      .subscribe(stores => {
        this.InfoDrugstores = stores;
        this.InfoDrugstores.map((value) => {
          this.newInfoDrugstore.push({
            text: value.name,
            value: value.localCode,
            code: value.localCode,
            fulfillmentCenterCode: value.localCode,
            channel: value.channel,
            segmentType: value.segmentType.name,
            serviceTypeCode: this.getTypeService(value.services),
          });
        });
      });
  }

  getTypeService(type: IServices[]) {
    if (type.length === 1) {
      return type[0].code;
    } else if (type.length === 2) {
      return type[0].code + ', ' + type[1].code;
    }
  }

}
