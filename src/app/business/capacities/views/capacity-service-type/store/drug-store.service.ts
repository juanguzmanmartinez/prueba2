import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CapacitiesDrugstore } from '../models/operations-capacities-responses.model';

@Injectable()
export class DrugStoreServiceStore {
  private statusTab = new BehaviorSubject<any>(null);
  private drugStore$ = new BehaviorSubject<CapacitiesDrugstore>(null);

  statusTab$ = this.statusTab.asObservable();

  constructor() {}
  setStatusTab(mensaje) {
    this.statusTab.next(mensaje);
  }

  getStatusTab() {
    return this.statusTab.value;
  }

  setDrugStore(drugStore: CapacitiesDrugstore) {
    this.drugStore$.next(drugStore);
  }

  getDrugStore() {
    return this.drugStore$.asObservable();
  }

  clearDrugStore() {
    this.drugStore$.next(null);
  }
}
