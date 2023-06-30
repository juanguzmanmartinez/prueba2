import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';

@Injectable()
export class CarrierFilterFormService {
  public filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      carrierStates: [[]],
      locals: [[]],
    });
  }

  getFilterList() {
    const carrierStates = this.carrierStateControl().value;
    const locals = this.localsControl().value;
    return [...carrierStates, ...locals];
  }

  carrierStateControl() {
    return this.filterForm.get('carrierStates') as AbstractControl;
  }

  localsControl() {
    return this.filterForm.get('locals') as AbstractControl;
  }
}
