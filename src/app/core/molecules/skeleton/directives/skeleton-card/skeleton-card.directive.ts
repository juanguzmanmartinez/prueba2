import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    Directive,
    EmbeddedViewRef,
    Injector,
    Input,
    OnDestroy,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { CardComponent } from '@molecules/cards/components/card/card.component';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appSkeletonCard]'
})
export class SkeletonCardDirective implements AfterViewInit, OnDestroy {
    private skeletonState: boolean;
    private skeletonLoader: boolean;
    private rows = 4;

    private skeletonElement: HTMLElement;
    private killTrigger: Subject<void> = new Subject();

    @Input()
    set appSkeletonCard(skeletonState: boolean) {
        this.skeletonState = !!skeletonState;
        this.updateContainerView();
    }

    @Input()
    set appSkeletonCardLoading(skeletonLoading: boolean) {
        this.skeletonLoader = !!skeletonLoading;
        if (!!skeletonLoading && !this.skeletonState) {
            this.viewContainer.clear();
            this.clearContainer();
        }
    }

    @Input()
    set appSkeletonCardRow(rows: number) {
        this.rows = rows || 4;
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit() {
        this.updateContainerView();
        if (!this.skeletonState && !this.skeletonLoader) {
            this.updateSkeletonView();
        }
    }

    updateContainerView() {
        this.viewContainer.clear();
        if (this.skeletonState) {
            this.clearContainer();
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.changeDetectorRef.detectChanges();
        }
    }

    clearContainer() {
        if (this.skeletonElement) {
            const parentElement = this.templateRef.elementRef.nativeElement.parentElement as HTMLElement;
            this.renderer.removeChild(parentElement, this.skeletonElement);
        }
        if (!this.killTrigger?.closed) {
            this.killTrigger.next();
        }
    }

    updateSkeletonView() {
        const parentElement = this.templateRef.elementRef.nativeElement.parentElement as HTMLElement;
        this.skeletonElement = this.renderer.createElement('div');
        this.renderer.addClass(this.skeletonElement, 'skeleton-card');

        const wrapperElement = this.renderer.createElement('div');
        const rowLength = Array.from({length: this.rows}, (_, index) => index + 1);
        const rowWidth = ['30%', '40%', '50%', '60%', '70%', '80%', '90%'];
        const rowWidthByColumn = rowLength.map(() => rowWidth[Math.floor(Math.random() * rowWidth.length)]);

        for (const row of rowLength) {
            const rowElement = this.renderer.createElement('div');
            this.renderer.addClass(rowElement, 'mb-6');
            this.renderer.addClass(rowElement, 'rounded-pill');
            this.renderer.addClass(rowElement, 'bg-gray-3');
            this.renderer.setStyle(rowElement, 'height', '16px');
            this.renderer.setStyle(rowElement, 'width', rowWidthByColumn[row - 1]);
            this.renderer.setStyle(rowElement, 'transition', 'opacity 1s');

            const seconds = [1300, 1500, 1200, 1400];
            const randomSecond = seconds[Math.floor(Math.random() * seconds.length)];
            timer(0, randomSecond)
                .pipe(takeUntil(this.killTrigger))
                .subscribe((index) => {
                    if (index % 2 === 0) {
                        this.renderer.setStyle(rowElement, 'opacity', '1');
                    } else {
                        this.renderer.setStyle(rowElement, 'opacity', '0.5');
                    }
                });

            this.renderer.appendChild(wrapperElement, rowElement);
        }
        const cardElement = this.addChildElement(wrapperElement);
        this.renderer.appendChild(this.skeletonElement, cardElement);
        this.renderer.appendChild(parentElement, this.skeletonElement);
    }

    addChildElement(childElement: HTMLElement): HTMLElement {
        const cardComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);

        const cardComponentRef = cardComponentFactory.create(this.injector, [[childElement]]);

        this.applicationRef.attachView(cardComponentRef.hostView);
        return (cardComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }


    ngOnDestroy() {
        this.killTrigger.next();
        this.killTrigger.complete();
    }
}
