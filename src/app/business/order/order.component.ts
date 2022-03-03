import { Component, OnDestroy } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnDestroy {

  constructor(
    private orderFilterStore: OrderFilterStore
  ) {}

  ngOnDestroy(): void {
    this.orderFilterStore.clear();
  }

}
