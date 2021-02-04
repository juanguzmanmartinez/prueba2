import { Injectable } from '@angular/core';
import { EndpointsParameter } from '@parameters/endpoints.parameter';
import { GenericService } from '@clients/generic/generic.service';
import { take } from 'rxjs/operators';
import { IAuthRequest, IAuthResponse } from '@interfaces/auth.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { EAuthCredentials } from '@parameters/auth.parameters';
import { EHttpHeaderContentTypes, EHttpHeaders } from '@parameters/http-header.parameter';


@Injectable()
export class AuthClientService {

    private readonly AUTH_TOKEN = EndpointsParameter.AUTH_TOKEN;

    constructor(
        private genericService: GenericService,
    ) {
    }

    signIn(request: IAuthRequest): Observable<IAuthResponse> {
        const endpoint = `${this.AUTH_TOKEN}`;

        request.grant_type = EAuthCredentials.grant_type;
        const body = new HttpParams({fromObject: {...request}}).toString();

        const header = new HttpHeaders({
            [EHttpHeaders.contentType]: EHttpHeaderContentTypes.xWwwFormUrlencoded,
            [EHttpHeaders.authorization]: `Basic ${btoa(EAuthCredentials.username + ':' + EAuthCredentials.password)}`
        });

        return this.genericService.genericPost<IAuthResponse>(endpoint, body, null, header)
            .pipe(take(1));
    }

    resetPassword(email: string) {
        return null;
    }

}
