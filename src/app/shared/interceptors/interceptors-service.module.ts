import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsServiceModule } from '@clients/clients-service.module';
import { ErrorInterceptor } from './error.interceptor.service';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { TokenInterceptor } from '@interceptors/token.interceptor';

const SERVICES = [
    ErrorInterceptor,
    TokenInterceptor
];


@NgModule({
    imports: [
        CommonModule,
        ClientsServiceModule,
        ImplementsServiceModule
    ],
    providers: [
        ...SERVICES
    ]
})
export class InterceptorsServiceModule {
}
