import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISegment } from 'src/app/shared/services/models/capacity.model';

@Component({
  selector: 'app-table-item-capacity-edition',
  templateUrl: './table-item-capacity-edition.component.html',
  styleUrls: ['./table-item-capacity-edition.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableItemCapacityEditionComponent),
      multi: true
    }
  ]
})
export class TableItemCapacityEditionComponent implements OnInit {

  @Input()
  segments: string;
  @Input()
  frm: FormGroup;
  item: ISegment = {} as ISegment;


  public isDisabled = false;
  public value = 0;

  @Input() hasErrorMessage = false;
  @Input() errorMessage = '';
  @Input() maxLength = 3;
  @Input() placeholder = '';

  constructor() { }

  ngOnInit() {
    this.segments = '00:00 - 00:30';
    this.item = this.frm.get('schedule').value ? this.frm.get('schedule').value as ISegment : {} as ISegment;
    this.value = this.item.capacity;
    this.frm.get('schedule').setValue(this.item.capacity);
  }

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  writeValue(value: any): void {
    if (typeof value === 'number') {
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

  public changeInput(target: HTMLInputElement) {
    const value = target.value;
    this.onChange(Number(value));
    this.onTouch(true);
  }

}
