import { Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

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
}
