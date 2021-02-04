import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';
import { EHttpHeaderContentTypes, EHttpHeaders } from '@parameters/http-header.parameter';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private allowedUrls = [
        environment.api_gateway,
    ];

    private unauthorizedUrls = [
        environment.api_gateway_auth
    ];

    constructor(
        private userStore: UserStoreService,
        private tokenStore: TokenStoreService
        ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url;
        const validUrl = this.allowedUrls.find((allowedUrl) => url.startsWith(allowedUrl));
        const unauthorizedUrls = this.unauthorizedUrls.filter(unauthorizedUrl => url.indexOf(unauthorizedUrl) !== -1).length;

        const isLoggedIn = this.userStore.authenticated();

        if (isLoggedIn && !!validUrl && !unauthorizedUrls) {
            request = request.clone({
                setHeaders: {
                    [EHttpHeaders.authorization]: `Bearer ${this.tokenStore.accessToken}`,
                    [EHttpHeaders.contentType]: EHttpHeaderContentTypes.json
                }
            });
        }

        return next.handle(request);
    }
}
