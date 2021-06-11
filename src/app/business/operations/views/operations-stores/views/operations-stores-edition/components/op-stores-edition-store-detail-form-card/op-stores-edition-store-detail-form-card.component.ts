import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStoreDetailUpdate } from '@interfaces/stores/stores.interface';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { OpStoresEditionStoreDetailFormCardFormService, StoreDetailControlName } from './form/op-stores-edition-store-detail-form-card-form.service';
import { CStateName, CStateValue, EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CheckboxGroupControl } from '../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';

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
        private _editionStoreDetailForm: OpStoresEditionStoreDetailFormCardFormService
    ) {
    }

    ngOnInit(): void {
        this.form.stateControl.patchValue(this.stateValue[this.storeDetail.state]);

        this.updateStoreDetailForm();
        this.updateStateControl();
    }

    get form() {
        return this._editionStoreDetailForm;
    }

    updateStoreDetailForm() {
        this.form.startHourControl.patchValue(this.storeDetail.startHour);
        this.form.endHourControl.patchValue(this.storeDetail.endHour);
        this.form.latitudeControl.setValue(this.storeDetail.latitude);
        this.form.longitudeControl.patchValue(this.storeDetail.longitude);
        this.form.companyArray.controls.forEach((companyGroup: CheckboxGroupControl) => {
            const checkedCompany = this.storeDetail.companyList
                .find((company: ECompany) => companyGroup.valueControl?.value === company);
            companyGroup.checkedControl?.patchValue(!!checkedCompany);
        });
        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this.form.stateControl.value) {
            this.form.startHourControl.enable();
            this.form.endHourControl.enable();
            this.form.companyArray.enable();
            this.form.latitudeControl.enable();
            this.form.longitudeControl.enable();
        } else {
            this.form.startHourControl.disable();
            this.form.endHourControl.disable();
            this.form.companyArray.disable();
            this.form.latitudeControl.disable();
            this.form.longitudeControl.disable();
        }
    }

    updateStateControl() {
        const subscription = this.form.stateControl.valueChanges
            .subscribe(() => {
                if (this.form.stateControl.value === false) {
                    this.updateStoreDetailForm();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updateCompanyControl() {
        this.form.companyArray.clear();
        this.companyList.forEach((company: ECompany) => {
            const companyGroup = this.form.createCompanyGroup(company);
            this.form.companyArray.push(companyGroup);
        });
        this.updateStoreDetailForm();
    }

    updateStartHourControl(time: number) {
        this.form.startHourControl.patchValue(time);
    }

    updateEndHourControl(time: number) {
        this.form.endHourControl.patchValue(time);
    }


    get stateControlName() {
        return this.stateName[this.form.stateControl.value ? EState.active : EState.inactive]();
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const storeDetailUpdate = {} as IStoreDetailUpdate;
        storeDetailUpdate.enabled = this.form.stateControl.value;
        if (storeDetailUpdate.enabled) {
            const startHour = this.form.startHourControl.value;
            const endHour = this.form.endHourControl.value;
            storeDetailUpdate.startHour = DatesHelper.Date(startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.endHour = DatesHelper.Date(endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            storeDetailUpdate.latitude = this.form.latitudeControl.value;
            storeDetailUpdate.longitude = this.form.longitudeControl.value;
            storeDetailUpdate.companyList = this.form.companyArray.value
                .filter((company) => company[this.controlNameList.companyChecked])
                .map((company) => company[this.controlNameList.companyName]);
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
