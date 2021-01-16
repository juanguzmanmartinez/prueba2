import { Injectable } from '@angular/core';
import { User } from '@models/auth/user.model';
import { Role } from '@models/auth/role.model';
import { AuthClientService } from '@clients/auth/auth-client.service';


@Injectable({
    providedIn: 'root'
})
export class AuthImplementService {

    private user: User;

    constructor(
        private authClient: AuthClientService
    ) {
    }

    authenticated() {
        return !!this.user;
    }

    hasRole(role: Role) {
        return this.authenticated() && this.user.role === role;
    }

    get currentUser() {
        return this.user;
    }

    get currentUser$() {
        return this.authClient.currentUser$;
    }

    get sessionToken$() {
        return this.authClient.sessionToken$;
    }


    signUp(email: string, password: string) {
        return this.authClient.signUp(email, password);
    }

    signIn(email: string, password: string) {
        return this.authClient.signIn(email, password);
    }

    login(role: Role) {
        this.user = {role} as User;
    }


    resetPassword(email: string) {
        return this.authClient.resetPassword(email);

    }

    logout() {
        return this.authClient.logout();
    }

}
