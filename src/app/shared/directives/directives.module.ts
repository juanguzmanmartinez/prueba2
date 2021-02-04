import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { RolesDirective } from './roles/roles.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';

const DIRECTIVES = [
    DigitsOnlyDirective,
    RolesDirective,
];

@NgModule({
    declarations: [
        ...DIRECTIVES,
        CapsLockDirective
    ],
    exports: [
        ...DIRECTIVES,
        CapsLockDirective
    ],
    imports: [
        CommonModule
    ]
})
export class DirectivesModule {
}
