import { Component, OnInit } from '@angular/core';
import { User } from '@models/auth/user.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { UserStoreService } from '@stores/user-store.service';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.sass']
})
export class AdministratorHomeComponent implements OnInit {

  public user: User;
  public routerPath = ROUTER_PATH;

  constructor(private userStore: UserStoreService) {
  }

  ngOnInit(): void {
    this.user = this.userStore.currentUser;
  }

}
