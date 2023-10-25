import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[app-dialog-container]',
})
export class DialogDirective implements AfterViewInit {
  @Input() widthOverlay: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setDialogContainerStyle();
  }

  setDialogContainerStyle() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'padding',
      '35px 0 24px'
    );

    const matDialogContainerElement = this.elementRef.nativeElement
      .parentElement.parentElement as HTMLElement;
    this.renderer.addClass(matDialogContainerElement, 'shadow-none');
    this.renderer.addClass(matDialogContainerElement, 'rounded');
    this.renderer.addClass(matDialogContainerElement, 'p-0');
    this.renderer.addClass(matDialogContainerElement, 'position-relative');
    this.renderer.addClass(matDialogContainerElement, 'text-black');

    const overlayElement = matDialogContainerElement.parentElement;
    this.renderer.setStyle(overlayElement, 'max-width', '90vw');
    this.renderer.setStyle(
      overlayElement,
      'transition',
      'width .5s, height .5s'
    );

    if (this.widthOverlay) {
      this.renderer.setStyle(overlayElement, 'width', this.widthOverlay);
    }
  }
}
