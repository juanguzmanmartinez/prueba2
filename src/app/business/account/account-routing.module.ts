import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RecoverPasswordResetComponent } from './components/recover-password-reset/recover-password-reset.component';
import { LOGIN_PATH } from '@parameters/router-path.parameter';
import { AccountComponent } from './account.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { RecoverPasswordUserComponent } from './components/recover-password-user/recover-password-user.component';
import { RecoverPasswordCodeComponent } from './components/recover-password-code/recover-password-code.component';

const routes: Routes = [
    {
        path: '', component: AccountComponent, children: [
            {path: '', redirectTo: LOGIN_PATH.login, pathMatch: 'full'},
            {path: LOGIN_PATH.login, component: LoginComponent, pathMatch: 'full'},
            {
                path: LOGIN_PATH.recoverPassword, component: RecoverPasswordComponent, children: [
                    {path: LOGIN_PATH.recoverPasswordUser, component: RecoverPasswordUserComponent, pathMatch: 'full'},
                    {path: LOGIN_PATH.recoverPasswordCode, component: RecoverPasswordCodeComponent, pathMatch: 'full'},
                    {path: LOGIN_PATH.recoverPasswordReset, component: RecoverPasswordResetComponent, pathMatch: 'full'},
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
