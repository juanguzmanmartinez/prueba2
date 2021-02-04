import { Component, OnInit } from '@angular/core';
import { EProfileDialogType } from '@organisms/profile/parameters/profile-dialog-type.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { User } from '@models/auth/user.model';
import { RolesNames } from '@models/auth/role.model';

@Component({
    templateUrl: './profile-user-information-dialog.component.html',
    styleUrls: ['./profile-user-information-dialog.component.scss']
})
export class ProfileUserInformationDialogComponent implements OnInit {

    public profileDialogType = EProfileDialogType;

    public user: User;
    public rolesNames = RolesNames;

    constructor(private userStore: UserStoreService) {
        this.user = this.userStore.currentUser;
    }

    ngOnInit(): void {
    }
}
