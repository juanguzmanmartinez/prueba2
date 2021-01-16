import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './views/login/login.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { RecoverPasswordResetComponent } from './components/recover-password-reset/recover-password-reset.component';
import { AccountComponent } from './account.component';
import { LinksModule } from '@atoms/links/links.module';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { RecoverPasswordUserComponent } from './components/recover-password-user/recover-password-user.component';
import { RecoverPasswordCodeComponent } from './components/recover-password-code/recover-password-code.component';
import { UpdatePasswordFormModule } from '@organisms/update-password-form/update-password-form.module';

const COMPONENTS = [
    AccountComponent,
    LoginComponent,
    RecoverPasswordResetComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        AccountCardComponent,
        RecoverPasswordComponent,
        RecoverPasswordUserComponent,
        RecoverPasswordCodeComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        IconsModule,
        InputsModule,
        ButtonsModule,
        ReactiveFormsModule,
        DirectivesModule,
        FormFieldModule,
        LinksModule,
        UpdatePasswordFormModule
    ]
})
export class AccountModule {
}
