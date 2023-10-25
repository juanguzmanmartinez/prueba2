import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {
  CTypesSearch,
  ECodeTypeSearch,
} from './constants/order-filters.constant';
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

  isEmptyArrayControl(valueControl: any) {
    if (Array.isArray(valueControl)) {
      if (valueControl.length === 0) {
        return false;
      }
    }
    return true;
  }

  isPromiseDateInvalid() {
    return (
      this.filterForm.get('promiseDate').invalid ||
      this.filterForm.get('promiseRangeDate').invalid
    );
  }

  setPromiseDateRequiredValidator() {
    this.filterForm.get('promiseDate').setValidators([Validators.required]);
    this.filterForm.get('promiseDate').updateValueAndValidity();
  }
  setRangeDateRequiredValidator() {
    this.filterForm
      .get('promiseRangeDate')
      .setValidators([this.rangeDateValidator()]);
    this.filterForm.get('promiseRangeDate').updateValueAndValidity();
  }

  clearPromiseDateValidators() {
    this.filterForm.get('promiseDate').clearValidators();
    this.filterForm.get('promiseDate').updateValueAndValidity();
  }

  clearRangeDateRequiredValidator() {
    this.filterForm.get('promiseRangeDate').clearValidators();
    this.filterForm.get('promiseRangeDate').updateValueAndValidity();
  }

  isNullFilterForm() {
    const {
      searchCode,

      promiseRangeDate,
      promiseDateSelect,
      ...restFilterForm
    } = this.filterForm.value;

    const valueNotNull = Object.values(restFilterForm).find(
      (value) =>
        value !== null && value !== '' && this.isEmptyArrayControl(value)
    );

    return this.isNullPromiseRangeDate() && !Boolean(valueNotNull);
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

  searchValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const searchCode = group.get('searchCode').value;
      const searchValue = group.get('searchValue').value;

      if (searchCode.code && searchCode.code === ECodeTypeSearch.pedido) {
        if (searchValue.length < 6 && searchValue.length !== 0) {
          return { searchError: true };
        }
      }

      if (searchCode.code && searchCode.code === ECodeTypeSearch.telefono) {
        if (searchValue.length < 8 && searchValue.length !== 0) {
          return { searchError: true };
        }
      }

      if (searchCode.code && searchCode.code === ECodeTypeSearch.documento) {
        if (searchValue.length < 8 && searchValue.length !== 0) {
          return { searchError: true };
        }
      }
      return null;
    };
  }

  rangeDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return { isRequired: true };
      }

      if (!control.value?.endDate || !control.value?.startDate) {
        return { isRequired: true };
      }
      return null;
    };
  }

  reset() {
    this.filterForm.reset();
    this.filterForm.get('searchValue').setValue('');
    this.filterForm.get('searchCode').setValue(CTypesSearch[0]);
  }
}
