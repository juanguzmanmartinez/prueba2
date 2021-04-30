import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'tr[mat-row],[mat-row][row-small],[mat-row][row-hover]'
})
export class TableRowDirective implements AfterViewInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.setRowStyle();
    }

    setRowStyle() {
        const rowElement = this.elementRef.nativeElement;
        const smallRow = this.elementRef.nativeElement.hasAttribute('row-small');
        const hoverRow = this.elementRef.nativeElement.hasAttribute('row-hover');
        const cellHeight = smallRow ? '48px' : '64px';

        this.renderer.setStyle(rowElement, 'height', cellHeight);
        this.renderer.addClass(rowElement, 'border-end');
        this.renderer.addClass(rowElement, 'border-start');
        this.renderer.addClass(rowElement, 'border-gray-1');
        this.renderer.addClass(rowElement, 'text-gray-6');

        if (hoverRow) {
            this.renderer.addClass(rowElement, 'row-hover');
        }
    }
}
