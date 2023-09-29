import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IPillFilter } from '@interfaces/control-tower/control-tower.filter.interface';

@Component({
  selector: 'app-carrier-filter-pill',
  templateUrl: './carrier-filter-pill.component.html',
  styleUrls: ['./carrier-filter-pill.component.scss'],
})
export class CarrierFilterPillComponent {
  private childElement: ElementRef;

  @Input() filter: IPillFilter;
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
