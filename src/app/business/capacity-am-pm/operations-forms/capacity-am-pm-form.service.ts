import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DefaultRadioControl } from '../controls/default-radio.control';
import { CustomSelectControl } from '../../operations-admin/controls/custom-select-control';
import { CustomControl } from '../../operations-admin/controls/custom-control';

@Injectable({
  providedIn: 'root'
})
export class CapacityAmPmService {
  public form: FormGroup = new FormGroup({});

  private radio = new DefaultRadioControl();
  private dropdow = new CustomSelectControl();
  private startDate = new CustomControl();
  private endDate = new CustomControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      radio: this.radio,
      dropdow: this.dropdow,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  public get radioControl() {
    return this.form.get('radio') as DefaultRadioControl;
  }


  public get dropdowControl() {
    return this.form.get('dropdow') as CustomSelectControl;
  }

  public get startDateControl() {
    return this.form.get('startDate') as CustomSelectControl;
  }

  public get endDateControl() {
    return this.form.get('endDate') as CustomSelectControl;
  }

  // public get formValues() {
  //   return {
  //     radio: this.radio.value,
  //     dropdow: this.dropdow.value
  //   };
  // }

}
