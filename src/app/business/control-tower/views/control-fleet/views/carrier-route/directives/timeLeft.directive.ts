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
    if (this.isNegative(textContent)) {
      this.renderer.addClass(this.el.nativeElement, 'text-error-60');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'text-neutral-90');
    }
  }

  isNegative(textContent: string) {
    const restSign = /-/;
    return restSign.test(textContent);
  }
}
