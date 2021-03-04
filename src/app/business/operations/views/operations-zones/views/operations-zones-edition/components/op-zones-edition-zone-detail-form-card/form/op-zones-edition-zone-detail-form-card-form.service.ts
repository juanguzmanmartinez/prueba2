import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EChannel } from '@models/channel/channel.model';

export class ZoneDetailControlName {
    static state = 'state';
    static assignedStore = 'assignedStore';
    static assignedStoreBackup = 'assignedStoreBackup';
    static company = 'company';
    static channel = 'channel';
    static label = 'label';

    static channelName = 'name';
    static channelChecked = 'checked';
}

@Injectable()
export class OpZonesEditionZoneDetailFormCardFormService implements OnDestroy {

    private readonly editionZoneDetailForm: FormGroup;

    private _stateControl: FormControl = new FormControl(null);
    private _assignedStoreControl: FormControl = new FormControl(null);
    private _assignedStoreBackupControl: FormControl = new FormControl(null);
    private _companyControl: FormControl = new FormControl(null);
    private _channelArray: FormArray = new FormArray([]);
    private _labelControl: FormControl = new FormControl(null);

    private _controlNameList = ZoneDetailControlName;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.editionZoneDetailForm = this._formBuilder.group({
            [this._controlNameList.state]: this._stateControl,
            [this._controlNameList.assignedStore]: this._assignedStoreControl,
            [this._controlNameList.assignedStoreBackup]: this._assignedStoreBackupControl,
            [this._controlNameList.company]: this._companyControl,
            [this._controlNameList.channel]: this._channelArray,
            [this._controlNameList.label]: this._labelControl,
        });
    }

    get form$() {
        return this.editionZoneDetailForm;
    }

    get stateControl() {
        return this.form$.get(this._controlNameList.state);
    }

    get assignedStoreControl(): FormControl {
        return this.form$.get(this._controlNameList.assignedStore) as FormControl;
    }

    get assignedStoreBackupControl() {
        return this.form$.get(this._controlNameList.assignedStoreBackup);
    }

    get companyControl() {
        return this.form$.get(this._controlNameList.company);
    }

    get channelArray() {
        return this.form$.get(this._controlNameList.channel) as FormArray;
    }

    get labelControl() {
        return this.form$.get(this._controlNameList.label);
    }

    createChannelChildGroup(channelName: EChannel) {
        return new FormGroup({
            [this._controlNameList.channelName]: new FormControl(channelName),
            [this._controlNameList.channelChecked]: new FormControl(false)
        });
    }

    getChannelChildCheckedControl(channelChildGroup: FormGroup) {
        return channelChildGroup?.get(this._controlNameList.channelChecked);
    }

    resetForm() {
        this.stateControl.patchValue(null);
        this.assignedStoreControl.patchValue(null);
        this.assignedStoreBackupControl.patchValue(null);
        this.companyControl.patchValue(null);
        this.channelArray.patchValue([]);
        this.labelControl.patchValue(null);
    }

    ngOnDestroy() {
        this.resetForm();
    }
}

