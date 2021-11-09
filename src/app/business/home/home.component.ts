import { Component, OnInit } from '@angular/core';
import { User } from '@models/auth/user.model';
import { UserStoreService } from '@stores/user-store.service';
import { TRouter } from '@models/auth/router.model';
import { ROUTER_LIST } from '@parameters/router/router.parameter';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    public user: User;

    public routeList: TRouter[] = ROUTER_LIST;

    constructor(private userStore: UserStoreService) {
    }

    ngOnInit(): void {
        this.user = this.userStore.currentUser;
    }

}
