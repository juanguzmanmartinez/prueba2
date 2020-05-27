import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { Capacity } from 'src/app/shared/services/models/capacity.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService {

  private _capacitiesForDay: Capacity[];
  private _capacitiesForDaySubject = new BehaviorSubject<Capacity[]>([] as Capacity[]);
  public capacitiesForDay$ = this._capacitiesForDaySubject.asObservable();
  public get capacitiesForDay() {
    return this._capacitiesForDay;
  }

  constructor() {
    this.capacitiesForDay$.subscribe(capacitiesForDay => this._capacitiesForDay = capacitiesForDay);
  }

  public setCapacitiesForDay(capacities: Capacity[]) {
    this._capacitiesForDaySubject.next(capacities);
  }
}
