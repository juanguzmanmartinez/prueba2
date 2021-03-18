import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatesHelper } from '@helpers/dates.helper';

@Component({
    selector: 'app-datepicker-header',
    templateUrl: './datepicker-header.component.html',
    styleUrls: ['./datepicker-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHeaderComponent<D> implements OnInit, OnDestroy {
    private _destroyed = new Subject<void>();

    public minDateLimit = false;
    public maxDateLimit = false;

    constructor(
        private _calendar: MatCalendar<D>,
        private _dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private _dateFormats: any,
        changeDetectorRef: ChangeDetectorRef) {
        _calendar.stateChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => changeDetectorRef.markForCheck());
    }

    ngOnInit() {
        this.toggleActions();
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    get periodLabel() {
        return this._dateAdapter
            .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
            .toLocaleUpperCase();
    }

    previousClicked() {
        this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1);
        this.toggleActions();
    }

    nextClicked() {
        this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1);
        this.toggleActions();
    }

    toggleActions() {
        const activeDate = DatesHelper.Date(this._calendar.activeDate);
        const minDate = DatesHelper.Date(this._calendar.minDate);
        const maxDate = DatesHelper.Date(this._calendar.maxDate);
        this.minDateLimit = activeDate.isSame(minDate, 'M');
        this.maxDateLimit = maxDate.isValid() ? activeDate.isSame(maxDate, 'M') : false;
    }


}
