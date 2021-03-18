import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CapacityRangeControl } from '../../../controls/capacity-range.control';
import { CapacityQuantityControl } from '../../op-capacities-step-capacity-table/controls/capacity-quantity.control';
import { CapacityQuantityForSelectionControl } from '../../op-capacities-step-capacity-table/controls/capacity-quantity-for-selection.control';

@Injectable()
export class OpCapacitiesStepCapacityTableFormService implements OnDestroy {
    private readonly capacityTableForm: FormGroup;

    private _capacityRangeControl: CapacityRangeControl = new CapacityRangeControl();
    private _capacityForSelectionControl: FormControl = new CapacityQuantityForSelectionControl();
    private _capacitySegmentListArray: FormArray = new FormArray([]);

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.capacityTableForm = this._formBuilder.group({
            capacityRange: this._capacityRangeControl,
            capacityForSelection: this._capacityForSelectionControl,
            capacitySegmentList: this._capacitySegmentListArray
        });
    }

    get capacityTableForm$() {
        return this.capacityTableForm;
    }

    get capacityRange(): FormControl {
        return this.capacityTableForm$.get('capacityRange') as CapacityRangeControl;
    }

    get capacityForSelection(): FormControl {
        return this.capacityTableForm$.get('capacityForSelection') as FormControl;
    }

    get capacitySegmentList(): FormArray {
        return this.capacityTableForm$.get('capacitySegmentList') as FormArray;
    }


    get capacitySegmentListGroup(): FormGroup {
        return new FormGroup({
            segmentCapacity: new CapacityQuantityControl(),
            segmentHour: new FormControl(''),
            segmentValue: new FormControl(''),
        });
    }

    segmentCapacityByGroup(formGroup: FormGroup) {
        return formGroup.get('segmentCapacity');
    }

    segmentHourByGroup(formGroup: FormGroup) {
        return formGroup.get('segmentHour');
    }

    segmentValueByGroup(formGroup: FormGroup) {
        return formGroup.get('segmentValue');
    }


    resetForm() {
        this.capacityRange.patchValue(null);
        this.capacityForSelection.patchValue(null);
        this.capacitySegmentList.patchValue([]);
    }

    ngOnDestroy() {
        this.resetForm();
    }

}
