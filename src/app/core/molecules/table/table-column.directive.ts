import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-cell][column-selector],[mat-header-cell][column-selector],' +
        '[mat-cell][column-actions],[mat-header-cell][column-actions],' +
        '[mat-cell][column-state],[mat-header-cell][column-state]'
})
export class TableColumnDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.hasAttribute('column-selector')) {
            this.setSelectorColumn();
        }
        if (this.elementRef.nativeElement.hasAttribute('column-actions')) {
            this.setActionsColumn();
        }
        if (this.elementRef.nativeElement.hasAttribute('column-state')) {
            this.setStateColumn();
        }
    }

    setSelectorColumn() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '53px');
        this.renderer.addClass(this.elementRef.nativeElement, 'pe-0');
    }

    setActionsColumn() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '135px');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
    }

    setStateColumn() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '128px');
        if (this.elementRef.nativeElement.childElementCount) {
            this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'd-flex-center');
        } else {
            this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
        }
    }
}
