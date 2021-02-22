import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-header-cell][header-cell-center],[mat-header-cell][header-cell-center],[mat-header-cell][header-cell-right],[mat-header-cell][header-cell-bold]'
})
export class TableHeaderCellDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.hasAttribute('header-cell-center')) {
            if (this.elementRef.nativeElement.childElementCount) {
                this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'd-flex-center');
            } else {
                this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
            }
        }
        if (this.elementRef.nativeElement.hasAttribute('header-cell-right')) {
            if (this.elementRef.nativeElement.childElementCount) {
                this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'd-flex-horizontal-end');
            } else {
                this.renderer.addClass(this.elementRef.nativeElement, 'text-right');
            }
        }
        if (this.elementRef.nativeElement.hasAttribute('header-cell-bold')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-button');
        }
    }
}
