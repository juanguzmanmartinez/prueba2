import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserStoreService } from '@stores/user-store.service';
import { User } from '@models/auth/user.model';
import { RolesNames } from '@models/auth/role.model';

@Component({
    selector: 'app-profile-update-password-dialog',
    templateUrl: './profile-update-password-dialog.component.html',
    styleUrls: ['./profile-update-password-dialog.component.scss']
})
export class ProfileUpdatePasswordDialogComponent implements OnInit {

    public user: User;
    public rolesNames = RolesNames;

    constructor(
        public dialogRef: MatDialogRef<ProfileUpdatePasswordDialogComponent>,
        private userStore: UserStoreService) {
        this.user = this.userStore.currentUser;
    }

    ngOnInit(): void {
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
