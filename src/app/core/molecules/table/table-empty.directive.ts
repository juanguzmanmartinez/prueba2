import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Renderer2 } from '@angular/core';
import { IconsComponent } from '@atoms/icons/icons.component';

@Directive({
    selector: 'app-table-empty'
})
export class TableEmptyDirective implements AfterViewInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef
    ) {

    }

    ngAfterViewInit() {
        const parentElement = this.renderer.createElement('div');
        this.renderer.addClass(parentElement, 'py-15');
        this.renderer.addClass(parentElement, 'd-flex-center');
        this.renderer.addClass(parentElement, 'border-gray-1');
        this.renderer.addClass(parentElement, 'border-end');
        this.renderer.addClass(parentElement, 'border-start');
        this.renderer.addClass(parentElement, 'border-bottom');

        this.addIconElement(parentElement);

        this.renderer.appendChild(this.elementRef.nativeElement, parentElement);
    }

    addIconElement(parentElement: HTMLElement) {
        const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(IconsComponent);

        const iconComponentRef = iconComponentFactory.create(this.injector);
        iconComponentRef.instance.svgName = 'look-orders';
        iconComponentRef.instance.svgWidth = '200px';

        this.applicationRef.attachView(iconComponentRef.hostView);

        const iconElement = (iconComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        this.renderer.appendChild(parentElement, iconElement);
    }

}
