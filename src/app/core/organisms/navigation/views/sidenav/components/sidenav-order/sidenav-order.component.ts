import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';

@Component({
  selector: 'app-sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.sass'],
})
export class SidenavOrderComponent {
  public routerPath = ROUTER_PATH;
  public sidenavRouting = ORDER_ROUTER;

  @Input() sidenav: MatSidenav;
  @Output() sidenavOpen = new EventEmitter();

  constructor() {}

  onSidenavOpen() {
    this.sidenavOpen?.emit();
  }
}
