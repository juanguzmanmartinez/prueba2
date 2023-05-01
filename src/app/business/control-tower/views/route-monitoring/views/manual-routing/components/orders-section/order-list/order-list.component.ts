import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { OrderManualDB } from '../../../constants/orders.constant';
import { IOrder } from 'app/business/control-tower/views/route-monitoring/interfaces/order.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  orderList = OrderManualDB;

  drop(event: CdkDragDrop<IOrder[]>) {
    moveItemInArray(this.orderList, event.previousIndex, event.currentIndex);
  }
}
