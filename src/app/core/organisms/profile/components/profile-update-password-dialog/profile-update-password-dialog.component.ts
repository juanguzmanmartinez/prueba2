import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-profile-update-password-dialog',
    templateUrl: './profile-update-password-dialog.component.html',
    styleUrls: ['./profile-update-password-dialog.component.scss']
})
export class ProfileUpdatePasswordDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ProfileUpdatePasswordDialogComponent>,
    ) {
    }

    ngOnInit(): void {
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
