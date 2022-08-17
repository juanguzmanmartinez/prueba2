import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ZoneServiceTypeSegmentGapControl } from '../controls/zone-service-type-segment-gap.control';

export class ZoneServiceTypeControlName {
  static state = 'state';
  static startHour = 'startHour';
  static endHour = 'endHour';
  static segmentGap = 'segmentGap';
  static intervalTime = 'intervalTime';
  static splitSegment = 'splitSegment';
  static company = 'companyCode';
  static customAmount = 'customAmount';
}

@Injectable()
export class OpZonesEditionServiceTypeDetailFormCardFormService
  implements OnDestroy
{
  private readonly formGroup: FormGroup;

  private _stateControl: FormControl = new FormControl(null);
  private _startHourControl: FormControl = new FormControl(null);
  private _endHourControl: FormControl = new FormControl(null);
  private _segmentGapControl: ZoneServiceTypeSegmentGapControl =
    new ZoneServiceTypeSegmentGapControl(null);
  private _intervalTimeControl: FormControl = new FormControl('');
  private _splitSegmentControl: FormControl = new FormControl('');
  private _splitCompanyControl: FormControl = new FormControl('');
  private _customAmountControl: FormControl = new FormControl('S/ 0.00');

  private _controlNameList = ZoneServiceTypeControlName;

  get form$(): FormGroup {
    return this.formGroup;
  }

  get stateControl(): FormControl {
    return this.form$.get(this._controlNameList.state) as FormControl;
  }

  get startHourControl(): FormControl {
    return this.form$.get(this._controlNameList.startHour) as FormControl;
  }

  get endHourControl(): FormControl {
    return this.form$.get(this._controlNameList.endHour) as FormControl;
  }

  get segmentGapControl(): ZoneServiceTypeSegmentGapControl {
    return this.form$.get(
      this._controlNameList.segmentGap
    ) as ZoneServiceTypeSegmentGapControl;
  }

  get intervalTimeControl(): FormControl {
    return this.form$.get(this._controlNameList.intervalTime) as FormControl;
  }

  get splitSegmentControl(): FormControl {
    return this.form$.get(this._controlNameList.splitSegment) as FormControl;
  }

  get companySegmentControl(): FormControl {
    return this.form$.get(this._controlNameList.company) as FormControl;
  }

  get customAmountControl(): FormControl {
    return this.form$.get(this._controlNameList.customAmount) as FormControl;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      [this._controlNameList.state]: this._stateControl,
      [this._controlNameList.startHour]: this._startHourControl,
      [this._controlNameList.endHour]: this._endHourControl,
      [this._controlNameList.segmentGap]: this._segmentGapControl,
      [this._controlNameList.intervalTime]: this._intervalTimeControl,
      [this._controlNameList.splitSegment]: this._splitSegmentControl,
      [this._controlNameList.company]: this._splitCompanyControl,
      [this._controlNameList.customAmount]: this._customAmountControl,
    });
  }

  resetForm(): void {
    this.stateControl.patchValue(null);
    this.startHourControl.patchValue(null);
    this.endHourControl.patchValue(null);
    this.segmentGapControl.patchValue(null);
    this.intervalTimeControl.patchValue(null);
    this.splitSegmentControl.patchValue(null);
    this.companySegmentControl.patchValue(null);
    this.customAmountControl.patchValue('S/ 0.00');
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  setServiceCostValidator() {
    this.customAmountControl.setValidators([this.serviceCostValidator()]);
    this.customAmountControl.updateValueAndValidity();
  }

  clearServiceCostValidator() {
    this.customAmountControl.clearValidators();
    this.customAmountControl.updateValueAndValidity();
  }

  serviceCostValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value &&
        control.value !== 'S/ 0.0' &&
        control.value !== '0' &&
        control.value !== 'S/ 0.00'
        ? null
        : { require: control.value };
    };
  }
}
