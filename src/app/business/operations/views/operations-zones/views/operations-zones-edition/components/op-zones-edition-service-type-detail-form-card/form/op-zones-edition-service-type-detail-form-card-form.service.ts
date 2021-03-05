import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class ZoneServiceTypeControlName {
    static state = 'state';
    static startHour = 'startHour';
    static endHour = 'endHour';
    static segmentGap = 'segmentGap';
    static intervalTime = 'intervalTime';
    static splitSegment = 'splitSegment';
}

@Injectable()
export class OpZonesEditionServiceTypeDetailFormCardFormService implements OnDestroy {

    private readonly formGroup: FormGroup;

    private _stateControl: FormControl = new FormControl(null);
    private _startHourControl: FormControl = new FormControl(null);
    private _endHourControl: FormControl = new FormControl(null);
    private _segmentGapControl: FormControl = new FormControl('');
    private _intervalTimeControl: FormControl = new FormControl('');
    private _splitSegmentControl: FormControl = new FormControl('');

    private _controlNameList = ZoneServiceTypeControlName;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            [this._controlNameList.state]: this._stateControl,
            [this._controlNameList.startHour]: this._startHourControl,
            [this._controlNameList.endHour]: this._endHourControl,
            [this._controlNameList.segmentGap]: this._segmentGapControl,
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

    get segmentGapControl(): FormControl {
        return this.form$.get(this._controlNameList.segmentGap) as FormControl;
    }

    get intervalTimeControl(): FormControl {
        return this.form$.get(this._controlNameList.intervalTime) as FormControl;
    }

    get splitSegmentControl(): FormControl {
        return this.form$.get(this._controlNameList.splitSegment) as FormControl;
    }

    resetForm(): void {
        this.stateControl.patchValue(null);
        this.startHourControl.patchValue(null);
        this.endHourControl.patchValue(null);
        this.segmentGapControl.patchValue(null);
        this.intervalTimeControl.patchValue(null);
        this.splitSegmentControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
