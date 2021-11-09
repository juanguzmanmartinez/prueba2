import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDrugstoreDetailUpdate } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { DrugstoreDetailControlName, OpDrugstoresEditionDrugstoreDetailFormCardFormService } from './form/op-drugstores-edition-drugstore-detail-form-card-form.service';
import { CStateName, CStateValue, EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CheckboxGroupControl } from '../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';

@Component({
    selector: 'app-op-drugstores-edition-drugstore-detail-form-card',
    templateUrl: './op-drugstores-edition-drugstore-detail-form-card.component.html',
    styleUrls: ['./op-drugstores-edition-drugstore-detail-form-card.component.sass'],
    providers: [OpDrugstoresEditionDrugstoreDetailFormCardFormService]
})
export class OpDrugstoresEditionDrugstoreDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateName = CStateName;
    public stateValue = CStateValue;
    public companyName = CCompanyName;

    public controlNameList = DrugstoreDetailControlName;
    public companyList: ECompany[] = [];


    @Input() drugstoreDetail: DrugstoreDetail;

    @Input('companyList')
    set _companyList(companyList: ECompany[]) {
        this.companyList = companyList;
        this.updateCompanyControl();
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter<IDrugstoreDetailUpdate>();

    constructor(
        private _editionDrugstoreDetailForm: OpDrugstoresEditionDrugstoreDetailFormCardFormService
    ) {
    }

    get form() {
        return this._editionDrugstoreDetailForm;
    }

    ngOnInit(): void {
        this.form.stateControl.patchValue(this.stateValue[this.drugstoreDetail.state]);

        this.updateDrugstoreDetailForm();
        this.updateStateControl();
    }

    updateDrugstoreDetailForm() {
        this.form.startHourControl.patchValue(this.drugstoreDetail.startHour);
        this.form.endHourControl.patchValue(this.drugstoreDetail.endHour);
        this.form.latitudeControl.setValue(this.drugstoreDetail.latitude);
        this.form.longitudeControl.patchValue(this.drugstoreDetail.longitude);
        this.form.companyArray.controls.forEach((companyGroup: CheckboxGroupControl) => {
            const checkedCompany = this.drugstoreDetail.companyList
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
                    this.updateDrugstoreDetailForm();
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
        this.updateDrugstoreDetailForm();
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
        const iDrugstoreDetailUpdate = {} as IDrugstoreDetailUpdate;
        iDrugstoreDetailUpdate.enabled = this.form.stateControl.value;
        if (iDrugstoreDetailUpdate.enabled) {
            const startHour = this.form.startHourControl.value;
            const endHour = this.form.endHourControl.value;
            iDrugstoreDetailUpdate.startHour = DatesHelper.Date(startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            iDrugstoreDetailUpdate.endHour = DatesHelper.Date(endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            iDrugstoreDetailUpdate.latitude = this.form.latitudeControl.value;
            iDrugstoreDetailUpdate.longitude = this.form.longitudeControl.value;
            iDrugstoreDetailUpdate.companyList = this.form.companyArray.value
                .filter((company) => company[this.controlNameList.companyChecked])
                .map((company) => company[this.controlNameList.companyName]);
        } else {
            iDrugstoreDetailUpdate.startHour = DatesHelper.Date(this.drugstoreDetail.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            iDrugstoreDetailUpdate.endHour = DatesHelper.Date(this.drugstoreDetail.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond);
            iDrugstoreDetailUpdate.companyList = this.drugstoreDetail.companyList;
            iDrugstoreDetailUpdate.latitude = this.drugstoreDetail.latitude;
            iDrugstoreDetailUpdate.longitude = this.drugstoreDetail.longitude;
        }
        this.saveEdition.emit(iDrugstoreDetailUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
