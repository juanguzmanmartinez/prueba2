import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HTTP_ERROR } from '@parameters/error/error-code.parameter';
import { catchError } from 'rxjs/operators';


@Injectable()
export class InternetConnectivityInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError(err => {
                    if (!window.navigator.onLine) {
                        const error = {
                            status: HTTP_ERROR.internetConnectivity,
                            error: {
                                description: 'Service Unavailable'
                            },
                            statusText: 'Service Unavailable'
                        };
                        return throwError(new HttpErrorResponse(error));
                    }
                    return throwError(err);
                })
            );
    }

}
