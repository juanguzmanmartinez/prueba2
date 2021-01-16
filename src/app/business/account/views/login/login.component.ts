import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../form/login.form';
import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router-path.parameter';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { Role } from '@models/auth/role.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginForm]
})
export class LoginComponent implements OnInit {

    public capsLock: boolean;
    public submitLogin: boolean;

    public resetPasswordPath = `/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}`;

    constructor(
        public loginForm: LoginForm,
        private authService: AuthImplementService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }


    loginFormSubmit() {
        this.submitLogin = true;
        this.authService.login(Role.Admin);
        this.router.navigate([BUSINESS_PATH.operations]);
        // this.loginForm.passwordControl.settingWrongDataValidator();
        // this.loginForm.userControl.settingWrongDataValidator();
        // this.resetFormValidators();
    }

    resetFormValidators() {
        const subscription = this.loginForm.form$.valueChanges.subscribe(() => {
            subscription.unsubscribe();
            this.loginForm.resetFormValidators();
        });
    }

    forgotPassword() {

    }


}
