import {Component, Input, OnInit, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements ControlValueAccessor, OnInit {
  @Input() radioValue: any;
  @Input() radioClass: any;

  public _radioName: string | number = 'radio';
  public _radioValue: any;
  public _radioDisabled: any;

  onChange = (_: any) => {
  }
  onTouched = (_: any) => {
  }


  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    if (this.ngControl.name) {
      this._radioName = this.ngControl.name;
    }

    this.ngControl.control.valueChanges.subscribe(value => {
      if (this._radioValue === value) {
        return;
      }
      this.writeValue(value);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this._radioValue = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._radioDisabled = isDisabled;
  }

  chooseRadio() {
    this._radioValue = this.radioValue;
    this.onChange(this._radioValue);
  }

}
