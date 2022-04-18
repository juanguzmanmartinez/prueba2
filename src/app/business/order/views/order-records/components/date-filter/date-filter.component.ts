import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { InputDatepickerRangeComponent } from '@atoms/input-datepicker/input-datepicker-range/input-datepicker-range.component';
import { SelectComponent } from '@atoms/select/select.component';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import * as moment from 'moment/moment';
import {
  DatepickerFilter,
  DatepickerFilterEvent,
} from '../../interfaces/order-records.interface';

enum dates {
  hoy = 'Hoy',
  ayer = 'Ayer',
  ultimaSemana = 'Última semana',
  ultimoMes = 'Último mes',
  otroPeriodo = 'Otro periodo',
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  readonly typeDates = [
    dates.hoy,
    dates.ayer,
    dates.ultimaSemana,
    dates.ultimoMes,
    dates.otroPeriodo,
  ];

  selectDate: string;
  selectDatePreview: string;

  datepicker: DatepickerFilter;
  datepickerPreview: DatepickerFilter = { startDate: null, endDate: null };
  existDate = false;
  isRange = false;

  private sixMonths = 184 * 24 * 60 * 60 * 1000;
  today = new Date().getTime();
  minDateSearch = this.today - this.sixMonths;

  @Output() filter = new EventEmitter<DatepickerFilterEvent>();
  @ViewChild('inputDatepickerRange')
  inputDatepickerRange: InputDatepickerRangeComponent;
  @ViewChild('appSelect') appSelect: SelectComponent<any>;

  constructor(private orderFilterStore: OrderFilterStore) {}

  ngOnInit(): void {
    const { typeDatePromise, datePromise } =
      this.orderFilterStore.getOrderFilter();

    if (typeDatePromise === dates.otroPeriodo) {
      this.isRange = true;
      this.datepicker = {
        startDate: new Date(this.reformatDateRange(datePromise[0])).getTime(),
        endDate: new Date(this.reformatDateRange(datePromise[1])).getTime(),
      };
    } else {
      this.selectDate = typeDatePromise ?? '';
    }
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
      this.selectDate = '';
      this.orderFilterStore.setTypeDatePromise = null;

      this.inputDatepickerRange.open();

      this.datepicker = null;
      return;
    }

    this.orderFilterStore.setTypeDatePromise = type;

    this.filter.emit({
      dateRange: type ? [dateInitFilter, dateEndFilter] : null,
      notFound: type ? notFound : null,
    });
  }

  clearValues(): void {
    this.selectDate = '';
  }

  cancelDateRange(): void {
    this.selectDate = '';
    this.orderFilterStore.setTypeDatePromise = null;
    this.selectionChange(null);

    this.isRange = false;
    this.datepicker = null;
    this.appSelect.open();
  }

  rangeChange(): void {
    if (!this.isRange) {
      return;
    }

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
      this.datepicker.startDate < this.datepicker.endDate
    ) {
      let dateInitFilter;
      let dateEndFilter;
      let notFound;

      dateInitFilter = moment(this.datepicker.startDate).format('DD-MM-YYYY');
      dateEndFilter = moment(this.datepicker.endDate).format('DD-MM-YYYY');
      notFound = 'Otro periodo';

      this.orderFilterStore.setTypeDatePromise = notFound;

      this.filter.emit({
        dateRange: [dateInitFilter, dateEndFilter],
        notFound,
      });
    }
  }

  private reformatDateRange = (date: string): string => {
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 8);
    return `${month}-${day}-${year}`;
  };

  addDays(date: Date, days: number): number {
    date.setDate(date.getDate() + days);
    return date.getTime();
  }
}
