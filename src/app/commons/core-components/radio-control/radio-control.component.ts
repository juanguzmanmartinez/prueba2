import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioControlComponent),
      multi: true
    }
  ]
})
export class RadioControlComponent implements OnInit {

  public isDisabled: boolean;
  public value: any; // = '-1';

  @Input() radioOptionValue: string;
  @Input() name = 'defaultName';
  @Input() hasStopPropagation = true;

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }


  writeValue(value: any): void {
    if (typeof value === 'string' || typeof value === 'number') {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public selectCheck(event: MouseEvent) {
    if (this.hasStopPropagation) {
      event.stopPropagation();
    } else {
      this.value = this.radioOptionValue;

      this.onChange(this.value);
    }
    this.onTouch(this.value);
  }

}
