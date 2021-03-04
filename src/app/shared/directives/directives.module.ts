import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { RolesDirective } from './roles/roles.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';
import { RouterAccessDirective } from './roles/router-access.directive';
import { EditionAccessDirective } from './roles/edition-access.directive';
import { DialogModule } from '@molecules/dialog/dialog.module';

const DIRECTIVES = [
    DigitsOnlyDirective,
    RolesDirective,
    CapsLockDirective,
    RouterAccessDirective,
    EditionAccessDirective
];

@NgModule({
    declarations: [
        ...DIRECTIVES,
    ],
    exports: [
        ...DIRECTIVES,
    ],
    imports: [
        CommonModule,
        DialogModule
    ]
})
export class DirectivesModule {
}
