import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserStoreService } from '@stores/user-store.service';
import { User } from '@models/auth/user.model';
import { RolesNames } from '@models/auth/role.model';
import { UpdatePasswordFormComponent } from '@organisms/update-password-form/update-password-form.component';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { AlertService } from '@molecules/alert/alert.service';
import { CUpdatePasswordMessages } from '@organisms/update-password-form/parameters/update-password-messages.parameter';

@Component({
    selector: 'app-profile-update-password-dialog',
    templateUrl: './profile-update-password-dialog.component.html',
    styleUrls: ['./profile-update-password-dialog.component.scss']
})
export class ProfileUpdatePasswordDialogComponent implements OnInit {

    public submitForm: boolean;
    public user: User;
    public rolesNames = RolesNames;

    @ViewChild('updatePasswordForm', {static: false}) updatePasswordForm: UpdatePasswordFormComponent;

    constructor(
        private authImplement: AuthImplementService,
        private  alertService: AlertService,
        public dialogRef: MatDialogRef<ProfileUpdatePasswordDialogComponent>,
        private userStore: UserStoreService) {
    }

    ngOnInit(): void {
        this.user = this.userStore.currentUser;
    }

    formSubmitted(password: string): void {
        this.submitForm = true;
        this.authImplement.updatePassword(password)
            .subscribe(
                () => this.validResetPassword(),
                () => this.invalidResetPassword());
    }

    validResetPassword() {
        this.alertService.alertSuccess(CUpdatePasswordMessages.success);
        this.formCancelled();
    }

    invalidResetPassword() {
        this.alertService.alertError(CUpdatePasswordMessages.error);
        this.formCancelled();
    }

    formCancelled() {
        this.updatePasswordForm.resetPasswordForm();
        this.dialogRef.close();
    }
}
