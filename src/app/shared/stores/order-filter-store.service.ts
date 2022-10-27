import { Injectable } from '@angular/core';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import {
  IOrderFilter,
  IOrderPagination,
} from 'app/business/order/views/order-records/interfaces/order-filter.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderFilterStore {
  private orderFilter: IOrderFilter = {};
  private orderPaginationInit: IOrderPagination = { page: 1, pageSize: 10 };
  private orderFilterSubject = new BehaviorSubject<IOrderFilter>({});
  private localList = new BehaviorSubject<IDrugstore[]>([]);
  private isResetFilters = new BehaviorSubject<boolean>(false);
  private orderPaginationSubject = new BehaviorSubject<IOrderPagination>(
    this.orderPaginationInit
  );

  public orderFilter$ = this.orderFilterSubject.asObservable();

  constructor() {
    this.orderFilter$.subscribe((orderFilter) => {
      this.orderFilter = orderFilter;
    });
  }

  getLocalList() {
    return this.localList.asObservable();
  }

  setLocalList(localList: IDrugstore[]) {
    this.localList.next(localList);
  }

  getOrderFilter(): IOrderFilter {
    return this.orderFilter;
  }

  getIsResetFilters() {
    return this.isResetFilters.asObservable();
  }

  setIsResetFilters(isReset: boolean) {
    this.isResetFilters.next(isReset);
  }

  setPage(page: number) {
    const orderPagination = { ...this.orderPaginationSubject.value, page };
    this.orderPaginationSubject.next(orderPagination);
  }

  setPageSize(pageSize: number) {
    const orderPagination = { ...this.orderPaginationSubject.value, pageSize };
    this.orderPaginationSubject.next(orderPagination);
  }

  getOrderPagination() {
    return this.orderPaginationSubject.asObservable();
  }

  set setSearchCode(searchCode: string) {
    const orderFilter = {
      ...this.orderFilter,
      searchCode,
    };

    this.orderFilterSubject.next(orderFilter);
  }

  set setSearchValue(searchValue: string) {
    this.orderFilter.searchValue = searchValue;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setLocals(locals: string[]) {
    this.orderFilter.locals = locals;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setCompanies(companies: string[]) {
    this.orderFilter.companies = companies;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setTypeServices(typeServices: string[]) {
    this.orderFilter.typeServices = typeServices;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setTypeDatePromise(typeDatePromise: string) {
    this.orderFilter.typeDatePromise = typeDatePromise;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setDatePromise(datePromise: string[]) {
    this.orderFilter.datePromise = datePromise;
    this.orderFilterSubject.next(this.orderFilter);
  }

  get getDatePromise(): string[] {
    return this.orderFilter.datePromise;
  }

  set setStatusOrder(statusOrder: string[]) {
    this.orderFilter.statusOrder = statusOrder;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setChannelOfBuy(channelOfBuy: string[]) {
    this.orderFilter.channelOfBuy = channelOfBuy;
    this.orderFilterSubject.next(this.orderFilter);
  }

  set setOrderCriteria(data: { column: string; order: 'A' | 'D' | 'N' }) {
    this.orderFilter.orderCriteria = data;
    this.orderFilterSubject.next(this.orderFilter);
  }

  clear(): void {
    this.orderFilter = {};
    this.orderFilterSubject.next({});
  }
}
