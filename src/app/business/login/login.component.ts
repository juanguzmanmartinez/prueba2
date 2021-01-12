import { Component, OnInit } from '@angular/core';
import { LoginFormService } from './form/login-form.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginFormService]
})
export class LoginComponent implements OnInit {

    public capsLock: boolean;

    constructor(
        public loginForm: LoginFormService
    ) {
    }

    ngOnInit(): void {
    }


    loginFormSubmit() {
        console.log(this.loginForm.loginForm$);
    }


}
