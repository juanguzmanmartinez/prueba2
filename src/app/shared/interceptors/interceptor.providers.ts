import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@interceptors/error.interceptor.service';
import { TokenInterceptor } from '@interceptors/token.interceptor';


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
