import { Injectable } from '@angular/core';
import { Role } from '@parameters/auth/role.parameter';
import { User } from '@models/auth/user.model';
import { TokenStoreService } from '@stores/token-store.service';
import { IUser } from '@interfaces/auth/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreService {

    private user: User;
    private userSubject = new BehaviorSubject<User>(null);

    constructor(
        private _tokenStore: TokenStoreService,
        private _router: Router,
    ) {
        this._tokenStore.decodeToken$.subscribe((iDecodeToken) => {
            if (iDecodeToken) {
                this.decodeUser = this._tokenStore.decodeToken;
            } else {
                this.user = null;
            }
        });
    }

    set decodeUser(iUser: IUser) {
        this.user = new User(iUser);
        this.userSubject.next(this.user);
    }

    authenticated(): boolean {
        return !!this.user;
    }

    hasRole(role: Role): boolean {
        return this.authenticated() && this.user.role === role;
    }

    get currentUser(): User {
        return this.user;
    }

    get currentUser$(): Observable<User> {
        return this.userSubject.asObservable();
    }

    logout() {
        this.user = null;
        this.userSubject.next(null);
        this._tokenStore.removeAccessToken();
        this._router.navigate([ROUTER_PATH.login]);
    }
}
