import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'tr[mat-header-row]'
})
export class TableHeaderRowDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'bg-gray-5');
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', '50px');
    }
}
