import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDrugstore } from 'src/app/shared/services/models/drugstore.model';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {

  @Input()
  drugstores: IDrugstore = {} as IDrugstore;
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
  totalDays = 31;
  initDay = 3;
  monthActive = 3;
  currentDate = 17;

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= this.totalDays; i++) {
      this.daysNumber = [...this.daysNumber, i];
    }
  }

  public drugstoreS($event) {
    this.dataDrugstore.emit($event);
  }

}
