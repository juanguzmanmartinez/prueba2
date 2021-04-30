import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@interceptors/error.interceptor.service';
import { TokenInterceptorService } from '@interceptors/token-interceptor.service';
import { InternetConnectivityInterceptor } from '@interceptors/internet-connectivity.interceptor.service';
import { TimeOutInterceptorService } from '@interceptors/time-out.interceptor.service';


export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimeOutInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: InternetConnectivityInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
];
