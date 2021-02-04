import { Injectable } from '@angular/core';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthResponse } from '@interfaces/auth.interface';
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
                    return iAuthResponse;
                })
            );
    }

    resetPassword(email: string) {
        return this.authClient.resetPassword(email);

    }

}
