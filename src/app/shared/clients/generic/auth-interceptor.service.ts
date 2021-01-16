import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthImplementService } from '@implements/auth/auth-implement.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private allowedUrls = [
        environment.api_gateway,
        environment.api_gateway_calendar
    ];

    private unauthorizedUrls = [];

    constructor(private authService: AuthImplementService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url;
        const validUrl = this.allowedUrls.find((allowedUrl) => url.startsWith(allowedUrl));
        const unauthorizedUrls = this.unauthorizedUrls.filter(unauthorizedUrl => url.indexOf(unauthorizedUrl) !== -1).length;

        const currentUser = this.authService.currentUser;
        const isLoggedIn = currentUser && currentUser.token;

        if (isLoggedIn && !!validUrl && !unauthorizedUrls) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
