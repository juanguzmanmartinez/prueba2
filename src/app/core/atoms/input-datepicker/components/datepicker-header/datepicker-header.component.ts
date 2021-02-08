import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-datepicker-header',
    templateUrl: './datepicker-header.component.html',
    styleUrls: ['./datepicker-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHeaderComponent<D> implements OnDestroy {
    private _destroyed = new Subject<void>();

    constructor(
        private _calendar: MatCalendar<D>,
        private _dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private _dateFormats: any,
        changeDetectorRef: ChangeDetectorRef) {
        _calendar.stateChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => changeDetectorRef.markForCheck());
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
    }

    nextClicked() {
        this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1);
    }
}
