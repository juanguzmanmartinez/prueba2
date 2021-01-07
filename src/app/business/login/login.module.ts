import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IconsModule,
    InputsModule,
    ButtonsModule
  ]
})
export class LoginModule {
}
