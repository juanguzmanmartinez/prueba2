import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileUserInformationDialogComponent } from '@organisms/profile/views/profile-user-information-dialog/profile-user-information-dialog.component';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class ProfileUserInformationDialogService {

    constructor(private dialog: DialogService) {
    }

    open(): MatDialogRef<ProfileUserInformationDialogComponent> {
        return this.dialog.open(ProfileUserInformationDialogComponent);
    }
}
