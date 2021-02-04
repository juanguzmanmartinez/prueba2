import { Injectable } from '@angular/core';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TokenStoreService {
    private readonly STORAGE_SESSION_TOKEN = 'access-token';
    private _accessToken: string;

    private accessTokenSubject = new BehaviorSubject<string>(null);

    constructor(private storage: StorageClientService) {
        this._accessToken = this.storedAccessToken;
        this.accessTokenSubject.next(this._accessToken);
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
        this.storedAccessToken = token;
    }

    removeAccessToken() {
        this._accessToken = null;
        this.accessTokenSubject.next(null);
        this.removeStoredAccessToken();
    }

}
