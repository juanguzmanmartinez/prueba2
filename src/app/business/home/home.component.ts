import { Component, OnInit } from '@angular/core';
import { User } from '@models/auth/user.model';
import { UserStoreService } from '@stores/user-store.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  user: User;

  routerPath = ROUTER_PATH;

  constructor(
    private userStore: UserStoreService
  ) { }

  ngOnInit(): void {
    this.user = this.userStore.currentUser;
  }

}
