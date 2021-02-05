import { Component, OnInit } from '@angular/core';
import { User } from '@models/auth/user.model';
import { UserStoreService } from '@stores/user-store.service';

@Component({
    selector: 'app-operations-home',
    templateUrl: './operations-home.component.html',
    styleUrls: ['./operations-home.component.scss']
})
export class OperationsHomeComponent implements OnInit {

    public user: User;

    constructor(private userStore: UserStoreService) {
    }

    ngOnInit(): void {
        this.user = this.userStore.currentUser;
    }
}
