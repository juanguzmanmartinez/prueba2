import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { DatesHelper } from '@helpers/dates.helper';

@Component({
    selector: 'app-input-time-picker',
    templateUrl: 'input-time-picker.component.html',
    styleUrls: ['input-time-picker.component.sass']
})
export class InputTimePickerComponent implements OnInit {
    private minHourDate = DatesHelper.Date('00:00:00', DATES_FORMAT.hourMinuteSecond);
    private maxHourDate = DatesHelper.Date('23:59:59', DATES_FORMAT.hourMinuteSecond);
    public dateTimeHourFormat: string;

    public dateTimePickerList = ['AM', 'PM'];
    public hoursPickerList = [];
    public minutesPickerList = [];

    public hoursPickerValue = '00';
    public minutesPickerValue = '00';
    public dateTimePickerValue = this.dateTimePickerList[0];

    public time: number;
    public dateTime: boolean;

    @Input('time') set _time(time: number) {
        this.time = time;
        this.setTimePicker();
    }

    @Input('dateTime')
    set _dateTime(dateTime: boolean) {
        this.dateTime = dateTime;
        this.setFormats();
    }

    @Input('minHour')
    set _minHour(minHour: number) {
        if (minHour) {
            this.minHourDate = DatesHelper.Date(minHour, DATES_FORMAT.millisecond);
        } else {
            const defaultMinDate = '00:00:00';
            this.minHourDate = DatesHelper.Date(defaultMinDate, DATES_FORMAT.hourMinuteSecond);
        }
        this.setHoursPickerList();
    }

    @Input('maxHour')
    set _maxHour(maxHour: number) {
        if (maxHour) {
            this.maxHourDate = DatesHelper.Date(maxHour, DATES_FORMAT.millisecond);
        } else {
            const defaultMaxDate = '23:59:59';
            this.maxHourDate = DatesHelper.Date(defaultMaxDate, DATES_FORMAT.hourMinuteSecond);
        }
        this.setHoursPickerList();
    }

    @Output() timeChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    timeChangeEvent() {
        const timeValue = this.dateTime ?
            `${this.hoursPickerValue}:${this.minutesPickerValue} ${this.dateTimePickerValue}` : `${this.hoursPickerValue}:${this.minutesPickerValue}`;
        const timeValueFormat = this.dateTime ? `${this.dateTimeHourFormat}:mm A` : `${this.dateTimeHourFormat}:mm`;
        const time = DatesHelper.Date(timeValue, timeValueFormat).valueOf();
        this.timeChange.emit(time);
    }

    setFormats() {
        this.dateTimeHourFormat = this.dateTime ? 'hh' : 'HH';
    }


    setTimePicker() {
        const date = DatesHelper.Date(this.time, DATES_FORMAT.millisecond);
        this.hoursPickerValue = date.format(this.dateTimeHourFormat);
        this.minutesPickerValue = date.format('mm');
        this.dateTimePickerValue = date.format('A');

        this.setHoursPickerList();
    }

    setHoursPickerList() {
        const pmMinHour = DatesHelper.Date('12:00:00', DATES_FORMAT.hourMinuteSecond);
        const amMaxHour = DatesHelper.Date('11:59:59', DATES_FORMAT.hourMinuteSecond);
        const hourSelectedByDateTime = this.dateTime ?
            `${this.hoursPickerValue}:00 ${this.dateTimePickerValue}` : `${this.hoursPickerValue}:00`;
        const hourFormatByDateTime = this.dateTime ? `${this.dateTimeHourFormat}:mm A` : `${this.dateTimeHourFormat}:mm`;

        const hourSelected = DatesHelper.Date(hourSelectedByDateTime, hourFormatByDateTime);
        const minHourByDateTime = this.dateTime && hourSelected.isSameOrAfter(pmMinHour, 'hours') ? pmMinHour : this.minHourDate.clone();
        const maxHourByDateTime = this.dateTime && hourSelected.isSameOrBefore(amMaxHour, 'hours') ? amMaxHour : this.maxHourDate.clone();
        const hoursPickerList = [];

        const isAfterMaxHour = hourSelected.isAfter(this.maxHourDate, 'hours');
        const isBeforeMinHour = hourSelected.isBefore(this.minHourDate, 'hours');
        this.hoursPickerValue = isBeforeMinHour ? this.minHourDate.format(this.dateTimeHourFormat) : this.hoursPickerValue;
        this.hoursPickerValue = isAfterMaxHour ? this.maxHourDate.format(this.dateTimeHourFormat) : this.hoursPickerValue;
        while (minHourByDateTime.isSameOrBefore(maxHourByDateTime, 'hour')) {
            hoursPickerList.push(minHourByDateTime.format(this.dateTimeHourFormat));
            minHourByDateTime.add(1, 'hour');
        }
        this.hoursPickerList = [...new Set(hoursPickerList)];

        this.setMinutesPickerList();
    }

