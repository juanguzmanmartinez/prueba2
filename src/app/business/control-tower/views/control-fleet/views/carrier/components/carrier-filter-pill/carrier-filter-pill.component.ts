import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carrier-filter-pill',
  templateUrl: './carrier-filter-pill.component.html',
  styleUrls: ['./carrier-filter-pill.component.scss'],
})
export class CarrierFilterPillComponent {
  private childElement: ElementRef;

  @Input() label: string;
  @Input() value: string;
  @Output() close = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    this.childElement = this.elementRef;
  }

  deletePill() {
    this.close.emit();
  }

  getNativeElement(): HTMLElement {
    return this.childElement.nativeElement;
  }
}
