import { Component, EventEmitter, Output } from '@angular/core';
import { DatepickerFilter, DatepickerFilterEvent } from '../../interfaces/order-records.interface';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {

  readonly typeDates = ['Hoy', 'Ayer', 'Última semana', 'Último mes', 'Otro periodo'];

  selectDate: string;
  selectDatePreview: string;

  datepicker: DatepickerFilter;
  datepickerPreview: DatepickerFilter = { startDate: null, endDate: null };
  existDate = false;

  isRange = false;

  @Output() filter = new EventEmitter<DatepickerFilterEvent>();

  constructor() {}

  selectionChange(type: string): void {
    let dateInitFilter;
    let dateEndFilter;
    let notFound;

    if (type === 'Hoy') {
      const today = new Date();
      const todayDate = moment(today).format('YYYY-MM-DD');
      dateInitFilter = todayDate;
      dateEndFilter = todayDate;
      notFound = 'Hoy';
    } else if (type === 'Ayer') {
      const today = new Date();
      const yesterday = moment(today).subtract(1, 'day').format('YYYY-MM-DD');
      dateInitFilter = yesterday;
      dateEndFilter = yesterday;
      notFound = 'Ayer';
    } else if (type === 'Última semana') {
      const startWeek = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
      const endWeek = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
      dateInitFilter = startWeek;
      dateEndFilter = endWeek;
      notFound = 'Última semana';
    } else if (type === 'Último mes') {
      const startMonth = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
      const endMonth = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      dateInitFilter = startMonth;
      dateEndFilter = endMonth;
      notFound = 'Último mes';
    } else if (type === 'Otro periodo') {
      this.isRange = true;
      this.selectDatePreview = this.selectDate;
      this.existDate = !!(this.datepicker);
      if (this.existDate) { this.datepickerPreview = { ...this.datepicker }; }
      return;
    }

    console.table({ dateInitFilter, dateEndFilter, notFound });
    this.filter.emit({ dateInitFilter, dateEndFilter, notFound });
  }

  cancelDateRange(): void {
    this.selectDate = this.selectDatePreview;
    this.isRange = false;
  }

  rangeChange(): void {
    if (!!(this.datepicker) && !!(this.datepickerPreview)) {
      this.isRange = true;
      if ((this.datepickerPreview.startDate !== this.datepicker.startDate) ||
        ((this.datepickerPreview.endDate !== this.datepicker.endDate) && this.datepicker.endDate)) {
        this.existDate = false;
      }
    }

    if (!!(this.datepicker) && this.datepicker.startDate < this.datepicker.endDate && !this.existDate) {
      let dateInitFilter;
      let dateEndFilter;
      let notFound;

      dateInitFilter = moment(this.datepicker.startDate).format('YYYY-MM-DD');
      dateEndFilter = moment(this.datepicker.endDate).format('YYYY-MM-DD');
      notFound = 'Otro periodo';

      this.isRange = false;
      console.table({ dateInitFilter, dateEndFilter, notFound });
      this.filter.emit({ dateInitFilter, dateEndFilter, notFound });

      this.existDate = true;
    }
  }
}
