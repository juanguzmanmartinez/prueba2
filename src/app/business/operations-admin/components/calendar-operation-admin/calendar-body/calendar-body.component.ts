import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {


  title = 'Calendar';

  daysName = [
    {day: 'Lunes'},
    {day: 'Martes'},
    {day: 'Miercoles'},
    {day: 'Jueves'},
    {day: 'Viernes'},
    {day: 'Sabado'},
    {day: 'Domingos'},
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

  redirectEditCapacity() {
    console.log('si llama a la funcion');
  }
}
