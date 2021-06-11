import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsServiceModule } from '@clients/clients-service.module';
import { ImplementsServiceModule } from '@implements/implements-service.module';
import { TokenInterceptorService } from '@interceptors/token-interceptor.service';
import { AlertModule } from '@molecules/alert/alert.module';
import { InternetConnectivityInterceptor } from '@interceptors/internet-connectivity.interceptor.service';
import { ErrorInterceptor } from './error.interceptor.service';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { TimeOutInterceptorService } from '@interceptors/time-out.interceptor.service';

const SERVICES = [
    InternetConnectivityInterceptor,
    ErrorInterceptor,
    TokenInterceptorService,
    TimeOutInterceptorService
];


@NgModule({
    imports: [
        CommonModule,
        ClientsServiceModule,
        ImplementsServiceModule,
        AlertModule,
        DialogModule
    ],
    providers: [
        ...SERVICES
    ]
})
export class InterceptorsServiceModule {
}
