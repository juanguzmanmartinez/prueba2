import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthClientService {

    constructor(
    ) {
    }

    get currentUser$() {
        return null;
    }

    get sessionToken$() {
        return null;
    }


    signUp(email: string, password: string) {
        return null;
    }

    signIn(email: string, password: string) {
        return null;
    }

    resetPassword(email: string) {
        return null;
    }

    logout() {
        return null;
    }

}
