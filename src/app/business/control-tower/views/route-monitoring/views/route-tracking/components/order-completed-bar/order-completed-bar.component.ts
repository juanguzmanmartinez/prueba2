import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-completed-bar',
  templateUrl: './order-completed-bar.component.html',
  styleUrls: ['./order-completed-bar.component.scss'],
})
export class OrderCompletedBarComponent {
  @Input() completedOrders: number = 0;

  get progress() {
    return this.completedOrders * 10;
  }
}
