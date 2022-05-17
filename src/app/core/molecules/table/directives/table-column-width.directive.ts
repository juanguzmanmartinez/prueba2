import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-header-cell][column-width],[mat-cell][column-width]'
})
export class TableColumnWidthDirective {

    @Input('column-width')
    set columnWidth(width: string) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }
}
