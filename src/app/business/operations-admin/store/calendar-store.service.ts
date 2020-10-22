import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Capacity } from 'src/app/shared/models/calendar/capacity.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService {

  private _capacitiesForDay: Capacity[];
  private _pageDefault = false;
  private _capacitiesForDaySubject = new BehaviorSubject<Capacity[]>([] as Capacity[]);
  private _pagefaultSubject = new BehaviorSubject(this._pageDefault);

  public capacitiesForDay$ = this._capacitiesForDaySubject.asObservable();
  public showActiveCapacityDefault$ = this._pagefaultSubject.asObservable();
  public get capacitiesForDay() {
    return this._capacitiesForDay;
  }

  constructor() {
    this.capacitiesForDay$.subscribe(capacitiesForDay => this._capacitiesForDay = capacitiesForDay);
  }

  public setCapacitiesForDay(capacities: Capacity[]) {
    this._capacitiesForDaySubject.next(capacities);
  }

  public setShowCapacityDefault(pageDefaul: boolean) {
    this._pagefaultSubject.next(pageDefaul);
  }
}
