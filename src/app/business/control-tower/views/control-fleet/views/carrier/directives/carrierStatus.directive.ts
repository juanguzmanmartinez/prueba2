import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { ECarrierStatus } from '../constants/carrier.constant';

@Directive({
  selector: '[appCarrierStatus]',
})
export class CarrierStatusDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const textContent = this.el.nativeElement.textContent.trim();
    const classSelected = this.evaluateClass(textContent);
    this.renderer.addClass(this.el.nativeElement, classSelected);
  }

  evaluateClass(textContent: string) {
    let classSelected = '';
    switch (textContent) {
      case ECarrierStatus.disponible:
        classSelected = 'text-success-60';
        break;
      case ECarrierStatus.enRuta:
        classSelected = 'text-secondary-60';
        break;
      case ECarrierStatus.noDisponible:
        classSelected = 'text-neutral-60';
        break;
    }

    return classSelected;
  }
}
