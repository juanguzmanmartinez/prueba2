import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@interceptors/error.interceptor.service';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { InternetConnectivityInterceptor } from '@interceptors/internet-connectivity.interceptor.service';


export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: InternetConnectivityInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
];
