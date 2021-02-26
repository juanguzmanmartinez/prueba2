import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '@molecules/dialog/dialog.service';
import { DialogDirective } from '@molecules/dialog/dialog.directive';
import { DialogCloseDirective } from '@molecules/dialog/directives/dialog-close/dialog-close.directive';
import { DialogEditButtonDirective } from '@molecules/dialog/directives/dialog-edit/dialog-edit-button.directive';
import { DialogHeaderComponent } from '@molecules/dialog/components/dialog-header/dialog-header.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { DialogLoaderService } from '@molecules/dialog/views/dialog-loader/dialog-loader.service';
import { DialogLoaderComponent } from '@molecules/dialog/views/dialog-loader/dialog-loader.component';

const DECLARATIONS = [
    DialogDirective,
    DialogCloseDirective,
    DialogEditButtonDirective,
    DialogHeaderComponent,
    DialogLoaderComponent
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
        IconsModule
    ],
    providers: [
        DialogService,
        DialogLoaderService
    ]
})
export class DialogModule {
}
