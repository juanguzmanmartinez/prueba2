import { Injectable } from '@angular/core';
import { IOrderFilter } from 'app/business/order/views/order-records/interfaces/order-filter.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderFilterStore {
  private orderFilter: IOrderFilter = {};
  private orderFilterSubject = new BehaviorSubject<IOrderFilter>({});

  public orderFilter$ = this.orderFilterSubject.asObservable();

  constructor() {
    this.orderFilter$.subscribe((orderFilter) => {
      this.orderFilter = orderFilter;
    });
  }

  getOrderFilter(): IOrderFilter {
    return this.orderFilter;
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

  set setOrderCriteria(data: { column: string, order: 'A' | 'D' | 'N'}) {
    this.orderFilter.orderCriteria = data;
    this.orderFilterSubject.next(this.orderFilter);
  }

  clear(): void {
    this.orderFilter = {};
    this.orderFilterSubject.next({});
  }
}
