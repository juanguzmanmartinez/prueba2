import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'tr[mat-header-row]'
})
export class TableHeaderRowDirective implements AfterViewInit {

  private color = 'bg-gray-5';

  @Input('class-color')
  set classColor(color: string) {
    this.color = color;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.renderer.addClass(this.elementRef.nativeElement, this.color);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', '48px');
  }
}
