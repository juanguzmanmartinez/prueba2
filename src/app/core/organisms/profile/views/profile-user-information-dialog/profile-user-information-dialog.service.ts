import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileUserInformationDialogComponent } from '@organisms/profile/views/profile-user-information-dialog/profile-user-information-dialog.component';

@Injectable()
export class ProfileUserInformationDialogService {

    constructor(private dialog: MatDialog) {
    }

    openProfileUserInformationDialog(): MatDialogRef<ProfileUserInformationDialogComponent> {
        return this.dialog.open(ProfileUserInformationDialogComponent, {
            width: '526px',
            minHeight: '347px'
        });
    }
}
