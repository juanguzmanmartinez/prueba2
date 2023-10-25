import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrugStoreServiceStore {
  private statusTab = new BehaviorSubject<any>(null);

  statusTab$ = this.statusTab.asObservable();

  constructor() {}
  setStatusTab(mensaje) {
    this.statusTab.next(mensaje);
  }

  getStatusTab() {
    return this.statusTab.value;
  }
}
