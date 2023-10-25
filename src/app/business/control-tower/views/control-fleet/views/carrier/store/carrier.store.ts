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
import { IPillFilter } from '@interfaces/control-tower/control-tower.filter.interface';
import {
  ICarrierListRequest,
  IPagination,
} from '@interfaces/control-tower/control-tower.interface';

@Injectable()
export class CarrierStore {
  private carrierListInitial = new BehaviorSubject<Carrier[]>(null);
  private carrierList = new BehaviorSubject<Carrier[]>(null);
  private localList = new BehaviorSubject<LocalFilter[]>(null);
  private carrierStateList = new BehaviorSubject<CarrierStateFilter[]>(null);
  private localSelectedList = new BehaviorSubject<LocalFilter[]>([]);
  private stateSelectedList = new BehaviorSubject<CarrierStateFilter[]>([]);
  private loadingCarrierList = new BehaviorSubject<boolean>(true);
  private errorLoadCarrierList = new BehaviorSubject<boolean>(false);
  private errorLoadLocalList = new BehaviorSubject<boolean>(false);
  private errorLoadStateList = new BehaviorSubject<boolean>(false);
  private request = new BehaviorSubject<ICarrierListRequest>(null);
  private pagination = new BehaviorSubject<IPagination>(null);

  public carrierListInitial$ = this.carrierListInitial.asObservable();
  public carrierList$ = this.carrierList.asObservable();
  public localList$ = this.localList.asObservable();
  public carrierStateList$ = this.carrierStateList.asObservable();
  public loadingCarrierList$ = this.loadingCarrierList.asObservable();
  public errorLoadCarrierList$ = this.errorLoadCarrierList.asObservable();
  public errorLoadLocalList$ = this.errorLoadLocalList.asObservable();
  public errorLoadStateList$ = this.errorLoadStateList.asObservable();
  public localSelectedList$ = this.localSelectedList.asObservable();
  public stateSelectedList$ = this.stateSelectedList.asObservable();
  public request$ = this.request.asObservable();
  public pagination$ = this.pagination.asObservable();

  setPagination(pagination: IPagination) {
    this.pagination.next(pagination);
  }

  setRequest(req: ICarrierListRequest) {
    this.request.next(req);
  }

  getRequest() {
    return this.request.value;
  }

  setCarrierList(carrierList) {
    this.carrierList.next(carrierList);
  }

  setLocalList(localList: LocalFilter[]) {
    this.localList.next(localList);
  }

  setCarrierStateList(carrierStateList: CarrierStateFilter[]) {
    this.carrierStateList.next(carrierStateList);
  }

  setLocalSelectedList(selectedOptions: LocalFilter[]) {
    this.localSelectedList.next(selectedOptions);
  }

  setStateSelectedList(selectedOptions: CarrierStateFilter[]) {
    this.stateSelectedList.next(selectedOptions);
  }

  setloadingCarrierList(loading: boolean) {
    this.loadingCarrierList.next(loading);
  }

  setErrorLoadCarrierList(hasError: boolean) {
    this.errorLoadCarrierList.next(hasError);
  }

  setErrorLoadLocalList(hasError: boolean) {
    this.errorLoadLocalList.next(hasError);
  }
  setErrorLoadStateList(hasError: boolean) {
    this.errorLoadStateList.next(hasError);
  }

  loadCarrierList(carrierList: Carrier[]) {
    this.carrierListInitial.next(carrierList);
    this.carrierList.next(carrierList);
  }

  loadInitialCarrierList() {
    this.setCarrierList(this.carrierListInitialValue());
  }

  filterCarrierList() {
    const locals = this.localSelectedLabelList();
    const carrierStates = this.stateSelectedLabelList();
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

  localSelectedListValue() {
    return this.localSelectedList.getValue();
  }

  stateSelectedListValue() {
    return this.stateSelectedList.getValue();
  }

  localSelectedLabelList() {
    return this.localSelectedListValue().map((local) => local.label);
  }

  stateSelectedLabelList() {
    return this.stateSelectedListValue().map((state) => state.label);
  }

  deleteOptionSelected(optionSelected: IPillFilter) {
    const { name, option } = optionSelected;
    if (name === 'locals') this.deleteLocalOptionSelected(option.value);
    if (name === 'carrierStates') this.deleteStateOptionSelected(option.value);
  }

  deleteLocalOptionSelected(value: string) {
    const locals = [...this.localSelectedListValue()];
    const localsAfterRemove = locals.filter((local) => local.value !== value);
    this.setLocalSelectedList(localsAfterRemove);
  }

  deleteStateOptionSelected(value: string) {
    const states = [...this.stateSelectedListValue()];
    const statesAfterRemove = states.filter((state) => state.value !== value);
    this.setStateSelectedList(statesAfterRemove);
  }

  localSelectedListPillValue(): IPillFilter[] {
    const locals = [...this.localSelectedListValue()];
    return locals.map((local) => {
      return { name: 'locals', option: local } as IPillFilter;
    });
  }

  stateSelectedListPillValue(): IPillFilter[] {
    const states = [...this.stateSelectedListValue()];
    return states.map((state) => {
      return { name: 'carrierStates', option: state } as IPillFilter;
    });
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
