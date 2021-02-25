import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'table[mat-table]'
})
export class TableDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'w-100');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-gray-6');
    }
}
