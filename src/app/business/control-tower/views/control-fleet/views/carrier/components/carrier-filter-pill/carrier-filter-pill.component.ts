import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ISelectOption } from '@interfaces/vita/select.interface';

@Component({
  selector: 'app-carrier-filter-pill',
  templateUrl: './carrier-filter-pill.component.html',
  styleUrls: ['./carrier-filter-pill.component.scss'],
})
export class CarrierFilterPillComponent {
  private childElement: ElementRef;

  @Input() filter: ISelectOption;
  @Output() delete = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    this.childElement = this.elementRef;
  }

  deletePill() {
    this.delete.emit();
  }

  getNativeElement(): HTMLElement {
    return this.childElement.nativeElement;
  }
}
