import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mat-table][table-regular],[mat-table][table-selector],[mat-table][table-small],[mat-table][table-no-hover]'
})
export class TableDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'w-100');
        this.setHeaderStyle();
        this.setColumnStyle();
        this.setRowStyle();
        this.setRowCellStyle();
    }

    setHeaderStyle() {
        const headerRowElement = this.elementRef.nativeElement.querySelector('.mat-header-row');
        const headerCellElementList = this.elementRef.nativeElement.querySelectorAll('.mat-header-cell');

        const borderRadius = '12px';
        const headerCellPadding = '24px';
        this.renderer.addClass(headerRowElement, 'bg-gray-5');
        this.renderer.setStyle(headerRowElement, 'height', '50px');
        this.renderer.setStyle(headerCellElementList[0], 'border-top-left-radius', borderRadius);
        this.renderer.setStyle(headerCellElementList[headerCellElementList.length - 1], 'border-top-right-radius', borderRadius);
        for (const headerCellElement of headerCellElementList) {
            this.renderer.addClass(headerCellElement, 'text-label');
            this.renderer.addClass(headerCellElement, 'text-white');
            this.renderer.addClass(headerCellElement, 'border-0');
            this.renderer.setStyle(headerCellElement, 'paddingLeft', headerCellPadding);
            this.renderer.setStyle(headerCellElement, 'paddingRight', headerCellPadding);
        }
    }

    setRowStyle() {
        const rowElementList = this.elementRef.nativeElement.querySelectorAll('.mat-row');

        const smallTable = this.elementRef.nativeElement.hasAttribute('table-small');
        const noHover = this.elementRef.nativeElement.hasAttribute('table-no-hover');
        const cellHeight = smallTable ? '48px' : '64px';
        for (const rowElement of rowElementList) {
            this.renderer.setStyle(rowElement, 'height', cellHeight);
            this.renderer.addClass(rowElement, 'border-end');
            this.renderer.addClass(rowElement, 'border-start');
            this.renderer.addClass(rowElement, 'border-gray-1');
            if (rowElement.rowIndex % 2 === 0) {
                this.renderer.addClass(rowElement, 'bg-gray-1');
            }
            if (rowElement.rowIndex === rowElementList.length && rowElement.rowIndex % 2 !== 0) {
                this.renderer.addClass(rowElement, 'border-bottom');
            }

            if (!noHover) {
                this.listenRowElementHover(rowElement);
            }
        }

    }

    listenRowElementHover(rowElement) {
        rowElement.addEventListener('mouseenter', () => {
            this.renderer.addClass(rowElement, 'bg-light-primary');
            if (rowElement.rowIndex % 2 === 0) {
                this.renderer.removeClass(rowElement, 'bg-gray-1');
            }
        });
        rowElement.addEventListener('mouseleave', () => {
            this.renderer.removeClass(rowElement, 'bg-light-primary');
            if (rowElement.rowIndex % 2 === 0) {
                this.renderer.addClass(rowElement, 'bg-gray-1');
            }
        });
    }

    setRowCellStyle() {
        const cellPadding = '24px';
        const cellElementList = this.elementRef.nativeElement.querySelectorAll('.mat-cell');
        for (const cellElement of cellElementList) {
            this.renderer.addClass(cellElement, 'border-0');
            this.renderer.addClass(cellElement, 'text-label');
            this.renderer.addClass(this.elementRef.nativeElement, 'text-gray-6');
            this.renderer.setStyle(cellElement, 'paddingLeft', cellPadding);
            this.renderer.setStyle(cellElement, 'paddingRight', cellPadding);
        }
    }

    setColumnStyle() {
        const selectorTable = this.elementRef.nativeElement.hasAttribute('table-selector');
        if (selectorTable) {
            const selectorElementList = this.elementRef.nativeElement.querySelectorAll('.mat-column-selector');
            for (const selectorElement of selectorElementList) {
                this.renderer.setStyle(selectorElement, 'width', '53px');
                this.renderer.addClass(selectorElement, 'pe-0');
            }
        }
    }
}
