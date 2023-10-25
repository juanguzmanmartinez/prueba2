import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'td[mat-cell],[mat-cell][cell-bold],[mat-cell][cell-double-text],[mat-cell][cell-center],[mat-cell][cell-right]'
})
export class TableCellDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.setCellStyle();
        this.setCellTextStyle();
        this.setCellPositionStyle();
    }

    setCellStyle() {
        const cellPadding = '24px';
        this.renderer.addClass(this.elementRef.nativeElement, 'border-0');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-body-1-regular');
        this.renderer.setStyle(this.elementRef.nativeElement, 'paddingLeft', cellPadding);
        this.renderer.setStyle(this.elementRef.nativeElement, 'paddingRight', cellPadding);
    }

    setCellTextStyle() {
        if (this.elementRef.nativeElement.hasAttribute('cell-bold')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-black');
            this.renderer.addClass(this.elementRef.nativeElement, 'text-h5');
        }
        if (this.elementRef.nativeElement.hasAttribute('cell-double-text')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-body-2-regular');
            this.renderer.addClass(this.elementRef.nativeElement, 'text-gray-5');
        }
    }

    setCellPositionStyle() {
        if (this.elementRef.nativeElement.hasAttribute('cell-center')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
        }
        if (this.elementRef.nativeElement.hasAttribute('cell-right')) {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-right');
        }
    }

}
