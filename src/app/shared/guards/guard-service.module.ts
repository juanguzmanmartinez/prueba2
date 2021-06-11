import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleGuard } from '@guards/role-guard.service';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { AccountGuard } from '@guards/account.guard';
import { AuthGuard } from '@guards/auth.guard';

const SERVICES = [
    RoleGuard,
    AccountGuard,
    AuthGuard
];


@NgModule({
    imports: [
        CommonModule,
        ImplementsServiceModule
    ],
    providers: [
        ...SERVICES
    ]
})
export class GuardServiceModule {
}
