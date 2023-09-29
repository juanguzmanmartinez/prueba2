import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { ControlFleetStorageByForm } from '../constants/carrier.constant';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { IPillFilter } from '@interfaces/control-tower/control-tower.filter.interface';
import { CarrierStore } from '../store/carrier.store';

@Injectable()
export class CarrierFilterFormService {
  public filterForm: FormGroup;

  constructor(private fb: FormBuilder, private carrierStore: CarrierStore) {
    this.filterForm = this.fb.group({
      carrierStates: [[]],
      locals: [[]],
    });
  }

  getfilterPillList() {
    const stateControlValue = this.carrierStateControl().value;
    const localControlValue = this.localsControl().value;
    const states = this.addFilterName(stateControlValue, 'carrierStates');
    const locals = this.addFilterName(localControlValue, 'locals');
    return [...states, ...locals];
  }

  getFilterLabel() {
    const formValue = this.filterForm.value;
    const carrierStates = formValue.carrierStates.map((state) => state.label);
    const locals = formValue.locals.map((local) => local.label);
    return { locals, carrierStates } as ICarrierFilter;
  }

  addFilterName(filterList: ISelectOption[], name: string) {
    return filterList.map((option) => {
      return {
        label: option.label,
        value: { id: option.value, filter: name },
      } as ISelectOption;
    });
  }

  deleteOptionFilter(optionSelected: IPillFilter) {
    const { name, option } = optionSelected;
    const filterSelected = this.filterForm.get(name).value;
    const filterAfterRemove = filterSelected.filter(
      (optionFilter) => optionFilter !== option.value
    );
    this.carrierStore.deleteOptionSelected(optionSelected);
    this.filterForm.get(name).setValue(filterAfterRemove);
  }

  carrierStateControl() {
    return this.filterForm.get('carrierStates') as AbstractControl;
  }

  localsControl() {
    return this.filterForm.get('locals') as AbstractControl;
  }
}
