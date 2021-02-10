import { Component, OnInit } from '@angular/core';
import { User } from '@models/auth/user.model';
import { UserStoreService } from '@stores/user-store.service';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

@Component({
    selector: 'app-operations-home',
    templateUrl: './operations-home.component.html',
    styleUrls: ['./operations-home.component.scss']
})
export class OperationsHomeComponent implements OnInit {

    public user: User;
    public concatPath = CONCAT_PATH;

    constructor(private userStore: UserStoreService) {
    }

    ngOnInit(): void {
        this.user = this.userStore.currentUser;
    }
}
