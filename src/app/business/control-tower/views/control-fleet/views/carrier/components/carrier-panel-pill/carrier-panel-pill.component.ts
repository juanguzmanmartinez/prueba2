import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarrierFilterFormService } from '../../services/carrier-filter-form.service';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { CarrierFilterPillComponent } from '../carrier-filter-pill/carrier-filter-pill.component';

@Component({
  selector: 'app-carrier-panel-pill',
  templateUrl: './carrier-panel-pill.component.html',
  styleUrls: ['./carrier-panel-pill.component.scss'],
})
export class CarrierPanelPillComponent implements OnInit, AfterViewInit {

  @ViewChildren(CarrierFilterPillComponent)
  filterPills: QueryList<CarrierFilterPillComponent>;
  @Input() filterList: ISelectOption[];
  public translation: number = 0;
  public translationSlide: number = 150;

  @ViewChild('containerElement') containerElement: ElementRef;

  scrollContainer(scrollValue: number) {
    const container = this.containerElement.nativeElement;
    container.scrollLeft += scrollValue;
  }

  constructor(
    private form: CarrierFilterFormService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.formChanges();
  }

  formChanges(): void {
    this.form.filterForm.valueChanges.subscribe((formValue) => {
      console.log(formValue);
    });
  }

  ngAfterViewInit(): void {
    this.filterPills.changes.subscribe(() => {
      this.getChildWidths();
    });
  }

  getChildWidths() {
    this.filterPills.forEach(childComponent => {
      const childWidth = childComponent.getNativeElement().offsetWidth;
      console.log('Child width:', childWidth);
    });
  }

  moveLeft() {
    if (this.translation !== 0) {
      this.translation += this.translationSlide;
    }
  }

  moveRight() {
    this.translation -= this.translationSlide;
  }

 
}
