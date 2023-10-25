import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { AccountGuard } from '@guards/account.guard';
import { AuthGuard } from '@guards/auth.guard';

const SERVICES = [
    PermissionsGuard,
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
