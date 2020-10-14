import {Component, OnDestroy, OnInit, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {InputComponent} from '../input/input.component';


@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.sass']
})

export class InputNumberComponent extends InputComponent implements OnInit, OnDestroy {
  public inputType = 'number';

  constructor(@Self() public ngControl: NgControl) {
    super(ngControl);
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    if (this.ngControl.name) {
      this.inputName = this.ngControl.name;
    }
    if (this.ngControl.control) {
      const subscription = this.ngControl.control.valueChanges
        .subscribe((value) => {
          if (this.inputValue === value) {
            return;
          }
          this.writeValue(value);
        });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  writeValue(value: number): void {
    this.inputValue = value;
  }


  changeInputValue() {
    if (typeof this.inputValue === 'string') {
      const parseNumber = parseInt(this.inputValue, 10);
      this.inputValue = isNaN(parseNumber) ? null : parseNumber;
    }
    this.onChange(this.inputValue);
    this.onTouch(this.inputValue);
  }
}
