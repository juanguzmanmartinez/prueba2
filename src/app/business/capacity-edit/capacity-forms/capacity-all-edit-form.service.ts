import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class CapacityAllEditFormService {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      allCapacities: new FormControl('')
    });
  }

  public get allCapacitiesControl() {
    return this.form.get('allCapacities');
  }
}
