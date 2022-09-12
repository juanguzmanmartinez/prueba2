import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';
@Component({
  selector: 'app-sidenav-capacity',
  templateUrl: './sidenav-capacity.component.html',
  styleUrls: ['./sidenav-capacity.component.sass'],
})
export class SidenavCapacityComponent {
  public routerPath = ROUTER_PATH;
  public sidenavRouting = {
    path: '/operaciones/capacidades',
    name: 'Capacidades',
    iconCard: 'motorcycle',
    iconMenu: 'motorcycle',
    description: 'Consulta de pedidos',
  };

  @Input() sidenav: MatSidenav;
  @Output() sidenavOpen = new EventEmitter();

  constructor() {}

  onSidenavOpen() {
    this.sidenavOpen?.emit();
  }
}
