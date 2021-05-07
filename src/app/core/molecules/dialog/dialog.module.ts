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
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogTabDirective } from '@molecules/dialog/directives/dialog-tab.directive';
import { DialogOneActionComponent } from '@molecules/dialog/views/dialog-one-action/dialog-one-action.component';
import { DialogOneActionService } from '@molecules/dialog/views/dialog-one-action/dialog-one-action.service';
import { DialogTwoActionsComponent } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.component';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { DialogGenericErrorComponent } from '@molecules/dialog/components/dialog-generic-error/dialog-generic-error.component';

const DECLARATIONS = [
    DialogDirective,
    DialogCloseDirective,
    DialogEditButtonDirective,
    DialogTabDirective,
    DialogHeaderComponent,
    DialogLoaderComponent,
    DialogOneActionComponent,
    DialogTwoActionsComponent,
    DialogGenericErrorComponent,
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
        DialogOneActionService,
        DialogTwoActionsService
    ]
})
export class DialogModule {
}
