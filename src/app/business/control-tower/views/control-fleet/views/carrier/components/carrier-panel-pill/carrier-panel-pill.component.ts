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
  selector: 'app-carrier-panel-pill',
  templateUrl: './carrier-panel-pill.component.html',
  styleUrls: ['./carrier-panel-pill.component.scss'],
})
export class CarrierPanelPillComponent {
  @Input() filterList: ISelectOption[];
  @Output() delete = new EventEmitter();
  @ViewChild('containerElement') containerElement: ElementRef;

  constructor() {}

  scrollContainer(scrollValue: number) {
    const container = this.containerElement.nativeElement;
    container.scrollLeft += scrollValue;
  }

  deleteFilter(filter: ISelectOption) {
    console.log(filter);
    this.delete.emit(filter);
  }
}
