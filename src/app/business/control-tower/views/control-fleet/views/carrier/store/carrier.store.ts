import { Injectable } from '@angular/core';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { BehaviorSubject } from 'rxjs';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { LocalFilter } from 'app/business/control-tower/models/local-filter.model';
import { CarrierStateFilter } from 'app/business/control-tower/models/carrier-state-filter.model';
import { SortEvent } from '@interfaces/vita/table.interface';
import {
  ascendingSortString,
  descendingSortString,
} from 'app/business/control-tower/util/order-table.function';

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
    let carrierList = [...this.carrierListInitialValue()];
    if (carrierStates && carrierStates.length > 0) {
      carrierList = carrierList.filter((carrier) =>
        carrierStates?.includes(carrier.state)
      );
    }
    if (locals && locals.length > 0) {
      carrierList = carrierList.filter((carrier) =>
        locals?.includes(carrier.local)
      );
    }
    this.setCarrierList(carrierList);
  }

  carrierListValue() {
    return this.carrierList.getValue();
  }

  carrierListInitialValue() {
    return this.carrierListInitial.getValue();
  }

  sortCarrierList(event: SortEvent) {
    const { column, order } = event;
    if (order === 'N') {
      this.loadInitialCarrierList();
      return;
    }
    const sortBy = column === 'local' ? 'localName' : column;
    const carrierList = [...this.carrierListValue()];
    const sortFn = order === 'A' ? ascendingSortString : descendingSortString;
    const carrierSorted = carrierList.sort((a, b) => sortFn(a, b, sortBy));

    this.setCarrierList(carrierSorted);
  }

  sortTableByPaused(event: SortEvent) {
    const { column, order } = event;
    const pausedNoList = [];
    const pausedDateList = [];
    this.carrierListValue().forEach((carrier) => {
      if (carrier.paused.toLowerCase() === 'no') pausedNoList.push(carrier);
      else pausedDateList.push(carrier);
    });

    const sortFn = order === 'A' ? ascendingSortString : descendingSortString;
    const carrierSorted = pausedDateList.sort((a, b) => sortFn(a, b, column));

    this.setCarrierList([...carrierSorted, ...pausedNoList]);
  }
}
