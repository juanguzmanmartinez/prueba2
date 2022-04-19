import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CTypesSearch } from './constants/order-filters.constant';
import { IOrderFilters } from './interfaces/order-filter.interface';

@Injectable()
export class OrderFormPresenter {
  filterForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      localId: [null],
      companyCode: [null],
      serviceTypeId: [null],
      promiseDate: [null],
      orderStatus: [null],
      serviceChannel: [null],
      searchCode: [''],
      searchValue: [''],
      promiseRangeDate: [null],
      promiseDateSelect: [null],
    });
  }

  getFilters(): IOrderFilters {
    const { promiseDate, promiseRangeDate, searchCode, ...restForm } =
      this.filterForm.value;
    return {
      ...restForm,
      searchCode: searchCode ? searchCode.code : null,
      promiseDate: this.isNullPromiseRangeDate()
        ? promiseDate
        : this.formatPromiseDate(),
    } as IOrderFilters;
  }

  isNullPromiseRangeDate() {
    const { promiseRangeDate } = this.filterForm.value;
    if (!promiseRangeDate) {
      return true;
    }
    return !promiseRangeDate.startDate && !promiseRangeDate.endDate;
  }

  formatPromiseDate() {
    if (this.filterForm.get('promiseRangeDate').value !== null) {
      const { startDate, endDate } =
        this.filterForm.get('promiseRangeDate').value;
      const dateInitFilter = moment(startDate).format('DD-MM-YYYY');
      const dateEndFilter = moment(endDate).format('DD-MM-YYYY');
      return [dateInitFilter, dateEndFilter];
    }
    return null;
  }

  reset() {
    this.filterForm.reset();
    this.filterForm.get('searchValue').setValue('');
    this.filterForm.get('searchCode').setValue(CTypesSearch[0]);
  }
}
