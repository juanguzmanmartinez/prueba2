import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { UserRoleDirective } from './user-role/user-role.directive';
import { UserDirective } from './user-role/user.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';

const DIRECTIVES = [
    DigitsOnlyDirective,
    UserRoleDirective,
    UserDirective
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
