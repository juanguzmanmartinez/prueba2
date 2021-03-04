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
    @ContentChild(FormFieldErrorComponent, {static: false}) formFieldErrorComponent!: FormFieldErrorComponent;

    @ContentChild(NgControl, {static: true}) public ngControl: NgControl;

    public formFieldError: boolean;

    constructor() {
    }

    ngAfterContentInit(): void {
        this.ngControl?.valueChanges.subscribe(() => {
            const valueAccessor = this.ngControl.valueAccessor as InputComponent;
            const emptyValue = !!this.ngControl.value && (typeof this.ngControl.value === 'string');
            if (this.ngControl.invalid && this.ngControl.dirty && emptyValue) {
                this.formFieldError = !!this.formFieldErrorComponent;
                this.formFieldLabel?.errorField();
                valueAccessor.error = true;
            } else {
                this.formFieldError = false;
                this.formFieldLabel?.removeErrorField();
                valueAccessor.error = false;
            }
        });
    }

}
