import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CapacityRangeControl } from '../../../controls/capacity-range.control';
import { ExpressResourceControl } from '../controls/express-resource.control';

@Injectable()
export class OpCapacitiesStepExpressResourceFormService implements OnDestroy {

  private readonly expressResourceForm: FormGroup;

  private _capacityRangeControl: FormControl = new CapacityRangeControl();
  private _expressResourceControl: FormControl = new ExpressResourceControl();

  get expressResourceForm$(): FormGroup {
    return this.expressResourceForm;
  }

  get capacityRange(): AbstractControl {
    return this.expressResourceForm$.get('capacityRange');
  }

  get expressResource(): AbstractControl {
    return this.expressResourceForm$.get('expressResource');
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.expressResourceForm = this._formBuilder.group({
      capacityRange: this._capacityRangeControl,
      expressResource: this._expressResourceControl,
    });
  }

  resetForm(): void {
    this.capacityRange.setValue(null);
    this.expressResource.setValue(null);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

}
