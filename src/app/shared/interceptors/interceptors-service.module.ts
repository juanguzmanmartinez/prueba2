import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsServiceModule } from '@clients/clients-service.module';
import { ErrorInterceptor } from './error.interceptor.service';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { AlertModule } from '@molecules/alert/alert.module';

const SERVICES = [
    ErrorInterceptor,
    TokenInterceptor
];


@NgModule({
    imports: [
        CommonModule,
        ClientsServiceModule,
        ImplementsServiceModule,
        AlertModule
    ],
    providers: [
        ...SERVICES
    ]
})
export class InterceptorsServiceModule {
}
