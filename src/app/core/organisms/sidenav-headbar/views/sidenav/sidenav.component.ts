import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  public routerPath = ROUTER_PATH;
  public roles = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
