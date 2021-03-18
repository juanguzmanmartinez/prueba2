import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class RecoveryPasswordStore implements OnDestroy {
    private _username: string;
    private _code: string;

    constructor() {
    }

    get username() {
        return this._username;
    }

    set username(username: string) {
        this._username = username;
    }

    get code() {
        return this._code;
    }

    set code(code: string) {
        this._code = code;
    }

    resetStore() {
        this.code = null;
        this.username = null;
    }

    ngOnDestroy() {
        this.resetStore();
    }
}
