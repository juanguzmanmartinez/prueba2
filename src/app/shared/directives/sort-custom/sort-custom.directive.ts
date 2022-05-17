import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { IconComponent } from '@atoms/icons/icon.component';

@Directive({
  selector: '[app-sort-custom]'
})
export class SortCustomDirective implements AfterViewInit, OnChanges {

  @Input() column = '';
  @Input() reload = false;
  @Output() currentOrder = new EventEmitter<{ column: string, order: 'A' | 'D' | 'N' }>();

  private numberOfClicks: 0 | 1 | 2 = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reload) {
      if (this.reload) {
        this.numberOfClicks = 0;
        this.setSortStyle(this.elementRef.nativeElement.childNodes[0].childNodes[1].childNodes[0]);
      }
    }
  }

  ngAfterViewInit(): void {
    const buttonSortElement = this.addIconSortElement();
    this.setSortStyle(buttonSortElement);
    this.setSortEvent(buttonSortElement);
    this.createElementSort(buttonSortElement);
  }

  private createElementSort(sortElement: HTMLElement): void {
    const divContent = this.renderer.createElement('div');
    const divSort = this.renderer.createElement('div');
    const divText = this.renderer.createElement('div');
    const text = this.renderer.createText(this.elementRef.nativeElement.textContent);

    this.clearPreviousContent();

    this.setDivContentStyle(divContent);
    this.setDivSortStyle(divSort);

    this.renderer.appendChild(divText, text);
    this.renderer.appendChild(divSort, sortElement);

    this.renderer.appendChild(divContent, divText);
    this.renderer.appendChild(divContent, divSort);

    this.renderer.appendChild(this.elementRef.nativeElement, divContent);
  }

  private setDivContentStyle(divContentElement: HTMLElement): void {
    this.renderer.setStyle(divContentElement, 'display', 'flex');
    this.renderer.setStyle(divContentElement, 'align-items', 'center');
  }

  private setDivSortStyle(divSortElement: HTMLElement): void {
    this.renderer.setStyle(divSortElement, 'margin-left', '4px');
    this.renderer.setStyle(divSortElement, 'height', '16px');
  }

  private setSortStyle(sortElement: HTMLElement): void {
    this.renderer.setStyle(sortElement, 'color', 'transparent');
    this.renderer.setStyle(sortElement, 'transition', 'color .5s');
    this.renderer.addClass(sortElement, 'cursor-pointer');
    this.addSortHoverEvent(sortElement);
  }

  private setSortEvent(sortElement: HTMLElement): void {
    this.renderer.listen(sortElement, 'click', () => {
      switch (this.numberOfClicks) {
        case 0: {
          this.numberOfClicks++;
          this.renderer.setStyle(sortElement, 'color', 'white');
          this.removeSortHoverEvent(sortElement);
          this.currentOrder.emit({
            column: this.column,
            order: 'A',
          });
          break;
        }
        case 1: {
          this.numberOfClicks++;
          this.renderer.setStyle(sortElement, 'color', 'white');
          this.removeSortHoverEvent(sortElement);
          this.currentOrder.emit({
            column: this.column,
            order: 'D',
          });
          break;
        }
        case 2: {
          this.numberOfClicks = 0;
          this.renderer.setStyle(sortElement, 'color', 'gray');
          this.addSortHoverEvent(sortElement);
          this.currentOrder.emit({
            column: this.column,
            order: 'N',
          });
          break;
        }
      }
    });
  }

  private addSortHoverEvent(sortElement): void {
    this.renderer.listen(sortElement, 'mouseover', () => {
      this.renderer.setStyle(sortElement, 'color', 'gray');
    });

    this.renderer.listen(sortElement, 'mouseout', () => {
      this.renderer.setStyle(sortElement, 'color', 'transparent');
    });
  }

  private removeSortHoverEvent(sortElement): void {
    this.renderer.listen(sortElement, 'mouseover', () => {
      this.renderer.setStyle(sortElement, 'color', 'white');
    });

    this.renderer.listen(sortElement, 'mouseout', () => {
      this.renderer.setStyle(sortElement, 'color', 'white');
    });
  }

  private addIconSortElement(): HTMLElement {
    const buttonSortComponentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);

    const buttonSortComponentRef = buttonSortComponentFactory.create(this.injector);
    buttonSortComponentRef.instance.fontName = 'unfold_more';
    buttonSortComponentRef.instance.fontSize = '16px';

    this.applicationRef.attachView(buttonSortComponentRef.hostView);
    return (buttonSortComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  private clearPreviousContent(): void {
    this.elementRef.nativeElement.textContent = '';
  }

}
