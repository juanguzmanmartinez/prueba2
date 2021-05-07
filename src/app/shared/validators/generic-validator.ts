import { AbstractControl, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';

const validCharacters = /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/;
const validNumbers = /^[0-9]*$/;

export class GenericValidator extends Validators {


    static validateNumbers(control: FormControl): { [key: string]: boolean } | null {
        if (control.value && control.value.length > 0) {
            const matches = validNumbers.test(control.value);
            return matches ? null : {validateNumbers: matches};
        } else {
            return null;
        }
    }

    static validateNumberMaxLength(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const stringValue = control.value ? control.value.toString() : '';
            const maxValue = !isNaN(max) ? Number(Array.from({length: max}, () => 9).join('')) : 1;
            if (control.value && (isNaN(control.value) || stringValue.length > max || control.value > maxValue)) {
                return {range: true};
            }
            return null;
        };
    }

    static validateNumberMin(min: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const value = control.value && !isNaN(control.value) ? control.value : 0;
            const minValue = !isNaN(min) ? min : 0;
            if (value < minValue) {
                return {validateNumberMin: true};
            }
            return null;
        };
    }

    static wrongData(): ValidatorFn {
        return (): { [key: string]: boolean } | null => {
            return {wrongData: true};
        };
    }

    static compareWithSiblingControlValue(controlToCompare: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const siblingControl = control.parent.get(controlToCompare);
            if (control.value !== siblingControl?.value) {
                return {differentValues: true};
            }
            return null;
        };
    }

    static validateAtLeastOneUpperCaseLetterExist(control: AbstractControl): { [key: string]: boolean } | null {
        const pattern = /(.*[A-Z].*)/;
        if (!pattern.test(control.value)) {
            return {upperCaseError: true};
        }
        return null;
    }

    static validateAtLeastOneLowerCaseLetterExist(control: AbstractControl): { [key: string]: boolean } | null {
        const pattern = /(.*[a-z].*)/;
        if (!pattern.test(control.value)) {
            return {lowerCaseError: true};
        }
        return null;
    }

    static validateAtLeastOneNumberOrCharacterExist(control: AbstractControl): { [key: string]: boolean } | null {
        const pattern = /(.*[-+_!@#$%^&*.,?\d].*)/;
        if (!pattern.test(control.value)) {
            return {numberOrCharacterError: true};
        }
        return null;
    }

    static validateAtLeastOneCheckboxChecked(): ValidatorFn {
        return (formArray: FormArray): { [key: string]: any } | null => {
            const checkedControl = formArray.controls
                .filter((control) => control.value.checked);
            if (!checkedControl || !checkedControl.length) {
                return {validateAtLeastOneCheckboxChecked: true};
            }
            return null;
        };
    }

    static validateStringEmptiness(control: AbstractControl): { [key: string]: boolean } | null {
        const validString = !!control.value;
        if (!validString) {
            return {lowerCaseError: true};
        }
        return null;
    }
}
