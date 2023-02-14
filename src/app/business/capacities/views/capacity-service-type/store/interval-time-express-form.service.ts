import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CMessageError, CMessageErrorIsZero, CMessageErrorMaxValue, EIntervalControlName } from '../constants/interval-form-message.constant';
import { ExpressIntervalTime } from '../models/express-interval-time.model';

@Injectable()
export class IntervalTimeExpressFormService {
  stateControl = new FormControl(false, [Validators.required]);
  consumptionMaxControl = new FormControl('', [
    Validators.required,
    Validators.max(100),
    this.valueNotZeroValidator(),
  ]);
  capacityAddedControl = new FormControl('', [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  intervalTimeControl = new FormControl('', [
    this.valueNotZeroValidator(),
    Validators.required,
  ]);
  lapsControl = new FormControl('', [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  baseLineCapacityControl = new FormControl({ value: '', disabled: true });
  baseLineIntervalTimeControl = new FormControl({ value: '', disabled: true });
  isEditionStateControl = new FormControl(false);

  intervalTimeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.intervalTimeForm = this.fb.group({
      enabled: this.stateControl,
      addCapacity: this.capacityAddedControl,
      addIntervalTime: this.intervalTimeControl,
      laps: this.lapsControl,
      consumptionMax: this.consumptionMaxControl,
      baseLineCapacity: this.baseLineCapacityControl,
      baseLineIntervalTime: this.baseLineIntervalTimeControl,
      isEditionState: this.isEditionStateControl
    });
  }

  initValues() {
    this.stateControl.setValue(false);
    this.consumptionMaxControl.setValue('');
    this.capacityAddedControl.setValue('');
    this.intervalTimeControl.setValue('');
    this.lapsControl.setValue('');
    this.baseLineCapacityControl.setValue('');
    this.baseLineIntervalTimeControl.setValue('');
  }

  updateInvertalTimeForm(expInvertalTime: ExpressIntervalTime) {
    const { baseLineCapacity, baseLineIntervalTime, enabled, isEditionState } =
      expInvertalTime;
    const baseLineCapacityTransform = `${baseLineCapacity.toString()} transportista${
      baseLineCapacity > 1 ? 's' : ''
    }`;
    const baseLineIntervalTimeTransform = `${baseLineIntervalTime.toString()} minuto${
      baseLineIntervalTime > 1 && 's'
    }`;
    this.intervalTimeForm.patchValue({
      ...expInvertalTime,
      isEditionState: isEditionState,
      enabled: isEditionState ? enabled : true,
      baseLineCapacity: baseLineCapacityTransform,
      baseLineIntervalTime: baseLineIntervalTimeTransform,
    });
  }

  getIntervalTimeFormRequest() {
    const { baseLineCapacity, baseLineIntervalTime, ...intervalTimeFormRest } =
      this.intervalTimeForm.value;

    return intervalTimeFormRest;
  }

  isNotValidatedConsumptionMaxControl() {
    return (
      this.consumptionMaxControl.invalid && this.consumptionMaxControl.touched
    );
  }

  isNotValidatedCapacityAddedCControl() {
    return (
      this.capacityAddedControl.invalid && this.capacityAddedControl.touched
    );
  }

  isNotValidatedIntervalTimeControl() {
    return this.intervalTimeControl.invalid && this.intervalTimeControl.touched;
  }

  isNotValidatedLapsControl() {
    return this.lapsControl.invalid && this.lapsControl.touched;
  }

  stateControlValueChange() {
    this.stateControl.valueChanges.subscribe((value) => {
      if (value) {
        this.addValidators();
      } else {
        this.clearValidators();
      }
      this.consumptionMaxControl.markAsTouched();
      this.capacityAddedControl.markAsTouched();
      this.intervalTimeControl.markAsTouched();
      this.lapsControl.markAsTouched();
    });
  }

  clearValidators() {
    // this.consumptionMaxControl.clearValidators();
    // this.capacityAddedControl.clearValidators();
    // this.intervalTimeControl.clearValidators();
    // this.lapsControl.clearValidators();
    this.intervalTimeForm.get('addCapacity').clearValidators();
    this.intervalTimeForm.get('addIntervalTime').clearValidators();
    this.intervalTimeForm.get('laps').clearValidators();
    this.intervalTimeForm.get('consumptionMax').clearValidators();

    this.intervalTimeForm.get('addCapacity').updateValueAndValidity();
    this.intervalTimeForm.get('addIntervalTime').updateValueAndValidity();
    this.intervalTimeForm.get('laps').updateValueAndValidity();
    this.intervalTimeForm.get('consumptionMax').updateValueAndValidity();
    this.intervalTimeForm.updateValueAndValidity();
  }

  addValidators() {
    this.intervalTimeForm
      .get('addCapacity')
      .setValidators([Validators.required, this.valueNotZeroValidator()]);
    this.intervalTimeForm
      .get('addIntervalTime')
      .setValidators([Validators.required, this.valueNotZeroValidator()]);
    this.intervalTimeForm
      .get('laps')
      .setValidators([Validators.required, this.valueNotZeroValidator()]);
    this.intervalTimeForm
      .get('consumptionMax')
      .setValidators([Validators.required, this.valueNotZeroValidator()]);
    this.intervalTimeForm.get('addCapacity').updateValueAndValidity();
    this.intervalTimeForm.get('addIntervalTime').updateValueAndValidity();
    this.intervalTimeForm.get('laps').updateValueAndValidity();
    this.intervalTimeForm.get('consumptionMax').updateValueAndValidity();
    this.intervalTimeForm.updateValueAndValidity();
  }

  valueNotZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === '0' || Number(control.value) === 0) {
        return { isZero: true };
      }
      return null;
    };
  }

  messageError(control: AbstractControl, controlName: EIntervalControlName) {
    
    if (control.errors?.required) {
      return CMessageError.required;
    }

    if (control.errors?.isZero) {
      return CMessageErrorIsZero[controlName];
    }

    if (control.errors?.max) {
      return CMessageErrorMaxValue[controlName];
    }
  }
}
