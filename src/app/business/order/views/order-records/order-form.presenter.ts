import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class OrderFormPresenter {
  filterForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      local: [''],
      company: [''],
      serviceType: [''],
      promiseDate: [''],
      status: [''],
      channel: [''],
      searchCode: [''],
      searchValue: [''],
    });
  }
}
