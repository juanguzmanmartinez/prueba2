import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmountReverse]',
})
export class AmountReverseDirective {
  @HostListener('keydown', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }
  @HostListener('click', ['$event'])
  onClick(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log('inputvalue', input.value);
    let trimmedAndVocabulary = input.value.replace(/[^0-9]+/g, '');
    let inputCasted = 0;
    console.log('trime', trimmedAndVocabulary);
    if (!trimmedAndVocabulary) {
      trimmedAndVocabulary = '0.00';
    } else {
      // console.log('tonumber', Number(trimmedAndVocabulary));
      // trimmedAndVocabulary =
      //   Number(trimmedAndVocabulary) !== 0
      //     ? (Number(trimmedAndVocabulary) / 100).toFixed(2).toString()
      //     : '0.00';
      inputCasted = Number(trimmedAndVocabulary);
      trimmedAndVocabulary =
        inputCasted !== 0 ? (inputCasted / 100).toFixed(2).toString() : '0.00';
      
      console.log(trimmedAndVocabulary);
    }
    input.value = `S/ ${trimmedAndVocabulary}`;
    input.focus();
  }
}
