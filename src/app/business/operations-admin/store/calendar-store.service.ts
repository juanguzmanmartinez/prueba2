import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { Capacity } from 'src/app/shared/services/models/capacity.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService {

  private schedule: Capacity[];
  private selectedDaySubject = new BehaviorSubject<Capacity[]>({} as Capacity[]);

  private subscriptions: Subscription[] = [];

  public selectedDay$ = this.selectedDaySubject.asObservable();

  constructor() {

    const selectedActiveOrderSubscription = this.selectedDay$
      .subscribe(blockschedule => this.schedule = blockschedule);
    this.subscriptions.push(selectedActiveOrderSubscription);
  }



  public get schedules() {
    return this.schedule;
  }

  public setSelectedCapacity(schedule: Capacity[]) {
    this.selectedDaySubject.next(schedule);
  }


  public unsubscribeObservers() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
