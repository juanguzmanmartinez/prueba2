import { Component, OnInit } from '@angular/core';
import { Role } from '@parameters/auth/role.parameter';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  public concatPath = CONCAT_PATH;
  public roles = Role;
  constructor() {
  }

  ngOnInit(): void {
  }

}
