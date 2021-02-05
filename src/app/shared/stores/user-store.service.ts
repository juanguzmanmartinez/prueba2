import { Injectable } from '@angular/core';
import { Role } from '@models/auth/role.model';
import { User } from '@models/auth/user.model';
import { TokenStoreService } from '@stores/token-store.service';
import { JwtDecodeToken } from '@helpers/jwt-decode.helper';
import { IUser } from '@interfaces/user.interface';
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
        this.tokenStore.accessToken$.subscribe((accessToken) => {
            if (accessToken) {
                this.userFromToken = accessToken;
            } else {
                this.user = null;
            }
        });
    }

    set userFromToken(accessToken: string) {
        const tokenUser = JwtDecodeToken<IUser>(accessToken);
        this.user = new User(tokenUser);
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
