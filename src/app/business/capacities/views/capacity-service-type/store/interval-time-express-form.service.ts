import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ExpressIntervalTime } from '../models/express-interval-time.model';

@Injectable()
export class IntervalTimeExpressFormService {
  stateControl = new FormControl(false, [Validators.required]);
  consumptionMaxControl = new FormControl(0, [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  capacityAddedControl = new FormControl(0, [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  intervalTimeControl = new FormControl(0, [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  lapsControl = new FormControl(0, [
    Validators.required,
    this.valueNotZeroValidator(),
  ]);
  baseLineCapacityControl = new FormControl({ value: '', disabled: true });
  baseLineIntervalTimeControl = new FormControl({ value: '', disabled: true });

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
    });
  }

  updateInvertalTimeForm(expInvertalTime: ExpressIntervalTime) {
    const { baseLineCapacity, baseLineIntervalTime } = expInvertalTime;
    const baseLineCapacityTransform = `${baseLineCapacity.toString()} transportista${
      baseLineCapacity > 1 ? 's' : ''
    }`;
    const baseLineIntervalTimeTransform = `${baseLineIntervalTime.toString()} minuto${
      baseLineIntervalTime > 1 && 's'
    }`;
    this.intervalTimeForm.patchValue({
      ...expInvertalTime,
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

  valueNotZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && Number(control.value) === 0) {
        return { isZero: true };
      }
      return null;
    };
  }

  messageError(control: AbstractControl) {
    if (control.errors?.required) {
      return 'El campo se encuentra vacío';
    }

    if (control.errors?.isZero) {
      return 'El valor debe ser mayor a 0';
    }
  }
}
