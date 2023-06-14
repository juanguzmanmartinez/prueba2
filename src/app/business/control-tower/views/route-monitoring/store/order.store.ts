import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder, IOrderStoreState } from '../interfaces/order.interface';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

const state: IOrderStoreState = {
  errorOrders: undefined,
  pendingOrders: undefined,
  selectedErrorOrders: undefined,
  selectedPendingOrders: undefined,
  routeOrders: undefined,
};

@Injectable()
export class OrderStore {
  private subject = new BehaviorSubject<IOrderStoreState>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  set(name: string, state: IOrder[]) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }

  select(name: string) {
    return this.store.pipe(pluck(name));
  }
}
