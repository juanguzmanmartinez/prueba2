import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  public _checkboxChecked: boolean;
  public _checkboxIndeterminate: boolean;

  @Input() checkboxDisabled: any;
  @Input() checkboxName: any = 'radio';
  @Input() checkboxClass: any;

  @Input('checkboxChecked')
  get checkboxChecked(): boolean {
    return this._checkboxChecked;
  }

  set checkboxChecked(checked) {
    this._checkboxChecked = checked;
  }

  @Input('checkboxIndeterminate')
  get checkboxIndeterminate(): boolean {
    return this._checkboxIndeterminate;
  }

  set checkboxIndeterminate(checked) {
    this._checkboxIndeterminate = checked;
  }

  onChange = (_: any) => {
  }

  onClick = (_: any) => {
  }
  onTouched = () => {
  }


  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
  }

  checkboxClick(event) {
    this.onClick(event);
  }

  chooseCheckbox() {
    this.onChange(this._checkboxChecked);
    this._checkboxIndeterminate = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.checkboxDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._checkboxChecked = obj;
  }

}
