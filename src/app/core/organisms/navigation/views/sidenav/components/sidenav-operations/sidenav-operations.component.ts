import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';

@Component({
  selector: 'app-sidenav-operations',
  templateUrl: './sidenav-operations.component.html',
  styleUrls: ['./sidenav-operations.component.sass'],
})
export class SidenavOperationsComponent implements OnInit {
  public routerPath = ROUTER_PATH;
  public sidenavRouting = OPERATIONS_ROUTER;
  @Input() sidenav: MatSidenav;
  @Output() sidenavOpen = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSidenavOpen() {
    this.sidenavOpen?.emit();
  }
}
