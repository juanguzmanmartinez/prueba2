import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStoreService } from '@stores/user-store.service';
import { HTTP_ERROR } from '@parameters/error/error-code.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Router } from '@angular/router';
import { DialogOneActionService } from '@molecules/dialog/views/dialog-one-action/dialog-one-action.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userStore: UserStoreService,
        private _router: Router,
        private _dialogOneAction: DialogOneActionService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError(err => {
                    if ([HTTP_ERROR.unauthorized, HTTP_ERROR.forbidden].indexOf(err.status) !== -1) {
                        this.userStore.logout();
                        this.unauthorizedNewLogin(err.error);
                    }
                    if (err.status === HTTP_ERROR.internetConnectivity) {
                        this.notInternetConnection();
                    }

                    return throwError(err);
                })
            );
    }

    unauthorizedNewLogin(error: { code: string, message: string }) {
        if (error.code === HTTP_ERROR.unauthorizedNewLogin) {
            this._dialogOneAction.openWarning({
                    title: 'Has iniciado sesión en otro navegador',
                    description: 'Por favor, cierra la sesión en otros dispositivos y vuelve a ingresar.',
                    action: 'Aceptar'
                }
            );
        }
    }

    notInternetConnection() {
        this._router.navigate([ROUTER_PATH.notInternetConnection], {skipLocationChange: true});
    }
}