    setMinutesPickerList() {
        const hourByDateTime = this.dateTime ?
            `${this.hoursPickerValue}:00 ${this.dateTimePickerValue}` : `${this.hoursPickerValue}:00`;
        const minuteByDateTime = this.dateTime ?
            `${this.hoursPickerValue}:${this.minutesPickerValue} ${this.dateTimePickerValue}` : `${this.hoursPickerValue}:${this.minutesPickerValue}`;
        const hourFormatByDateTime = this.dateTime ? `${this.dateTimeHourFormat}:mm A` : `${this.dateTimeHourFormat}:mm`;
        const hourSelected = DatesHelper.Date(hourByDateTime, hourFormatByDateTime);
        const minuteSelected = DatesHelper.Date(minuteByDateTime, hourFormatByDateTime);

        const isMinHour = hourSelected.isSame(this.minHourDate, 'hour');
        const isMaxHour = hourSelected.isSame(this.maxHourDate, 'hour');
        const nextHour = hourSelected.clone().add(59, 'minutes');
        const hourSelectedClone = hourSelected.clone();
        const minuteSelectedClone = minuteSelected.clone();
        const minutesPickerList = [];
        const isBeforeMinMinute = minuteSelectedClone.isBefore(this.minHourDate, 'minutes');
        this.minutesPickerValue = isBeforeMinMinute ? this.minHourDate.format('mm') : this.minutesPickerValue;
        const isAfterMaxMinute = minuteSelectedClone.isAfter(this.maxHourDate, 'minutes');
        this.minutesPickerValue = isAfterMaxMinute ? this.maxHourDate.format('mm') : this.minutesPickerValue;
        const minHourClone = this.minHourDate.clone();
        if (isMinHour && !isMaxHour) {
            while (minHourClone.isSameOrBefore(nextHour, 'minutes')) {
                minutesPickerList.push(minHourClone.format('mm'));
                minHourClone.add(1, 'minute');
            }
        }
        if (isMaxHour && !isMinHour) {
            while (hourSelectedClone.isSameOrBefore(this.maxHourDate, 'minutes')) {
                minutesPickerList.push(hourSelectedClone.format('mm'));
                hourSelectedClone.add(1, 'minute');
            }
        }

        if (isMinHour && isMaxHour) {
            while (minHourClone.isSameOrBefore(this.maxHourDate, 'minutes')) {
                minutesPickerList.push(minHourClone.format('mm'));
                minHourClone.add(1, 'minute');
            }
        }

        if (!isMinHour && !isMaxHour) {
            while (hourSelectedClone.isSameOrBefore(nextHour, 'minutes')) {
                minutesPickerList.push(hourSelectedClone.format('mm'));
                hourSelectedClone.add(1, 'minute');
            }
        }
        this.minutesPickerList = [...new Set(minutesPickerList)];
    }

    hoursPickerChange(hour: string) {
        this.hoursPickerValue = hour;
        this.setMinutesPickerList();
        this.timeChangeEvent();
    }

    minutesPickerChange(minute: string) {
        this.minutesPickerValue = minute;
        this.timeChangeEvent();
    }

    dateTimePickerChange(dateTime: string) {
        this.dateTimePickerValue = dateTime;
        this.setHoursPickerList();
        this.timeChangeEvent();
    }
}
