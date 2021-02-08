import { Injectable } from '@angular/core';
import { Role } from '@models/auth/role.model';
import { User } from '@models/auth/user.model';
import { TokenStoreService } from '@stores/token-store.service';
import { IUser } from '@interfaces/auth/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreService {

    private user: User;
    private userSubject = new BehaviorSubject<User>(null);

    constructor(
        private tokenStore: TokenStoreService,
        private router: Router,
    ) {
        this.tokenStore.decodeToken$.subscribe((iDecodeToken) => {
            if (iDecodeToken) {
                this.decodeUser = this.tokenStore.decodeToken;
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
        this.tokenStore.removeAccessToken();
        this.router.navigate([CONCAT_PATH.login]);
    }
}
