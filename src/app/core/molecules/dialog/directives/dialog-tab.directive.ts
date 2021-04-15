import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'app-tab-group[dialog-tab-group],app-tab-group[dialog-table-tab-group]'
})
export class DialogTabDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    ngAfterViewInit() {
        this.setDialogTabGroupElement();
    }

    setDialogTabGroupElement() {
        const tabLabelsElement = this.elementRef.nativeElement.querySelector('.mat-tab-labels');
        this.renderer.setStyle(tabLabelsElement, 'padding', '0 40px');

        const tabBodyContentElementList = this.elementRef.nativeElement.querySelectorAll('.mat-tab-body-content') as NodeList;
        tabBodyContentElementList.forEach((tabBodyContentElement: Node) => {
            this.renderer.setStyle(tabBodyContentElement, 'padding', '28px 40px');
            if (this.elementRef.nativeElement.hasAttribute('dialog-table-tab-group')) {
                this.renderer.setStyle(tabBodyContentElement, 'padding-right', '100px');
                this.renderer.setStyle(tabBodyContentElement, 'max-height', '260px');
                this.renderer.setStyle(tabBodyContentElement, 'overflow-x', 'auto');
            }
        });
    }
}
