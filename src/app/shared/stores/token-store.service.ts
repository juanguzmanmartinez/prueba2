import { Injectable } from '@angular/core';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDecodeToken } from '@interfaces/auth/token.interface';
import { JwtDecodeToken } from '@helpers/jwt-decode.helper';
import { TokenDetail } from '@models/auth/token.model';

@Injectable()
export class TokenStoreService {
    private readonly STORAGE_SESSION_TOKEN = 'access-token';
    private _accessToken: string;
    private _tokenDetail: TokenDetail;
    private _decodeToken: IDecodeToken;

    private accessTokenSubject = new BehaviorSubject<string>(null);
    private decodeTokenSubject = new BehaviorSubject<IDecodeToken>(null);

    constructor(private storage: StorageClientService) {
        this.accessToken = this.storedAccessToken;
        this.accessToken$.subscribe((token) => {
            if (token) {
                this.decodeToken = this.tokenDecoder;
            }
        });
    }

    private set storedAccessToken(token: string) {
        const {storage, STORAGE_SESSION_TOKEN} = this;
        storage.setStorageItem(STORAGE_SESSION_TOKEN, token);
    }

    private get storedAccessToken(): string {
        const {storage, STORAGE_SESSION_TOKEN} = this;
        return storage.getStorageItem(STORAGE_SESSION_TOKEN);
    }

    private removeStoredAccessToken(): void {
        const {storage, STORAGE_SESSION_TOKEN} = this;
        storage.removeStorageItem(STORAGE_SESSION_TOKEN);
    }


    get accessToken$(): Observable<string> {
        return this.accessTokenSubject.asObservable();
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(token: string) {
        this._accessToken = token;
        this.accessTokenSubject.next(token);
        if (token) {
            this.storedAccessToken = token;
        }
    }

    removeAccessToken() {
        this.accessToken = null;
        this.decodeToken = null;
        this.removeStoredAccessToken();
    }


    get decodeToken$(): Observable<IDecodeToken> {
        return this.decodeTokenSubject.asObservable();
    }

    get decodeToken(): IDecodeToken {
        return this._decodeToken;
    }

    set decodeToken(decodeToken: IDecodeToken) {
        this._decodeToken = decodeToken;
        this.decodeTokenSubject.next(decodeToken);
        this.tokenDetail = decodeToken ? new TokenDetail(decodeToken) : null;
    }

    get tokenDecoder(): IDecodeToken {
        return JwtDecodeToken<IDecodeToken>(this.accessToken);
    }


    get tokenDetail(): TokenDetail {
        return this._tokenDetail;
    }

    set tokenDetail(tokenDetail: TokenDetail) {
        this._tokenDetail = tokenDetail;
    }

}
