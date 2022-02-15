import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Renderer2 } from '@angular/core';
import { TableComponent } from '@molecules/table/table.component';

@Directive({
    selector: 'table[mat-table],table[mat-table][large-table]'
})
export class TableDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef
    ) {
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'w-100');
        this.renderer.addClass(this.elementRef.nativeElement, 'table');
        const hasLargeTable = this.elementRef.nativeElement.hasAttribute('large-table');
        if (hasLargeTable) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'minWidth', '950px');
        }
        this.addTableComponentParent();
    }

    addTableComponentParent() {
        const parentElement = this.elementRef.nativeElement.parentElement;
        const tableComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);

        const tableComponentRef = tableComponentFactory.create(this.injector);
        this.applicationRef.attachView(tableComponentRef.hostView);
        const tableElement = (tableComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.renderer.addClass(tableElement, 'd-block');
        this.renderer.setStyle(tableElement, 'overflow-x', 'auto');

        this.renderer.insertBefore(parentElement, tableElement, this.elementRef.nativeElement);
        this.renderer.removeChild(parentElement, this.elementRef.nativeElement);
        this.renderer.appendChild(tableElement, this.elementRef.nativeElement);
    }
}
