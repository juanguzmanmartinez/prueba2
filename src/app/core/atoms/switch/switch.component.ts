import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SwitchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscriptions: Subscription[] = [];
  public switchControl = new FormControl(false);

  @Input() name: number | string = 'switch';
  @Input() innerClass: string;
  @Input() backgroundClass: string = '';

  @Input('checked')
  set checked(checked: boolean) {
    this.switchControl.patchValue(checked);
  }

  @Input('disabled')
  set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl?.name) {
      this.name = this.ngControl.name;
    }
    if (this.ngControl?.control) {
      const subscription = this.ngControl.valueChanges.subscribe(() => {
        this.switchControl.patchValue(this.ngControl.value);
      });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  toggle() {
    this.onChange(this.switchControl.value);
  }

  getClassIfChecked() {
    return { [this.backgroundClass]: this.switchControl.value === true };
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.switchControl.disable();
    } else {
      this.switchControl.enable();
    }
  }

  writeValue(value: boolean): void {
    this.switchControl.patchValue(value);
  }
}
