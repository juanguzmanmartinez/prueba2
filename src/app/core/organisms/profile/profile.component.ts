import { Component, OnInit } from '@angular/core';
import { ProfileUserInformationDialogService } from '@organisms/profile/views/profile-user-information-dialog/profile-user-information-dialog.service';
import { ProfileUpdatePasswordDialogService } from '@organisms/profile/views/profile-update-password-dialog/profile-update-password-dialog.service';
import { EProfileDialogType } from '@organisms/profile/parameters/profile-dialog-type.parameter';
import { UserStoreService } from '@stores/user-store.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    constructor(
        public profileUserInformationDialog: ProfileUserInformationDialogService,
        public profileUpdatePasswordDialog: ProfileUpdatePasswordDialogService,
        private userStore: UserStoreService
    ) {
    }

    ngOnInit(): void {
    }

    openProfileUserInformationDialog() {
        this.profileUserInformationDialog.openProfileUserInformationDialog()
            .beforeClosed()
            .subscribe((profileDialogType: EProfileDialogType) => {
                switch (profileDialogType) {
                    case EProfileDialogType.updatePassword:
                        this.openProfileUpdatePasswordDialog();
                        break;
                    case EProfileDialogType.logout:
                        this.logout();
                        break;
                }
            });
    }

    openProfileUpdatePasswordDialog() {
        this.profileUpdatePasswordDialog.openProfileUpdatePasswordDialog();
    }

    logout() {
        this.userStore.logout();
    }

}
