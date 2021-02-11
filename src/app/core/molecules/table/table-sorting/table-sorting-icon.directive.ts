import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Renderer2 } from '@angular/core';
import { IconsComponent } from '@atoms/icons/icons.component';

@Directive({
    selector: '[mat-header-cell][mat-sort-header]'
})
export class TableSortingIconDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2,
                private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                private applicationRef: ApplicationRef) {
    }


    ngAfterViewInit() {
        const arrowElement = this.elementRef.nativeElement.querySelector('div.mat-sort-header-arrow');
        this.renderer.removeChild(arrowElement, []);
        this.renderer.setStyle(arrowElement, 'margin-left', '4px');
        this.renderer.setStyle(arrowElement, 'width', '16px');
        this.renderer.setStyle(arrowElement, 'height', '16px');
        this.renderer.addClass(arrowElement, 'visible');

        const childElements = arrowElement.children;
        for (const child of childElements) {
            this.renderer.removeChild(arrowElement, child);
        }

        const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(IconsComponent);

        const iconComponentRef = iconComponentFactory.create(this.injector);
        iconComponentRef.instance.fontName = 'unfold_more';
        iconComponentRef.instance.innerClass = 'text-white';

        this.applicationRef.attachView(iconComponentRef.hostView);

        const iconElement = (iconComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        this.renderer.appendChild(arrowElement, iconElement);
    }
}
