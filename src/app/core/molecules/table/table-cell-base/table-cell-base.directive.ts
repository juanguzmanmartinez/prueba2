import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-cell][cell-bold],[mat-cell][cell-double-text],[mat-cell][cell-center],[mat-cell][cell-right]'
})
export class TableCellBaseDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.hasAttribute('cell-bold')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-black');
            this.renderer.addClass(this.elementRef.nativeElement, 'text-button');
        }
        if (this.elementRef.nativeElement.hasAttribute('cell-double-text')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-gray-5');
            this.renderer.addClass(this.elementRef.nativeElement, 'text-caption');
        }
        if (this.elementRef.nativeElement.hasAttribute('cell-center')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
        }
        if (this.elementRef.nativeElement.hasAttribute('cell-right')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-right');
        }

    }
}
