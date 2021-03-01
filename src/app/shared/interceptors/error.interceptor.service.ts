import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStoreService } from '@stores/user-store.service';
import { AlertService } from '@molecules/alert/alert.service';
import { ERROR_MESSAGE } from '@parameters/error/error-message.parameter';
import { ERROR_CODE } from '@parameters/error/error-code.parameter';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userStore: UserStoreService,
        private alertService: AlertService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([ERROR_CODE.unauthorized, ERROR_CODE.forbidden].indexOf(err.status) !== -1) {
                this.userStore.logout();
                this.unauthorizedNewLogin(err.error);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

    unauthorizedNewLogin(error: { code: string, message: string }) {
        if (error.code === ERROR_CODE.unauthorizedNewLogin) {
            const message = error.message || ERROR_MESSAGE.newLogin;
            this.alertService.alertError(message);
        }
    }
}
