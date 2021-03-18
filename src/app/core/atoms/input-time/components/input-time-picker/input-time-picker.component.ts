import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { DatesHelper } from '@helpers/dates.helper';

@Component({
    selector: 'app-input-time-picker',
    templateUrl: 'input-time-picker.component.html',
    styleUrls: ['input-time-picker.component.sass']
})
export class InputTimePickerComponent implements OnInit {
    private defaultMinHour = DatesHelper.Date('00:00:00', DATES_FORMAT.hourMinuteSecond);
    private defaultMaxHour = DatesHelper.Date('23:59:59', DATES_FORMAT.hourMinuteSecond);
    private defaultAmMaxHour = DatesHelper.Date('11:59:59', DATES_FORMAT.hourMinuteSecond);
    private defaultPmMinHour = DatesHelper.Date('12:00:00', DATES_FORMAT.hourMinuteSecond);

    private time: number;
    public dateTime: boolean;
    private minHourDate = this.defaultMinHour.clone();
    private maxHourDate = this.defaultMaxHour.clone();

    public dateTimePickerList = [];
    public hoursPickerList = [];
    public minutesPickerList = [];

    public hoursPickerValue = '00';
    public minutesPickerValue = '00';
    public dateTimePickerValue = this.dateTimePickerList[0];


    @Input('time') set _time(time: number) {
        this.time = time ? time : DatesHelper.Date().valueOf();
        this.setTimePicker();
    }

    @Input('dateTime')
    set _dateTime(dateTime: boolean) {
        this.dateTime = dateTime;
    }

    @Input('minHour')
    set _minHour(minHour: number) {
        this.minHourDate = minHour ?
            DatesHelper.Date(minHour, DATES_FORMAT.millisecond) :
            this.defaultMinHour.clone();
        this.setHourPickerList();
    }

    @Input('maxHour')
    set _maxHour(maxHour: number) {
        this.maxHourDate = maxHour ?
            DatesHelper.Date(maxHour, DATES_FORMAT.millisecond) :
            this.defaultMaxHour.clone();
        this.setHourPickerList();
    }

    @Output() timeChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    get hourFormat() {
        return this.dateTime ? 'hh' : 'HH';
    }

    get timeFormat() {
        return this.dateTime ?
            `${this.hourFormat}:mm A` :
            `${this.hourFormat}:mm`;
    }

    get pickerHour() {
        const pickerHour = this.dateTime ?
            `${this.hoursPickerValue}:00 ${this.dateTimePickerValue}` :
            `${this.hoursPickerValue}:00`;
        return DatesHelper.Date(pickerHour, this.timeFormat);
    }

    get pickerTime() {
        const pickerTime = this.dateTime ?
            `${this.hoursPickerValue}:${this.minutesPickerValue} ${this.dateTimePickerValue}` :
            `${this.hoursPickerValue}:${this.minutesPickerValue}`;
        return DatesHelper.Date(pickerTime, this.timeFormat);
    }

    get minHourByDateTime() {
        const isAfterDefaultMinHour = this.pickerTime.isSameOrAfter(this.defaultPmMinHour, 'hours');
        const minHourIsBeforeDefaultMinHour = this.minHourDate.isBefore(this.defaultPmMinHour, 'hours');
        return this.dateTime && isAfterDefaultMinHour && minHourIsBeforeDefaultMinHour
            ? this.defaultPmMinHour : this.minHourDate;
    }

    get maxHourByDateTime() {
        const isBeforeDefaultMaxHour = this.pickerTime.isSameOrBefore(this.defaultAmMaxHour, 'hours');
        const maxHourIsAfterDefaultMaxHour = this.maxHourDate.isAfter(this.defaultAmMaxHour, 'hours');
        return this.dateTime && isBeforeDefaultMaxHour && maxHourIsAfterDefaultMaxHour
            ? this.defaultAmMaxHour : this.maxHourDate;
    }

