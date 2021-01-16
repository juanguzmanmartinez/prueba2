import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileUpdatePasswordDialogComponent } from '@organisms/profile/components/profile-update-password-dialog/profile-update-password-dialog.component';

@Injectable()
export class ProfileUpdatePasswordDialogService {

    constructor(private dialog: MatDialog) {
    }

    openProfileUpdatePasswordDialog(): MatDialogRef<ProfileUpdatePasswordDialogComponent> {
        return this.dialog.open(ProfileUpdatePasswordDialogComponent, {
            width: '526px',
            minHeight: '347px'
        });
    }
}
