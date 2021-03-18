import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@guards/auth.guard';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { AccountGuard } from '@guards/account.guard';

const SERVICES = [
    AuthGuard,
    AccountGuard
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
