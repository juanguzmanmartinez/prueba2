import { Injectable } from '@angular/core';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { GenericService } from '@clients/generic/generic.service';
import { take } from 'rxjs/operators';
import { IAuthCodeRequest, IAuthRefreshTokenRequest, IAuthResponse, IAuthRestorePasswordRequest, IAuthSignInRequest } from '@interfaces/auth/auth.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CAuthCredentials } from '@parameters/auth/auth.parameters';
import { EHttpHeaderContentTypes, EHttpHeaders } from '@parameters/generic/http-header.parameter';


@Injectable()
export class AuthClientService {

    constructor(
        private genericService: GenericService,
    ) {
    }

    authToken(body: string): Observable<IAuthResponse> {
        const endpoint = `${EndpointsParameter.AUTH_TOKEN}`;

        const header = new HttpHeaders({
            [EHttpHeaders.contentType]: EHttpHeaderContentTypes.xWwwFormUrlencoded,
            [EHttpHeaders.authorization]: `Basic ${btoa(CAuthCredentials.username + ':' + CAuthCredentials.password)}`
        });

        return this.genericService.genericPost<IAuthResponse>(endpoint, body, null, header)
            .pipe(take(1));
    }

    signIn(iAuthSignInRequest: IAuthSignInRequest): Observable<IAuthResponse> {
        iAuthSignInRequest.grant_type = CAuthCredentials.grant_type_password;
        const body = new HttpParams({fromObject: {...iAuthSignInRequest}}).toString();
        return this.authToken(body);
    }

    refreshToken(iAuthRefreshTokenRequest: IAuthRefreshTokenRequest): Observable<IAuthResponse> {
        iAuthRefreshTokenRequest.grant_type = CAuthCredentials.grant_type_refresh_token;
        const body = new HttpParams({fromObject: {...iAuthRefreshTokenRequest}}).toString();
        return this.authToken(body);
    }

    sendPasswordCode(username: string): Observable<boolean> {
        const endpoint = `${EndpointsParameter.AUTH_SEND_CODE}`;
        const httpParams = new HttpParams()
            .set('email', String(username));
        return this.genericService.genericGet<boolean>(endpoint, httpParams)
            .pipe(take(1));
    }

    validPasswordCode(iAuthCodeRequest: IAuthCodeRequest): Observable<boolean> {
        const endpoint = `${EndpointsParameter.AUTH_VALID_CODE}`;
        return this.genericService.genericPost<boolean>(endpoint, iAuthCodeRequest)
            .pipe(take(1));
    }

    resetPassword(iAuthRestorePasswordRequest: IAuthRestorePasswordRequest): Observable<boolean> {
        const endpoint = `${EndpointsParameter.AUTH_RESET_PASSWORD}`;
        return this.genericService.genericPost<boolean>(endpoint, iAuthRestorePasswordRequest)
            .pipe(take(1));
    }

    updatePassword(password: string): Observable<boolean> {
        const endpoint = `${EndpointsParameter.AUTH_UPDATE_PASSWORD}`;
        return this.genericService.genericPost<boolean>(endpoint, {password})
            .pipe(take(1));
    }

}
