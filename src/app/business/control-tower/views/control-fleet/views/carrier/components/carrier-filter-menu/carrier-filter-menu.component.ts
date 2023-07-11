import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { CarrierStateDBDummy } from 'app/business/control-tower/db-example/carrier-state.db';
import { LocalDBDummy } from 'app/business/control-tower/db-example/local.db';
import { CarrierFilterFormService } from '../../services/carrier-filter-form.service';

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
}
