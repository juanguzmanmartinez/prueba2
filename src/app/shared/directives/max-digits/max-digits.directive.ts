import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaxDigits]',
})
export class MaxDigitsDirective {
  @Input() appMaxDigits: number;
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputTrimmed = input.value.replace(/ /g, '');
    let inputFinal = inputTrimmed;
    if (inputTrimmed.length > this.appMaxDigits) {
      inputFinal = inputTrimmed.substring(0, this.appMaxDigits);
    }
    input.value = inputFinal;
    const valueControl = inputFinal === '' ? '' : Number(inputFinal);
    this.control.control.setValue(valueControl);
    input.focus();
  }
}
