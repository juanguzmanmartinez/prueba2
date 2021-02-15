import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileUpdatePasswordDialogComponent } from '@organisms/profile/views/profile-update-password-dialog/profile-update-password-dialog.component';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class ProfileUpdatePasswordDialogService {

    constructor(private dialog: DialogService) {
    }

    openProfileUpdatePasswordDialog(): MatDialogRef<ProfileUpdatePasswordDialogComponent> {
        return this.dialog.open(ProfileUpdatePasswordDialogComponent);
    }
}
