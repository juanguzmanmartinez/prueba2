import {Injectable, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CapacityRangeControl} from '../../../controls/capacity-range.control';
import {ExpressResourceControl} from '../controls/express-resource.control';

@Injectable()
export class OperationsCapacitiesStepExpressResourceFormService implements OnDestroy {
  private readonly expressCapacityForm: FormGroup;

  private _capacityRangeControl: FormControl = new CapacityRangeControl();
  private _expressResourceControl: FormControl = new ExpressResourceControl();

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.expressCapacityForm = this._formBuilder.group({
      capacityRange: this._capacityRangeControl,
      expressResource: this._expressResourceControl,
    });
  }

  get expressResourceForm$() {
    return this.expressCapacityForm;
  }

  get capacityRange() {
    return this.expressResourceForm$.get('capacityRange');
  }

  get expressResource() {
    return this.expressResourceForm$.get('expressResource');
  }


  resetForm() {
    this.capacityRange.setValue(null);
    this.expressResource.setValue(null);
  }

  ngOnDestroy() {
    this.resetForm();
  }

}
