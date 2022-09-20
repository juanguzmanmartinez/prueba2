import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Renderer2 } from '@angular/core';
import { IconComponent } from '@atoms/icons/icon.component';

@Directive({
    selector: '[app-dialog-close]'
})
export class DialogCloseDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef
    ) {
    }

    ngAfterViewInit() {
        this.setDialogCloseElement();
        this.addIconCloseElement();
    }

    setDialogCloseElement() {
        this.renderer.addClass(this.elementRef.nativeElement, 'dialog-close');
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '24px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', '40px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '2');
    }


    addIconCloseElement() {
        const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);

        const iconComponentRef = iconComponentFactory.create(this.injector);
        iconComponentRef.instance.fontName = 'close';
        iconComponentRef.instance.fontSize = '16px';
        iconComponentRef.instance.innerClass = 'text-gray-5 cursor-pointer';

        this.applicationRef.attachView(iconComponentRef.hostView);
        const iconElement = (iconComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.renderer.appendChild(this.elementRef.nativeElement, iconElement);
    }

}
