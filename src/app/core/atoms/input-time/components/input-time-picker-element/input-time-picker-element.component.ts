import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-input-time-picker-element',
    templateUrl: 'input-time-picker-element.component.html',
    styleUrls: ['input-time-picker-element.component.sass']
})
export class InputTimePickerElementComponent {
    public pickerText: string;
    public pickerValue: string;
    public pickerList: string[];

    private indexSelected = 0;

    @Input('pickerList')
    set _pickerList(pickerList: string[]) {
        this.pickerList = pickerList;
        this.getPickerIndex();
    }

    @Input('pickerValue')
    set _pickerValue(value: string) {
        this.pickerValue = value;
        this.getPickerIndex();
    }

    @Output() pickerChange = new EventEmitter<string>();

    constructor() {
    }

    getPickerIndex() {
        this.pickerText = this.pickerValue || this.pickerList[0];
        this.indexSelected = this.pickerList.findIndex((value) => value === this.pickerText);
    }

    upPicker() {
        this.indexSelected = this.indexSelected + 1;
        this.pickerText = this.pickerList[this.indexSelected];
        this.pickerChange.emit(this.pickerText);
    }

    downPicker() {
        this.indexSelected = this.indexSelected - 1;
        this.pickerText = this.pickerList[this.indexSelected];
        this.pickerChange.emit(this.pickerText);
    }

    get upPickerDisabled() {
        return this.indexSelected === (this.pickerList.length - 1);
    }

    get downPickerDisabled() {
        return this.indexSelected === 0 || this.indexSelected === -1;
    }
}
