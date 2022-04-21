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
import { EDates } from '../../constants/order-filters.constant';
import {
  DatepickerFilter,
  DatepickerFilterEvent,
} from '../../interfaces/order-records.interface';
import { OrderFormPresenter } from '../../order-form.presenter';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  readonly typeDates = [
    EDates.hoy,
    EDates.ayer,
    EDates.ultimaSemana,
    EDates.ultimoMes,
    EDates.otroPeriodo,
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

  constructor(
    private orderFilterStore: OrderFilterStore,
    public presenter: OrderFormPresenter
  ) {}

  ngOnInit(): void {
    const { typeDatePromise, datePromise } =
      this.orderFilterStore.getOrderFilter();

    if (typeDatePromise === EDates.otroPeriodo) {
      this.isRange = true;

      this.datepicker = {
        startDate: new Date(this.reformatDateRange(datePromise[0])).getTime(),
        endDate: new Date(this.reformatDateRange(datePromise[1])).getTime(),
      };
    } else {
      this.selectDate = typeDatePromise ?? '';
    }
    this.resetReactive();
  }

  resetReactive() {
    this.orderFilterStore.getIsResetFilters().subscribe((isReset) => {
      if (isReset) {
        this.selectDate = '';
        this.orderFilterStore.setTypeDatePromise = null;
        this.selectionChange(null);
        this.clearValues();
        this.isRange = false;
        this.orderFilterStore.setIsResetFilters(false);
      }
    });
  }

  selectionChange(type: string): void {
    let dateInitFilter;
    let dateEndFilter;
    let notFound;
    this.clearPromiseDateRange();

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
      this.orderFilterStore.setTypeDatePromise = type;

      this.inputDatepickerRange.open();

      this.datepicker = null;
      return;
    }

    this.orderFilterStore.setTypeDatePromise = type;

    this.presenter.filterForm
      .get('promiseDate')
      .setValue(type ? [dateInitFilter, dateEndFilter] : null);
  }

  clearValues(): void {
    this.selectDate = '';
    this.presenter.filterForm.get('promiseDateSelect').reset();
    this.presenter.filterForm.get('promiseDate').reset();
    this.presenter.filterForm.get('promiseRangeDate').reset();
  }

  clearPromiseDateRange(): void {
    this.presenter.filterForm.get('promiseRangeDate').setValue(null);
  }

  cancelDateRange(): void {
    this.selectDate = '';
    this.orderFilterStore.setTypeDatePromise = null;
    this.selectionChange(null);
    this.clearValues();
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

      this.presenter.filterForm
        .get('promiseDate')
        .setValue([dateInitFilter, dateEndFilter]);
    }
  }

  private reformatDateRange(date: string): string {
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 8);
    return `${month}-${day}-${year}`;
  }

  addDays(date: Date, days: number): number {
    date.setDate(date.getDate() + days);
    return date.getTime();
  }
}
