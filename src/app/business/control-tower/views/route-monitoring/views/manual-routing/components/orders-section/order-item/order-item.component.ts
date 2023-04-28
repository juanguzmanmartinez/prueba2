import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],

})
export class OrderItemComponent {
  @Input() index: number = 1
}