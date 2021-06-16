import { Component, OnInit } from '@angular/core';
import { EProfileDialogType } from '@organisms/profile/parameters/profile-dialog-type.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { User } from '@models/auth/user.model';

@Component({
    templateUrl: './profile-user-information-dialog.component.html',
    styleUrls: ['./profile-user-information-dialog.component.scss']
})
export class ProfileUserInformationDialogComponent implements OnInit {

    public profileDialogType = EProfileDialogType;

    public user: User;

    constructor(private userStore: UserStoreService) {
    }

    ngOnInit(): void {
        this.user = this.userStore.currentUser;
    }
}
