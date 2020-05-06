import { Component, OnInit } from '@angular/core';
import { CalendarImplementService } from '../../services/calendar-implements.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-operation-admin',
  templateUrl: './calendar-operation-admin.component.html',
  styleUrls: ['./calendar-operation-admin.component.scss']
})
export class CalendarOperationAdminComponent implements OnInit {

  constructor(
    private scheduleImplement: CalendarImplementService,
  ) { }

  ngOnInit() {
    this.getStores();
  }


  private getStores() {
    this.scheduleImplement.getStoreImplements$()
      .pipe(take(1))
      .subscribe(schedules => {
        console.log(schedules, 'sdaadsdasda');
      });
  }

}
