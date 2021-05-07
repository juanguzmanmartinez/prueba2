import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';
import {
    CheckboxGroupControl,
    CheckboxGroupControlName
} from '../../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';
import { GenericValidator } from '@validators/generic-validator';

export class StoreServiceTypeControlName {
    static state = 'state';
    static startHour = 'startHour';
    static endHour = 'endHour';
    static paymentMethod = 'segmentGap';
    static intervalTime = 'intervalTime';
    static splitSegment = 'splitSegment';

    static paymentMethodName = CheckboxGroupControlName.value;
    static paymentMethodChecked = CheckboxGroupControlName.checked;
}

@Injectable()
export class OpStoresEditionServiceTypeDetailFormCardFormService implements OnDestroy {

    private readonly formGroup: FormGroup;

    private _stateControl: FormControl = new FormControl(null);
    private _startHourControl: FormControl = new FormControl(null);
    private _endHourControl: FormControl = new FormControl(null);
    private _paymentMethodArray: FormArray = new FormArray([], [GenericValidator.validateAtLeastOneCheckboxChecked()]);
    private _intervalTimeControl: FormControl = new FormControl('');
    private _splitSegmentControl: FormControl = new FormControl('');

    private _controlNameList = StoreServiceTypeControlName;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            [this._controlNameList.state]: this._stateControl,
            [this._controlNameList.startHour]: this._startHourControl,
            [this._controlNameList.endHour]: this._endHourControl,
            [this._controlNameList.paymentMethod]: this._paymentMethodArray,
            [this._controlNameList.intervalTime]: this._intervalTimeControl,
            [this._controlNameList.splitSegment]: this._splitSegmentControl,
        });
    }


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

    get paymentMethodArray(): FormArray {
        return this.form$.get(this._controlNameList.paymentMethod) as FormArray;
    }

    get intervalTimeControl(): FormControl {
        return this.form$.get(this._controlNameList.intervalTime) as FormControl;
    }

    get splitSegmentControl(): FormControl {
        return this.form$.get(this._controlNameList.splitSegment) as FormControl;
    }

    createPaymentMethodGroup(paymentMethodName: EPaymentMethod): CheckboxGroupControl {
        return new CheckboxGroupControl(paymentMethodName);
    }

    resetForm(): void {
        this.stateControl.patchValue(null);
        this.startHourControl.patchValue(null);
        this.endHourControl.patchValue(null);
        this.paymentMethodArray.patchValue([]);
        this.intervalTimeControl.patchValue(null);
        this.splitSegmentControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
