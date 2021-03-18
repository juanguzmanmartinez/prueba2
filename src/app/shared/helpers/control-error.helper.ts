import { FormControl, FormGroup } from '@angular/forms';

export function getEnableErrorMessages(formControl: FormControl | FormGroup): boolean {
    return formControl.invalid && (formControl.touched || formControl.dirty);
}

export function getErrorByFormControl(formControl: FormControl | FormGroup, errorMessageArray: any): string {
    if (getEnableErrorMessages(formControl)) {
        if (formControl.errors) {
            const errorKeys = Object.keys(formControl.errors);
            const currentKey = errorKeys[0];
            return errorMessageArray[currentKey];
        }
    }
    return '';
}

export function resetControlHelper(control: FormControl) {
    control.setValue('');
    control.markAsUntouched();
    control.markAsPristine();
}

