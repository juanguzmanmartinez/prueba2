import { Injectable } from '@angular/core';
import { ProfileUserInformationDialogService } from '@organisms/profile/views/profile-user-information-dialog/profile-user-information-dialog.service';
import { ProfileUpdatePasswordDialogService } from '@organisms/profile/views/profile-update-password-dialog/profile-update-password-dialog.service';

@Injectable()
export class ProfileService {
    constructor(
        public profileUserInformationDialog: ProfileUserInformationDialogService,
        public profileUpdatePasswordDialog: ProfileUpdatePasswordDialogService,
    ) {
    }

    openProfile() {
        this.profileUserInformationDialog.open()
            .beforeClosed()
            .subscribe((status: boolean) => {
                if (status) {
                    this.profileUpdatePasswordDialog.openProfileUpdatePasswordDialog();
                }
            });
    }
}
