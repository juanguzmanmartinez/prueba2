import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../form/login.form';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginForm]
})
export class LoginComponent implements OnInit {

    public capsLock: boolean;
    public submitLogin: boolean;

    public resetPasswordPath = ROUTER_PATH.acctRecoverPassword;

    constructor(
        public _loginForm: LoginForm,
        private _authImplement: AuthImplementService,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
    }


    loginFormSubmit() {
        this.submitLogin = true;
        this._authImplement.signIn(
            this._loginForm.usernameControl.value,
            this._loginForm.passwordControl.value,
        )
            .subscribe(() => {
                this._router.navigate([ROUTER_PATH.base]);
            }, () => {
                this.errorFormRequest();
            });
    }

    errorFormRequest() {
        this.submitLogin = false;
        this._loginForm.passwordControl.settingWrongDataValidator();
        this._loginForm.usernameControl.settingWrongDataValidator();
        this.resetFormValidators();
    }

    resetFormValidators() {
        const subscription = this._loginForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this._loginForm.resetFormValidators();
        });
    }


}
