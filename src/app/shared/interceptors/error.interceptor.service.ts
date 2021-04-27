import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { UserStoreService } from '@stores/user-store.service';
import { ERROR_CODE } from '@parameters/error/error-code.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Router } from '@angular/router';
import { DialogWarningService } from '@molecules/dialog/views/dialog-warning/dialog-warning.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userStore: UserStoreService,
        private _router: Router,
        private _dialogWarning: DialogWarningService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                timeout(3000),
                catchError(err => {
                    if ([ERROR_CODE.unauthorized, ERROR_CODE.forbidden].indexOf(err.status) !== -1) {
                        this.userStore.logout();
                        this.unauthorizedNewLogin(err.error);
                    }
                    if ([ERROR_CODE.internetConnectivity].indexOf(err.status) !== -1) {
                        this.notInternetConnection();
                    }

                    if (err instanceof TimeoutError) {
                        return throwError('Timeout Exception');
                    }

                    const error = err.error.message || err.statusText;
                    return throwError(error);
                })
            );
    }

    unauthorizedNewLogin(error: { code: string, message: string }) {
        if (error.code === ERROR_CODE.unauthorizedNewLogin) {
            this._dialogWarning.open(
                'Has iniciado sesión en otro navegador',
                'Por favor, cierra la sesión en otros dispositivos y vuelve a ingresar.',
                'Aceptar'
            );
        }
    }

    notInternetConnection() {
        this._router.navigate([ROUTER_PATH.notInternetConnection], {skipLocationChange: true});
    }
}
