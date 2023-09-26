import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTimeLeft]',
})
export class TimeLeftDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const textContent = this.el.nativeElement.textContent.trim();
    this.assignTextColor(textContent);
  }

  assignTextColor(textContent: string): void {
    let textClass = '';

    if (textContent === '-') {
      textClass = 'text-neutral-100';
    } else if (this.isNegative(textContent)) {
      textClass = 'text-error-60';
    } else {
      textClass = 'text-success-60';
    }

    this.renderer.addClass(this.el.nativeElement, textClass);
  }

  isNegative(textContent: string) {
    const restSign = /-/;
    return restSign.test(textContent);
  }
}
