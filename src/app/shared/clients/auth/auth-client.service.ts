import { Injectable } from '@angular/core';
import { EndpointsParameter } from '@parameters/endpoints.parameter';
import { GenericService } from '@clients/generic/generic.service';
import { take } from 'rxjs/operators';
import { IAuthCodeRequest, IAuthRequest, IAuthResponse, IAuthRestorePasswordRequest } from '@interfaces/auth.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { EAuthCredentials } from '@parameters/auth.parameters';
import { EHttpHeaderContentTypes, EHttpHeaders } from '@parameters/http-header.parameter';


@Injectable()
export class AuthClientService {

    constructor(
        private genericService: GenericService,
    ) {
    }

    signIn(iAuthRequest: IAuthRequest): Observable<IAuthResponse> {
        const endpoint = `${EndpointsParameter.AUTH_TOKEN}`;

        iAuthRequest.grant_type = EAuthCredentials.grant_type;
        const body = new HttpParams({fromObject: {...iAuthRequest}}).toString();

        const header = new HttpHeaders({
            [EHttpHeaders.contentType]: EHttpHeaderContentTypes.xWwwFormUrlencoded,
            [EHttpHeaders.authorization]: `Basic ${btoa(EAuthCredentials.username + ':' + EAuthCredentials.password)}`
        });

        return this.genericService.genericPost<IAuthResponse>(endpoint, body, null, header)
            .pipe(take(1));
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
