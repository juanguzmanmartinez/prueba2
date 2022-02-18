import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import * as moment from 'moment/moment';
import {
  DatepickerFilter,
  DatepickerFilterEvent,
} from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  readonly typeDates = [
    'Hoy',
    'Ayer',
    'Última semana',
    'Último mes',
    'Otro periodo',
  ];

  selectDate: string;
  selectDatePreview: string;

  datepicker: DatepickerFilter;
  datepickerPreview: DatepickerFilter = { startDate: null, endDate: null };
  existDate = false;
  selectedRange: string;

  isRange = false;

  @Output() filter = new EventEmitter<DatepickerFilterEvent>();

  constructor(private orderFilterStore: OrderFilterStore) {}

  ngOnInit(): void {
    const { datePromise } = this.orderFilterStore.getOrderFilter();
    //TODO: Se debe hacer la mejora para poder persistir el valor
    // this.selectedRange = 'Ayer';
  }

  selectionChange(type: string): void {
    let dateInitFilter;
    let dateEndFilter;
    let notFound;

    if (type === 'Hoy') {
      const today = new Date();
      const todayDate = moment(today).format('DD-MM-YYYY');
      dateInitFilter = todayDate;
      dateEndFilter = todayDate;
      notFound = 'Hoy';
    } else if (type === 'Ayer') {
      const today = new Date();
      const yesterday = moment(today).subtract(1, 'day').format('DD-MM-YYYY');
      dateInitFilter = yesterday;
      dateEndFilter = yesterday;
      notFound = 'Ayer';
    } else if (type === 'Última semana') {
      const startWeek = moment()
        .subtract(1, 'weeks')
        .startOf('week')
        .format('DD-MM-YYYY');
      const endWeek = moment()
        .subtract(1, 'weeks')
        .endOf('week')
        .format('DD-MM-YYYY');
      dateInitFilter = startWeek;
      dateEndFilter = endWeek;
      notFound = 'Última semana';
    } else if (type === 'Último mes') {
      const startMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      dateInitFilter = startMonth;
      dateEndFilter = endMonth;
      notFound = 'Último mes';
    } else if (type === 'Otro periodo') {
      this.isRange = true;
      this.selectDatePreview = this.selectDate;
      this.existDate = !!this.datepicker;
      if (this.existDate) {
        this.datepickerPreview = { ...this.datepicker };
      }
      return;
    }
    this.filter.emit({ dateRange: [dateInitFilter, dateEndFilter], notFound });
  }

  cancelDateRange(): void {
    this.selectDate = this.selectDatePreview;
    this.isRange = false;
  }

  rangeChange(): void {
    if (!!this.datepicker && !!this.datepickerPreview) {
      this.isRange = true;
      if (
        this.datepickerPreview.startDate !== this.datepicker.startDate ||
        (this.datepickerPreview.endDate !== this.datepicker.endDate &&
          this.datepicker.endDate)
      ) {
        this.existDate = false;
      }
    }

    if (
      !!this.datepicker &&
      this.datepicker.startDate < this.datepicker.endDate &&
      !this.existDate
    ) {
      let dateInitFilter;
      let dateEndFilter;
      let notFound;

      dateInitFilter = moment(this.datepicker.startDate).format('DD-MM-YYYY');
      dateEndFilter = moment(this.datepicker.endDate).format('DD-MM-YYYY');
      notFound = 'Otro periodo';

      this.isRange = false;
      this.filter.emit({
        dateRange: [dateInitFilter, dateEndFilter],
        notFound,
      });

      this.existDate = true;
    }
  }
}
