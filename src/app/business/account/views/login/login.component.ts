import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../form/login.form';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
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

    public resetPasswordPath = CONCAT_PATH.recoverPassword;

    constructor(
        public loginForm: LoginForm,
        private authImplement: AuthImplementService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }


    loginFormSubmit() {
        this.submitLogin = true;
        this.authImplement.signIn(
            this.loginForm.usernameControl.value,
            this.loginForm.passwordControl.value,
        )
            .subscribe(() => {
                this.router.navigate([CONCAT_PATH.operations]);
            }, () => {
                this.errorFormRequest();
            });
    }

    errorFormRequest() {
        this.submitLogin = false;
        this.loginForm.passwordControl.settingWrongDataValidator();
        this.loginForm.usernameControl.settingWrongDataValidator();
        this.resetFormValidators();
    }

    resetFormValidators() {
        const subscription = this.loginForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.loginForm.resetFormValidators();
        });
    }


}
