import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';

@Component({
  selector: 'app-carrier-filter-menu',
  templateUrl: './carrier-filter-menu.component.html',
})
export class CarrierFilterMenuComponent {
  @Input() localList: ISelectOption[];
  @Input() carrierStateList: ISelectOption[];
  @Input() filterForm: FormGroup;

  @Output() search = new EventEmitter();

  constructor() {}

  searchCarriers() {
    console.log(this.filterForm.value);
    this.search.emit(123);
  }

  get hasFilters() {
    const { carrierStates, locals } = this.filterForm.value;
    return carrierStates.length > 0 || locals.length > 0;
  }
}
