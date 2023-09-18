import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CT_ROUTER } from '@parameters/router/routing/control-tower/control-tower-router.parameter';

@Component({
  selector: 'app-sidenav-control-tower',
  templateUrl: './sidenav-control-tower.component.html',
})
export class SidenavControlTowerComponent {
  public routerPath = ROUTER_PATH;
  public sidenavRouting = CT_ROUTER;

  @Input() sidenav: MatSidenav;
  @Output() sidenavOpen = new EventEmitter();

  constructor() {}

  onSidenavOpen() {
    this.sidenavOpen?.emit();
  }
}
