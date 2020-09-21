import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DefaultRadioControl } from '../controls/default-radio.control';
import { CustomSelectControl } from '../../operations-admin/controls/custom-select-control';

@Injectable({
  providedIn: 'root'
})
export class CapacityExpressService {
  public form: FormGroup = new FormGroup({});

  private radio = new DefaultRadioControl();
  private dropdow = new CustomSelectControl();
  private quantity = new FormControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      radio: this.radio,
      dropdow: this.dropdow,
      quantity: this.quantity,
    });
  }

  public get radioControl() {
    return this.form.get('radio') as DefaultRadioControl;
  }


  public get dropdowControl() {
    return this.form.get('dropdow') as CustomSelectControl;
  }

  public get quantityControl() {
    return this.form.get('quantity') as FormControl;
  }

}
