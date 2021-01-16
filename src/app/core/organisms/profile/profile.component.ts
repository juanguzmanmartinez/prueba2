import { Component, OnInit } from '@angular/core';
import { ProfileUserInformationDialogService } from '@organisms/profile/components/profile-user-information-dialog/profile-user-information-dialog.service';
import { ProfileUpdatePasswordDialogService } from '@organisms/profile/components/profile-update-password-dialog/profile-update-password-dialog.service';
import { EProfileDialogType } from '@organisms/profile/parameters/profile-dialog-type.parameter';
import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router-path.parameter';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    constructor(
        private router: Router,
        public profileUserInformationDialog: ProfileUserInformationDialogService,
        public profileUpdatePasswordDialog: ProfileUpdatePasswordDialogService
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
        this.router.navigate([`/${BUSINESS_PATH.login}/${LOGIN_PATH.login}`]);
    }

}
