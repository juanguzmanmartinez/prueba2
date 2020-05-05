import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomControl } from '../controls/custom-control';
import { CustomSelectControl } from '../controls/custom-select-control';

@Injectable({
  providedIn: 'root'
})
export class OperationAdminCalendarService {
  public form: FormGroup = new FormGroup({});

  private checkbox = new CustomControl();
  private dropdow = new CustomSelectControl();

  private subscriptions: Subscription[] = [];
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkbox: this.checkbox,
      dropdow : this.dropdow
    });
  }

  public get checkboxControl() {
    return this.form.get('checkbox') as CustomControl;
  }

  public get dropdowControl() {
    return this.form.get('dropdow') as CustomSelectControl;
  }

  public get formValues() {
    return {
      checkbox: this.checkbox.value,
      dropdow: this.dropdow.value
    };
  }
}
