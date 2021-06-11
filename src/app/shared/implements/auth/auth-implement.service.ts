import { Injectable } from '@angular/core';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthResponse, IAuthRestorePasswordRequest } from '@interfaces/auth/auth.interface';
import { TokenStoreService } from '@stores/token-store.service';


@Injectable()
export class AuthImplementService {


    constructor(
        private authClient: AuthClientService,
        private tokenStore: TokenStoreService
    ) {
    }


    signIn(username: string, password: string): Observable<IAuthResponse> {
        return this.authClient.signIn({username, password})
            .pipe(
                map((iAuthResponse: IAuthResponse) => {
                    this.tokenStore.accessToken = iAuthResponse.access_token;
                    this.tokenStore.refreshToken = iAuthResponse.refresh_token;
                    return iAuthResponse;
                })
            );
    }

    refreshToken(refreshToken: string): Observable<IAuthResponse> {
        return this.authClient.refreshToken({refresh_token: refreshToken})
            .pipe(
                map((iAuthResponse: IAuthResponse) => {
                    this.tokenStore.accessToken = iAuthResponse.access_token;
                    this.tokenStore.refreshToken = iAuthResponse.refresh_token;
                    return iAuthResponse;
                })
            );
    }

    sendPasswordCode(username: string): Observable<boolean> {
        return this.authClient.sendPasswordCode(username);
    }

    validPasswordCode(email: string, code: string): Observable<boolean> {
        return this.authClient.validPasswordCode({email, code});
    }

    resetPassword(iAuthRestorePasswordRequest: IAuthRestorePasswordRequest) {
        return this.authClient.resetPassword(iAuthRestorePasswordRequest);
    }

    updatePassword(password: string) {
        return this.authClient.updatePassword(password);
    }

}
