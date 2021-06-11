import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HTTP_ERROR } from '@parameters/error/error-code.parameter';
import { catchError, timeout } from 'rxjs/operators';


@Injectable()
export class TimeOutInterceptorService implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                timeout(30000),
                catchError((err) => {
                    if (err.name === HTTP_ERROR.timeout.name) {
                        const error = {
                            status: HTTP_ERROR.timeout.status,
                            error: {
                                description: HTTP_ERROR.timeout.description
                            },
                            statusText: HTTP_ERROR.timeout.description
                        };
                        return throwError(new HttpErrorResponse(error));
                    }
                    return throwError(err);
                })
            );
    }

}
