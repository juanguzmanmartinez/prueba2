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
  
    let trimmedAndVocabulary = input.value.replace(/[^0-9]+/g, '');

    if (!trimmedAndVocabulary) {
      trimmedAndVocabulary = '0.00';
    } else {
      trimmedAndVocabulary =
        Number(trimmedAndVocabulary) !== 0
          ? (Number(trimmedAndVocabulary) / 100).toString()
          : '0.00';
    }
    input.value = `S/ ${trimmedAndVocabulary}`;
    input.focus();
  }
}
