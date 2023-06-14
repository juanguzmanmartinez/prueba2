import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { OrderManualDB } from '../../../../../constants/orders.constant';
import { IOrder } from 'app/business/control-tower/views/route-monitoring/interfaces/order.interface';
import { OrderRouteStore } from '../../../store/order.store';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: IOrder[];

  constructor(private orderStore: OrderRouteStore) {}

  ngOnInit(): void {
    this.orderStore.getOrderList().subscribe((orderList) => {
      this.orderList = orderList;
    });
  }

  drop(event: CdkDragDrop<IOrder[]>) {
    moveItemInArray(this.orderList, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.orderStore.setOrderList(this.orderList);
    }
  }
}
