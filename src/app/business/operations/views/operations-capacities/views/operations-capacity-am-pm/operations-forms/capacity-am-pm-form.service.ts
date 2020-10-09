import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DefaultRadioControl } from '../controls/default-radio.control';
import { CustomSelectControl } from '../../../../../../operations-admin/controls/custom-select-control';
import { CustomControl } from '../../../../../../operations-admin/controls/custom-control';

@Injectable({
  providedIn: 'root'
})
export class CapacityAmPmService {
  public form: FormGroup = new FormGroup({});

  private radio = new DefaultRadioControl();
  private dropdow = new CustomSelectControl();
  private am = new FormControl('', [Validators.required]);
  private pm = new FormControl('', [Validators.required]);
  private startDate = new FormControl();
  private endDate = new FormControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      radio: this.radio,
      dropdow: this.dropdow,
      am: this.am,
      pm: this.pm,
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

  public get inputAMControl() {
    return this.form.get('am') as CustomSelectControl;
  }

  public get inputPMControl() {
    return this.form.get('pm') as CustomSelectControl;
  }
  public get startDateControl() {
    return this.form.get('startDate') as FormControl;
  }

  public get endDateControl() {
    return this.form.get('endDate') as FormControl;
  }

  // public get formValues() {
  //   return {
  //     radio: this.radio.value,
  //     dropdow: this.dropdow.value
  //   };
  // }

}
