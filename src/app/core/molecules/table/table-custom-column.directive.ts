import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-header-cell][customColumn],[mat-cell][customColumn]'
})
export class TableCustomColumnDirective {
    @Input()
    set customColumn(columnName: string) {
        switch (columnName) {
            case 'selector':
                this.setSelectorColumn();
                break;
            case 'actions':
                this.setActionsColumn();
                break;
        }
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    setSelectorColumn() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '53px');
        this.renderer.addClass(this.elementRef.nativeElement, 'pe-0');
    }

    setActionsColumn() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '135px');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-center');
    }
}
