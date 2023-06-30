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
  @Input() localList = LocalDBDummy.map((local) => {
    return {
      value: local.localCode,
      label: local.name,
    } as ISelectOption;
  });
  @Input() carrierStateList = CarrierStateDBDummy.map((state) => {
    return {
      value: state.stateType,
      label: state.description,
    } as ISelectOption;
  });

  @Input() filterForm: FormGroup;
  @Output() search = new EventEmitter();

  constructor(public form: CarrierFilterFormService) {}

  searchCarriers() {
    console.log('que fe');
    this.search.emit(123);
  }
}
