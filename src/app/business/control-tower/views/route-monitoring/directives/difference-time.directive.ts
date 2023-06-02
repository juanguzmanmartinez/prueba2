import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDifferenceTime]',
})
export class DifferenceTimetDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const textContent = this.el.nativeElement.textContent.trim();
    this.renderer.addClass(this.el.nativeElement, 'text-body-4-bold');
    this.assignTextColor(textContent);
  }

  assignTextColor(textContent: string): void {
    if (this.isNegative(textContent)) {
      this.renderer.addClass(this.el.nativeElement, 'text-success-60');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'text-error-60');
    }
  }

  isNegative(textContent: string) {
    const restSign = /-/;
    return restSign.test(textContent);
  }
}