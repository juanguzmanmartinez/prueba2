import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarStoreService } from '../operations-admin/store/calendar-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-capacity-edit',
  templateUrl: './capacity-edit.component.html',
  styleUrls: ['./capacity-edit.component.scss']
})
export class CapacityEditComponent implements OnInit, OnDestroy {

  showActiveCapacityDefault: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    public calendarStoreService: CalendarStoreService,
  ) { }

  ngOnInit() {
    const valueDefaultCapacity = this.calendarStoreService.showActiveCapacityDefault$.subscribe(showActiveCapacityDefault => {
      this.showActiveCapacityDefault = showActiveCapacityDefault;
    });

    this.subscriptions.push(valueDefaultCapacity);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
