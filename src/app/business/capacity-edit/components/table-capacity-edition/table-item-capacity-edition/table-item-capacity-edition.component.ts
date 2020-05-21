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

  item: ISegment;


  public isDisabled = false;
  public value = {};

  @Input() label = '';
  @Input() size = 'm'; // 's', 'm', 'l'
  @Input() marginBottom = '';
  @Input() customClass = '';
  @Input() hasErrorMessage = false;
  @Input() errorMessage = '';
  @Input() width = '';
  @Input() maxLength = 100;
  @Input() placeholder = '';
  @Input() icon = '';

  constructor() { }

  ngOnInit() {
    this.segments = '00:00 - 00:30';
    // tslint:disable-next-line:no-string-literal
    this.item = this.frm.value['schedule'] as ISegment;
    this.value = { value: this.item.capacity, hour: this.item.hour};
    // this.frm.get('schedule').setValue(this.item.capacity, this.item.hour);
    this.isDisabled = this.item.enabled;
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
