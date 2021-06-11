import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'th[mat-header-cell],th[header-cell-center],th[header-cell-right]'
})
export class TableHeaderCellDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.setHeaderCellStyle();
        this.setHeaderCellPositionStyle();

    }

    setHeaderCellStyle() {
        const borderRadius = '12px';
        const headerCellPadding = '24px';
        if (this.elementRef.nativeElement.cellIndex === 0) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'border-top-left-radius', borderRadius);
        }
        if (this.elementRef.nativeElement.parentElement.childElementCount === (this.elementRef.nativeElement.cellIndex + 1)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'border-top-right-radius', borderRadius);
        }

        this.renderer.addClass(this.elementRef.nativeElement, 'text-label');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-white');
        this.renderer.addClass(this.elementRef.nativeElement, 'border-0');
        this.renderer.setStyle(this.elementRef.nativeElement, 'paddingLeft', headerCellPadding);
        this.renderer.setStyle(this.elementRef.nativeElement, 'paddingRight', headerCellPadding);

    }

    setHeaderCellPositionStyle() {
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
    }
}
