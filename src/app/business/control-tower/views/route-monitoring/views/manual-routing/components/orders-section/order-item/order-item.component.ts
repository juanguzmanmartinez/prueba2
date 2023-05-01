import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IOrder } from 'app/business/control-tower/views/route-monitoring/interfaces/order.interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],

})
export class OrderItemComponent {
  @Input() index: number = 1
  @Input() order: IOrder;
}