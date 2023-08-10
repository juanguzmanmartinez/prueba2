import { Injectable } from '@angular/core';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { BehaviorSubject } from 'rxjs';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { LocalFilter } from 'app/business/control-tower/models/local-filter.model';
import { CarrierStateFilter } from 'app/business/control-tower/models/carrier-state-filter.model';

@Injectable()
export class CarrierStore {
  private carrierListInitial = new BehaviorSubject<Carrier[]>(null);
  private carrierList = new BehaviorSubject<Carrier[]>(null);
  private localList = new BehaviorSubject<LocalFilter[]>(null);
  private carrierStateList = new BehaviorSubject<CarrierStateFilter[]>(null);
  private loadingCarrierList = new BehaviorSubject<boolean>(true);

  public carrierListInitial$ = this.carrierListInitial.asObservable();
  public carrierList$ = this.carrierList.asObservable();
  public localList$ = this.localList.asObservable();
  public carrierStateList$ = this.carrierStateList.asObservable();
  public loadingCarrierList$ = this.loadingCarrierList.asObservable();

  setCarrierList(carrierList) {
    this.carrierList.next(carrierList);
  }

  setLocalList(localList: LocalFilter[]) {
    this.localList.next(localList);
  }

  setCarrierStateList(carrierStateList: CarrierStateFilter[]) {
    this.carrierStateList.next(carrierStateList);
  }

  setloadingCarrierList(loading: boolean) {
    this.loadingCarrierList.next(loading);
  }

  loadCarrierList(carrierList: Carrier[]) {
    this.carrierListInitial.next(carrierList);
    this.carrierList.next(carrierList);
  }

  loadInitialCarrierList() {
    this.setCarrierList(this.carrierListInitialValue());
  }

  filterCarrierList(carrierFilter: ICarrierFilter) {
    const { locals, carrierStates } = carrierFilter;
    const carrierListFilterd = this.carrierListInitialValue()
      .filter((carrier) => locals?.includes(carrier.local))
      .filter((carrier) => carrierStates?.includes(carrier.state));

    this.setCarrierList(carrierListFilterd);
  }

  carrierListValue() {
    return this.carrierList.getValue();
  }

  carrierListInitialValue() {
    return this.carrierListInitial.getValue();
  }
}
