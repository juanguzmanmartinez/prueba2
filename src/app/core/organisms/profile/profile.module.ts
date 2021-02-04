import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { ProfileUserInformationDialogComponent } from './views/profile-user-information-dialog/profile-user-information-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileUpdatePasswordDialogComponent } from './views/profile-update-password-dialog/profile-update-password-dialog.component';
import { ProfileDialogHeaderComponent } from './components/profile-dialog-header/profile-dialog-header.component';
import { CardModule } from '@molecules/cards/card.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { ProfileUserInformationDialogService } from '@organisms/profile/views/profile-user-information-dialog/profile-user-information-dialog.service';
import { ProfileUpdatePasswordDialogService } from '@organisms/profile/views/profile-update-password-dialog/profile-update-password-dialog.service';
import { UpdatePasswordFormModule } from '@organisms/update-password-form/update-password-form.module';


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileUserInformationDialogComponent,
        ProfileUpdatePasswordDialogComponent,
        ProfileDialogHeaderComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        MatDialogModule,
        CardModule,
        ButtonsModule,
        UpdatePasswordFormModule
    ], providers: [
        ProfileUserInformationDialogService,
        ProfileUpdatePasswordDialogService]
})
export class ProfileModule {
}
