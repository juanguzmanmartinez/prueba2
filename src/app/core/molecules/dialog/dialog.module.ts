import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '@molecules/dialog/dialog.service';
import { DialogDirective } from '@molecules/dialog/dialog.directive';
import { DialogCloseDirective } from '@molecules/dialog/directives/dialog-close.directive';
import { DialogEditButtonDirective } from '@molecules/dialog/directives/dialog-edit-button.directive';
import { DialogHeaderComponent } from '@molecules/dialog/components/dialog-header/dialog-header.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { DialogLoaderService } from '@molecules/dialog/views/dialog-loader/dialog-loader.service';
import { DialogLoaderComponent } from '@molecules/dialog/views/dialog-loader/dialog-loader.component';
import { DialogConfirmChangesComponent } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.component';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditionAccessComponent } from '@molecules/dialog/views/dialog-edition-access/dialog-edition-access.component';
import { DialogEditionAccessService } from '@molecules/dialog/views/dialog-edition-access/dialog-edition-access.service';
import { DialogTabDirective } from '@molecules/dialog/directives/dialog-tab.directive';

const DECLARATIONS = [
    DialogDirective,
    DialogCloseDirective,
    DialogEditButtonDirective,
    DialogTabDirective,
    DialogHeaderComponent,
    DialogLoaderComponent,
    DialogConfirmChangesComponent,
    DialogEditionAccessComponent
];

@NgModule({
    declarations: [
        ...DECLARATIONS
    ],
    exports: [
        ...DECLARATIONS
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        MatDialogModule
    ],
    providers: [
        DialogService,
        DialogLoaderService,
        DialogConfirmChangesService,
        DialogEditionAccessService
    ]
})
export class DialogModule {
}