    updateHourPickerValue() {
        const isAfterMaxHour = this.pickerTime.isAfter(this.maxHourByDateTime, 'hours');
        const isBeforeMinHour = this.pickerTime.isBefore(this.minHourByDateTime, 'hours');
        this.hoursPickerValue = isBeforeMinHour ? this.minHourByDateTime.format(this.hourFormat) : this.hoursPickerValue;
        this.hoursPickerValue = isAfterMaxHour ? this.maxHourByDateTime.format(this.hourFormat) : this.hoursPickerValue;
    }

    updateMinutePickerValue() {
        const isAfterMaxMinute = this.pickerTime.isAfter(this.maxHourByDateTime, 'minutes');
        const isBeforeMinMinute = this.pickerTime.isBefore(this.minHourByDateTime, 'minutes');
        this.minutesPickerValue = isAfterMaxMinute ? this.maxHourByDateTime.format('mm') : this.minutesPickerValue;
        this.minutesPickerValue = isBeforeMinMinute ? this.minHourByDateTime.format('mm') : this.minutesPickerValue;
    }

    setTimePicker() {
        const date = DatesHelper.Date(this.time, DATES_FORMAT.millisecond);
        this.hoursPickerValue = date.format(this.hourFormat);
        this.minutesPickerValue = date.format('mm');
        this.dateTimePickerValue = date.format('A');
        this.setHourPickerList();
    }


    setHourPickerList() {
        const hoursPickerList = [];
        const minHourByDateTime = this.minHourByDateTime.clone();
        const maxHourByDateTime = this.maxHourByDateTime.clone();
        while (minHourByDateTime.isSameOrBefore(maxHourByDateTime, 'hour')) {
            hoursPickerList.push(minHourByDateTime.format(this.hourFormat));
            minHourByDateTime.add(1, 'hour');
        }

        this.hoursPickerList = [...new Set(hoursPickerList)];
        this.updateHourPickerValue();
        this.setMinutePickerList();
        this.setDateTimeList();
    }

    setMinutePickerList() {
        const minutesPickerList = [];
        const maxMinutesPickerHour = this.pickerHour.clone().add(59, 'minutes');
        const isSameHour = this.pickerTime.isSame(this.minHourByDateTime, 'h');
        const isAfterMaxHour = maxMinutesPickerHour.isAfter(this.maxHourByDateTime);
        const minMinutes = isSameHour ? this.minHourByDateTime.clone() : this.pickerHour.clone();
        const maxMinutes = isAfterMaxHour ? this.maxHourByDateTime.clone() : maxMinutesPickerHour.clone();

        while (minMinutes.isSameOrBefore(maxMinutes, 'minutes')) {
            minutesPickerList.push(minMinutes.format('mm'));
            minMinutes.add(1, 'minute');
        }

        this.minutesPickerList = [...new Set(minutesPickerList)];
        this.updateMinutePickerValue();
    }

    setDateTimeList() {
        const AM = 'AM';
        const PM = 'PM';
        let dateTimePickerList: string[];
        const hasAm = this.minHourDate.format('A') === 'AM';
        const hasPm = this.maxHourDate.format('A') === 'PM';
        dateTimePickerList = hasAm ? [AM] : [];
        dateTimePickerList = hasPm ? [...dateTimePickerList, PM] : dateTimePickerList;
        this.dateTimePickerList = dateTimePickerList;
    }

    hourPickerChange(hour: string) {
        this.hoursPickerValue = hour;
        this.setMinutePickerList();
        this.timeChangeEvent();
    }

    minutePickerChange(minute: string) {
        this.minutesPickerValue = minute;
        this.timeChangeEvent();
    }

    dateTimePickerChange(dateTime: string) {
        this.dateTimePickerValue = dateTime;
        this.setHourPickerList();
        this.timeChangeEvent();
    }

    timeChangeEvent() {
        const time = DatesHelper.Date(this.pickerTime, this.timeFormat).valueOf();
        this.timeChange.emit(time);
    }
}
