import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';
@Component({
  selector: 'app-sidenav-zones',
  templateUrl: './sidenav-zones.component.html',
  styleUrls: ['./sidenav-zones.component.sass'],
})
export class SidenavZonesComponent {
  public routerPath = ROUTER_PATH;
  public sidenavRouting = {
    path: 'zonas',
    name: 'Zonas',
    iconCard: 'storefront',
    iconMenu: 'storefront',
    description: 'Consulta de pedidos',
  };

  @Input() sidenav: MatSidenav;
  @Output() sidenavOpen = new EventEmitter();

  constructor() {}

  onSidenavOpen() {
    this.sidenavOpen?.emit();
  }
}
