import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { Role } from '@parameters/auth/role.parameter';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  public concatPath = CONCAT_PATH;
  public roles = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
