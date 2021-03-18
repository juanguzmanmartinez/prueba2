import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStoreDetailUpdate } from '@interfaces/stores/stores.interface';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { OpStoresEditionStoreDetailFormCardFormService, StoreDetailControlName } from './form/op-stores-edition-store-detail-form-card-form.service';
import { FormGroup } from '@angular/forms';
import { CStateName, CStateValue } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

@Component({
    selector: 'app-op-stores-edition-store-detail-form-card',
    templateUrl: './op-stores-edition-store-detail-form-card.component.html',
    styleUrls: ['./op-stores-edition-store-detail-form-card.component.sass'],
    providers: [OpStoresEditionStoreDetailFormCardFormService]
})
export class OpStoresEditionStoreDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateName = CStateName;
    public stateValue = CStateValue;
    public companyName = CCompanyName;

    public controlNameList = StoreDetailControlName;
    public companyList: ECompany[] = [];


    @Input() storeDetail: StoreDetail;

    @Input('companyList')
    set _companyList(companyList: ECompany[]) {
        this.companyList = companyList;
        this.updateCompanyControl();
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IStoreDetailUpdate>();

    constructor(
        public _editionStoreDetailForm: OpStoresEditionStoreDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        this._editionStoreDetailForm.stateControl.patchValue(this.stateValue[this.storeDetail.state]);

        this.updateStoreDetailForm();
        this.updateStateControl();
    }

    updateStoreDetailForm() {
        this._editionStoreDetailForm.startHourControl.patchValue(this.storeDetail.startHour);
        this._editionStoreDetailForm.endHourControl.patchValue(this.storeDetail.endHour);
        this._editionStoreDetailForm.latitudeControl.setValue(this.storeDetail.latitude);
        this._editionStoreDetailForm.longitudeControl.patchValue(this.storeDetail.longitude);
        this._editionStoreDetailForm.companyArray.controls.forEach((companyGroup: FormGroup) => {
            const checkedCompany = this.storeDetail.companyList
                .find((company: ECompany) => companyGroup.value[this.controlNameList.companyName] === company);
            this._editionStoreDetailForm.getCompanyChildCheckedControl(companyGroup)?.patchValue(!!checkedCompany);
        });
        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this._editionStoreDetailForm.stateControl.value) {
            this._editionStoreDetailForm.startHourControl.enable();
            this._editionStoreDetailForm.endHourControl.enable();
            this._editionStoreDetailForm.companyArray.enable();
            this._editionStoreDetailForm.latitudeControl.enable();
            this._editionStoreDetailForm.longitudeControl.enable();
        } else {
            this._editionStoreDetailForm.startHourControl.disable();
            this._editionStoreDetailForm.endHourControl.disable();
            this._editionStoreDetailForm.companyArray.disable();
            this._editionStoreDetailForm.latitudeControl.disable();
            this._editionStoreDetailForm.longitudeControl.disable();
        }
    }

    updateStateControl() {
        const subscription = this._editionStoreDetailForm.stateControl.valueChanges
            .subscribe(() => {
                if (this._editionStoreDetailForm.stateControl.value === false) {
                    this.updateStoreDetailForm();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updateCompanyControl() {
        this._editionStoreDetailForm.companyArray.clear();
        this.companyList.forEach((company: ECompany) => {
            const companyGroup = this._editionStoreDetailForm.createCompanyChildGroup(company);
            this._editionStoreDetailForm.companyArray.push(companyGroup);
        });
        this.updateStoreDetailForm();
    }

    updateStartHourControl(time: number) {
        this._editionStoreDetailForm.startHourControl.patchValue(time);
    }

    updateEndHourControl(time: number) {
        this._editionStoreDetailForm.endHourControl.patchValue(time);
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const storeDetailUpdate = {} as IStoreDetailUpdate;
        storeDetailUpdate.enabled = this._editionStoreDetailForm.stateControl.value;
        if (storeDetailUpdate.enabled) {
            const startHour =  this._editionStoreDetailForm.startHourControl.value;
            const endHour =  this._editionStoreDetailForm.endHourControl.value;
            storeDetailUpdate.startHour = DatesHelper.Date(startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.endHour = DatesHelper.Date(endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.latitude = this._editionStoreDetailForm.latitudeControl.value;
            storeDetailUpdate.longitude = this._editionStoreDetailForm.longitudeControl.value;
            const companyList = this._editionStoreDetailForm.companyArray.value as { name: ECompany, checked: boolean }[];
            storeDetailUpdate.companyList = companyList.filter((company) => company.checked)
                .map((company) => company.name);
        } else {
            storeDetailUpdate.startHour = DatesHelper.Date(this.storeDetail.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.endHour = DatesHelper.Date(this.storeDetail.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.companyList = this.storeDetail.companyList;
            storeDetailUpdate.latitude = this.storeDetail.latitude;
            storeDetailUpdate.longitude = this.storeDetail.longitude;
        }
        this.saveEdition.emit(storeDetailUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
