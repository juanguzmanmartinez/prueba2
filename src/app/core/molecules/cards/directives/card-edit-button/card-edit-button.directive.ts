import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, Injector, Input, Renderer2 } from '@angular/core';
import { ButtonActionIconComponent } from '@atoms/buttons/button-action-icon/button-action-icon.component';
import { TooltipComponent } from '@atoms/tooltip/tooltip.component';

@Directive({
    selector: '[app-card-edit-button]'
})
export class CardEditButtonDirective implements AfterViewInit {

    @Input() editMessage = '';

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef
    ) {
    }

    ngAfterViewInit() {
        this.setElementStyle();
        const buttonActionIconElement = this.addChildElement();
        const tooltipElement = this.addTooltipElement(buttonActionIconElement);
        this.renderer.appendChild(this.elementRef.nativeElement, tooltipElement);
    }

    setElementStyle() {
        this.renderer.addClass(this.elementRef.nativeElement, 'card-edit-button');
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', '24px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', '24px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '2');
    }


    addChildElement(): HTMLElement {
        const buttonActionIconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ButtonActionIconComponent);

        const buttonActionIconComponentRef = buttonActionIconComponentFactory.create(this.injector);
        buttonActionIconComponentRef.instance.iconName = 'edit';
        buttonActionIconComponentRef.instance.innerClass = 'cursor-pointer';

        this.applicationRef.attachView(buttonActionIconComponentRef.hostView);
        return (buttonActionIconComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    addTooltipElement(childElement: HTMLElement): HTMLElement {
        const tooltipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);

        const tooltipComponentRef = tooltipComponentFactory.create(this.injector, [[childElement]]);
        tooltipComponentRef.instance.value = `Editar ${this.editMessage}`;

        this.applicationRef.attachView(tooltipComponentRef.hostView);
        return (tooltipComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

}
