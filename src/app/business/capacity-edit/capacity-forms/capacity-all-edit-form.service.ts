import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class CapacityAllEditFormService {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      allCapacities: new FormControl('', Validators.required)
    });
  }

  public get allCapacitiesControl() {
    return this.form.get('allCapacities');
  }
}
