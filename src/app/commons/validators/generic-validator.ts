import { Validators, FormControl } from '@angular/forms';

const validCharacters = /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/;
const validNumbers = /^[0-9]*$/;

export class GenericValidator extends Validators {


  static validateNumbers(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length > 0) {
      const matches = validNumbers.test(control.value);
      return matches ? null : { validateNumbers: matches };
    } else {
      return null;
    }
  }
}
