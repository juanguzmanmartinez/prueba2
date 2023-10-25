import { Component, OnDestroy } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { OrderFormPresenter } from './views/order-records/order-form.presenter';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnDestroy {
  constructor(
    private orderFilterStore: OrderFilterStore,
    private orderFormPresenter: OrderFormPresenter
  ) {}

  ngOnDestroy(): void {
    this.orderFilterStore.clear();
    this.orderFormPresenter.reset();
  }
}
