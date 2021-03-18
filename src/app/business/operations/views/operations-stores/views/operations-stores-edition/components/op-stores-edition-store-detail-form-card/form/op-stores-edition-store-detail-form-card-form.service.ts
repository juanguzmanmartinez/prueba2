import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ECompany } from '@models/company/company.model';

export class StoreDetailControlName {
    static state = 'state';
    static company = 'company';
    static startHour = 'startHour';
    static endHour = 'endHour';
    static latitude = 'latitude';
    static longitude = 'longitude';

    static companyName = 'companyName';
    static companyChecked = 'companyChecked';
}

@Injectable()
export class OpStoresEditionStoreDetailFormCardFormService implements OnDestroy {

    private readonly formGroup: FormGroup;

    private _stateControl: FormControl = new FormControl(null);
    private _startHourControl: FormControl = new FormControl(null);
    private _endHourControl: FormControl = new FormControl(null);
    private _companyArray: FormArray = new FormArray([]);
    private _latitudeControl: FormControl = new FormControl(null);
    private _longitudeControl: FormControl = new FormControl(null);

    private _controlNameList = StoreDetailControlName;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            [this._controlNameList.state]: this._stateControl,
            [this._controlNameList.startHour]: this._startHourControl,
            [this._controlNameList.endHour]: this._endHourControl,
            [this._controlNameList.company]: this._companyArray,
            [this._controlNameList.latitude]: this._latitudeControl,
            [this._controlNameList.longitude]: this._longitudeControl,
        });
    }

    get form$() {
        return this.formGroup;
    }

    get stateControl() {
        return this.form$.get(this._controlNameList.state) as FormControl;
    }

    get startHourControl(): FormControl {
        return this.form$.get(this._controlNameList.startHour) as FormControl;
    }

    get endHourControl() {
        return this.form$.get(this._controlNameList.endHour) as FormControl;
    }

    get companyArray() {
        return this.form$.get(this._controlNameList.company) as FormArray;
    }

    get latitudeControl() {
        return this.form$.get(this._controlNameList.latitude) as FormControl;
    }

    get longitudeControl() {
        return this.form$.get(this._controlNameList.longitude) as FormControl;
    }

    createCompanyChildGroup(companyName: ECompany) {
        return new FormGroup({
            [this._controlNameList.companyName]: new FormControl(companyName),
            [this._controlNameList.companyChecked]: new FormControl(false)
        });
    }

    getCompanyChildCheckedControl(companyChildGroup: FormGroup) {
        return companyChildGroup?.get(this._controlNameList.companyChecked);
    }

    resetForm() {
        this.stateControl.patchValue(null);
        this.startHourControl.patchValue(null);
        this.endHourControl.patchValue(null);
        this.companyArray.patchValue([]);
        this.latitudeControl.patchValue(null);
        this.longitudeControl.patchValue(null);
    }

    ngOnDestroy() {
        this.resetForm();
    }
}

