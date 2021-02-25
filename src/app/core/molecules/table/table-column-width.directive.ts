import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-header-cell][columnWidth],[mat-cell][columnWidth]'
})
export class TableColumnWidthDirective {

    @Input()
    set columnWidth(width: string) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }
}
