import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordFormComponent } from './update-password-form.component';
import { PasswordValidatorComponent } from './components/password-validator/password-validator.component';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@atoms/icons/icons.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';


@NgModule({
    declarations: [
        UpdatePasswordFormComponent,
        PasswordValidatorComponent
    ],
    exports: [
        UpdatePasswordFormComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        FormFieldModule,
        InputsModule,
        ReactiveFormsModule,
        IconsModule,
        DirectivesModule
    ]
})
export class UpdatePasswordFormModule {
}
