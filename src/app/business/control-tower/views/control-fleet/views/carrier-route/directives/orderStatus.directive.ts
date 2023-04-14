import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { EOrderStatus } from '../constants/order.constant';

@Directive({
  selector: '[appOrderStatus]',
})
export class OrderStatusDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const textContent = this.el.nativeElement.textContent.trim();
    const classSelected = this.evaluateClass(textContent);
    this.renderer.addClass(this.el.nativeElement, classSelected);
  }

  evaluateClass(textContent: string) {
    let classSelected = '';
    switch (textContent) {
      case EOrderStatus.entregado:
        classSelected = 'text-success-60';
        break;
      case EOrderStatus.rechazado:
      case EOrderStatus.cancelado:
        classSelected = 'text-error-60';
        break;
      case EOrderStatus.enRuta:
        classSelected = 'text-secondary-60';
        break;
      case EOrderStatus.asignado:
        classSelected = 'text-neutral-60';
        break;
    }

    return classSelected;
  }
}
