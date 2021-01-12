import { Injectable } from '@angular/core';
import { User } from '@models/auth/user.model';
import { Role } from '@models/auth/role.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: User;

    isAuthorized() {
        return !!this.user;
    }

    hasRole(role: Role) {
        return this.isAuthorized() && this.user.role === role;
    }

    login(role: Role) {
        this.user = {role};
    }

    logout() {
        this.user = null;
    }
}
