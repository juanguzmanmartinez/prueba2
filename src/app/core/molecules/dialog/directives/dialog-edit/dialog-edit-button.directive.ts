import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Renderer2 } from '@angular/core';
import { ButtonActionIconComponent } from '@atoms/buttons/button-action-icon/button-action-icon.component';

@Directive({
    selector: '[app-dialog-edit-button]'
})
export class DialogEditButtonDirective implements AfterViewInit {

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
        this.addButtonActionIconElement();
    }

    setDialogCloseElement() {
        this.renderer.addClass(this.elementRef.nativeElement, 'dialog-edit-button');
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '24px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', '42px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '2');
    }


    addButtonActionIconElement() {
        const buttonActionIconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ButtonActionIconComponent);

        const buttonActionIconComponentRef = buttonActionIconComponentFactory.create(this.injector);
        buttonActionIconComponentRef.instance.iconName = 'edit';
        buttonActionIconComponentRef.instance.innerClass = 'cursor-pointer';
        buttonActionIconComponentRef.instance.inlineStyle = {width: '32px', height: '32px'};

        this.applicationRef.attachView(buttonActionIconComponentRef.hostView);
        const buttonActionIconElement = (buttonActionIconComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.renderer.appendChild(this.elementRef.nativeElement, buttonActionIconElement);
    }

}
