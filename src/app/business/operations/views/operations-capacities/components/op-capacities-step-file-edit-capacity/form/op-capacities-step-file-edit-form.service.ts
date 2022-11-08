import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenericValidator } from '@validators/generic-validator';

@Injectable({
  providedIn: 'root',
})
export class OpCapacitiesStepFileEditFormService implements OnDestroy {
  private readonly capacityTableForm: FormGroup;

  private _capacityRangeControl: FormControl = new FormControl();
  private _capacityForSelectionControl: FormControl = new FormControl(null, []);
  private _ampmServiceList: FormArray = new FormArray([]);
  private _scheduledServiceList: FormArray = new FormArray([]);
  private _retServiceList: FormArray = new FormArray([]);
  private _expressServiceList: FormArray = new FormArray([]);

  //get form
  get capacityTableForm$(): FormGroup {
    return this.capacityTableForm;
  }

  get capacityRange(): FormControl {
    return this.capacityTableForm$.get('capacityRange') as FormControl;
  }

  get capacityForSelection(): FormControl {
    return this.capacityTableForm$.get('capacityForSelection') as FormControl;
  }

  get capacitySegmentList(): FormArray {
    return this.capacityTableForm$.get('capacitySegmentList') as FormArray;
  }

  get programadoList(): FormArray {
    return this.capacityTableForm$.get('programadoList') as FormArray;
  }

  get capacitySegmentListGroup(): FormGroup {
    return new FormGroup({
      segmentCapacity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        GenericValidator.validateNumberMaxLength(5),
      ]),
      segmentHour: new FormControl(''),
      segmentValue: new FormControl(''),
    });
  }

  constructor(private _formBuilder: FormBuilder) {
    this.capacityTableForm = this._formBuilder.group({
      capacityRange: this._capacityRangeControl,
      capacityForSelection: this._capacityForSelectionControl,
      ampmList: this._ampmServiceList,
      scheduledList: this._scheduledServiceList,
      retList: this._retServiceList,
      expressList: this._expressServiceList,
    });
  }

  //get ampm controls

  get ampmList(): FormArray {
    return this.capacityTableForm$.get('ampmList') as FormArray;
  }

  get ampmListGroup(): FormGroup {
    return new FormGroup({
      capacity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        GenericValidator.validateNumberMaxLength(5),
      ]),
      id: new FormControl(),
      segment: new FormControl(),
    });
  }

  ampmCapacityByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('capacity') as FormControl;
  }
  ampmIdByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('id') as FormControl;
  }
  ampmSegmentByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segment') as FormControl;
  }

  //get scheduled controls

  get scheduledList(): FormArray {
    return this.capacityTableForm$.get('scheduledList') as FormArray;
  }

  get scheduledListGroup(): FormGroup {
    return new FormGroup({
      capacity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        GenericValidator.validateNumberMaxLength(5),
      ]),
      id: new FormControl(),
      segment: new FormControl(),
    });
  }

  scheduledCapacityByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('capacity') as FormControl;
  }
  scheduledIdByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('id') as FormControl;
  }
  scheduledSegmentByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segment') as FormControl;
  }

  //get ret controls

  get retList(): FormArray {
    return this.capacityTableForm$.get('retList') as FormArray;
  }

  get retListGroup(): FormGroup {
    return new FormGroup({
      capacity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        GenericValidator.validateNumberMaxLength(5),
      ]),
      id: new FormControl(),
      segment: new FormControl(),
    });
  }

  retCapacityByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('capacity') as FormControl;
  }
  retIdByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('id') as FormControl;
  }
  retSegmentByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segment') as FormControl;
  }

  //getexpress

  get expressList(): FormArray {
    return this.capacityTableForm$.get('expressList') as FormArray;
  }

  get expressListGroup(): FormGroup {
    return new FormGroup({
      capacity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        GenericValidator.validateNumberMaxLength(5),
      ]),
      id: new FormControl(),
      segment: new FormControl(),
    });
  }

  expressCapacityByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('capacity') as FormControl;
  }
  expressIdByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('id') as FormControl;
  }
  expressSegmentByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segment') as FormControl;
  }

  ////////////////////////////////////

  segmentCapacityByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segmentCapacity') as FormControl;
  }

  segmentHourByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segmentHour') as FormControl;
  }

  segmentValueByGroup(formGroup: FormGroup): AbstractControl {
    return formGroup.get('segmentValue') as FormControl;
  }

  resetForm(): void {
    this.capacityRange.patchValue(null);
    this.capacityForSelection.patchValue(null);
    this.capacitySegmentList.patchValue([]);
    this.ampmList.patchValue([]);
    this.scheduledList.patchValue([]);
    this.retList.patchValue([]);
    this.expressList.patchValue([]);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
