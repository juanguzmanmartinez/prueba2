import { Component, OnInit } from '@angular/core';
import { Role } from '@models/auth/role.model';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';

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
