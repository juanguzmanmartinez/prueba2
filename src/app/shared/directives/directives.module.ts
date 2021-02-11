import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { RolesDirective } from './roles/roles.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';
import { RouterAccessDirective } from './roles/router-access.directive';

const DIRECTIVES = [
    DigitsOnlyDirective,
    RolesDirective,
    CapsLockDirective,
    RouterAccessDirective,
];

@NgModule({
    declarations: [
        ...DIRECTIVES,
    ],
    exports: [
        ...DIRECTIVES,
    ],
    imports: [
        CommonModule
    ]
})
export class DirectivesModule {
}
