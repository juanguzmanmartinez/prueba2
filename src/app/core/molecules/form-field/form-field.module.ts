import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '@molecules/form-field/form-field.component';
import { FormFieldLabelComponent } from './form-field-label/form-field-label.component';
import { FormFieldErrorComponent } from './form-field-error/form-field-error.component';

const COMPONENTS = [
    FormFieldComponent,
    FormFieldLabelComponent,
    FormFieldErrorComponent,
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule
    ]
})
export class FormFieldModule {
}
