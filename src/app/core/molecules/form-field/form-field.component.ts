import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { FormFieldLabelComponent } from '@molecules/form-field/form-field-label/form-field-label.component';
import { FormFieldErrorComponent } from '@molecules/form-field/form-field-error/form-field-error.component';
import { NgControl } from '@angular/forms';
import { InputComponent } from '@atoms/inputs/input/input.component';

@Component({
    selector: 'app-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {

    @ContentChild(FormFieldLabelComponent) formFieldLabel!: FormFieldLabelComponent;
    @ContentChild(FormFieldErrorComponent) formFieldErrorComponent!: FormFieldErrorComponent;

    @ContentChild(NgControl) public ngControl: NgControl;

    public formFieldError: boolean;

    constructor() {
    }

    ngAfterContentInit(): void {
        this.ngControl?.valueChanges.subscribe(() => {
            const valueAccessor = this.ngControl.valueAccessor as InputComponent;

            if (this.ngControl.invalid && this.ngControl.dirty) {
                this.formFieldError = !!this.formFieldErrorComponent;
                this.formFieldLabel?.errorField();
                valueAccessor.inputError = true;
            } else {
                this.formFieldError = false;
                this.formFieldLabel?.removeErrorField();
                valueAccessor.inputError = false;
            }
        });
    }

}
