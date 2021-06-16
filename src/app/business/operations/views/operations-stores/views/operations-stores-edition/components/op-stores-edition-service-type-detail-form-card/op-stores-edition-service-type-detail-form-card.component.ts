import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreServiceType } from '../../../../models/operations-stores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { IDrugstoreServiceTypeUpdate } from '@interfaces/drugstores/drugstores.interface';
import { OpStoresEditionServiceTypeDetailFormCardFormService, StoreServiceTypeControlName } from './form/op-stores-edition-service-type-detail-form-card-form-service';
import { CPaymentMethodName, EPaymentMethod } from '@models/payment-method/payment-method.model';
import { OpStoresEditionServiceTypeDetailDialogService } from '../op-stores-edition-service-type-detail-dialog/op-stores-edition-service-type-detail-dialog.service';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { minuteFormat } from '@helpers/date-name.helper';
import { CheckboxGroupControl } from '../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';

@Component({
    selector: 'app-op-stores-edition-service-type-detail-form-card',
    templateUrl: './op-stores-edition-service-type-detail-form-card.component.html',
    styleUrls: ['./op-stores-edition-service-type-detail-form-card.component.sass'],
    providers: [
        OpStoresEditionServiceTypeDetailFormCardFormService,
        OpStoresEditionServiceTypeDetailDialogService
    ]
})
export class OpStoresEditionServiceTypeDetailFormCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public stateValue = CStateValue;
    public serviceTypeName = CDeliveryServiceTypeName;
    public paymentMethodName = CPaymentMethodName;
    public controlNameList = StoreServiceTypeControlName;
    public configurationPath = ROUTER_PATH.operationSettings;
    public serviceTypeCode = EDeliveryServiceType;

    public splitSegmentList: string[] = [];
    public paymentMethodList: EPaymentMethod[] = [];

    @Input() storeDetail: StoreDetail;
    @Input() storeServiceType: StoreServiceType;

    @Input('paymentMethodList')
    set _paymentMethodList(paymentMethodList: EPaymentMethod[]) {
        this.paymentMethodList = paymentMethodList;
        this.updatePaymentMethodListControl();
    }

    @Output() cancelEdition = new EventEmitter();
    @Output() saveEdition = new EventEmitter();

    constructor(
        public _serviceTypeDetailForm: OpStoresEditionServiceTypeDetailFormCardFormService,
        private _serviceTypeDetailDialog: OpStoresEditionServiceTypeDetailDialogService
    ) {
    }

    ngOnInit(): void {
        this._serviceTypeDetailForm.stateControl.patchValue(this.stateValue[this.storeServiceType.state]);
        this.updateFormValues();
        this.updateStateControl();
        this.checkEditionByStateControl();
    }

    get form$() {
        return this._serviceTypeDetailForm.form$;
    }

    updateFormValues() {
        this._serviceTypeDetailForm.startHourControl.patchValue(this.storeServiceType.startHour);
        this._serviceTypeDetailForm.endHourControl.patchValue(this.storeServiceType.endHour);
        this._serviceTypeDetailForm.intervalTimeControl.patchValue(minuteFormat(this.storeServiceType.intervalTime));
        this._serviceTypeDetailForm.intervalTimeControl.disable();
        this._serviceTypeDetailForm.paymentMethodArray.controls.forEach((paymentMethodGroup: CheckboxGroupControl) => {
            const checkedPaymentMethod = this.storeServiceType.paymentMethodList
                .find((paymentMethod: EPaymentMethod) => paymentMethodGroup.valueControl?.value === paymentMethod);
            paymentMethodGroup.checkedControl?.patchValue(!!checkedPaymentMethod);
        });

        this.setSplitSegment();
        this.checkEditionByStateControl();
    }

    checkEditionByStateControl() {
        if (this._serviceTypeDetailForm.stateControl.value) {
            this._serviceTypeDetailForm.startHourControl.enable();
            this._serviceTypeDetailForm.endHourControl.enable();
            this._serviceTypeDetailForm.paymentMethodArray.enable();
        } else {
            this._serviceTypeDetailForm.startHourControl.disable();
            this._serviceTypeDetailForm.endHourControl.disable();
            this._serviceTypeDetailForm.paymentMethodArray.disable();
        }
    }

    updateStateControl() {
        const subscription = this._serviceTypeDetailForm.stateControl.valueChanges
            .subscribe(() => {
                if (this._serviceTypeDetailForm.stateControl.value === false) {
                    this.updateFormValues();
                }
                this.checkEditionByStateControl();
            });
        this.subscriptions.push(subscription);
    }

    updatePaymentMethodListControl() {
        this._serviceTypeDetailForm.paymentMethodArray.clear();
        this.paymentMethodList.forEach((paymentMethod: EPaymentMethod) => {
            const paymentMethodGroup = this._serviceTypeDetailForm.createPaymentMethodGroup(paymentMethod);
            this._serviceTypeDetailForm.paymentMethodArray.push(paymentMethodGroup);
        });
        if (this.storeServiceType) {
            this.updateFormValues();
        }
    }

    updateStartHourControl(time: number) {
        this._serviceTypeDetailForm.startHourControl.patchValue(time);
        this.setSplitSegment();
    }

    updateEndHourControl(time: number) {
        this._serviceTypeDetailForm.endHourControl.patchValue(time);
        this.setSplitSegment();
    }

    setSplitSegment() {
        const startHour = DatesHelper.Date(this._serviceTypeDetailForm.startHourControl.value, DATES_FORMAT.millisecond);
        const endHour = DatesHelper.Date(this._serviceTypeDetailForm.endHourControl.value, DATES_FORMAT.millisecond);
        const startHourClone = startHour.clone();

        const hourList = [];
        while (startHourClone.isBefore(endHour)) {
            hourList.push(startHourClone.format(DATES_FORMAT.hourMinuteDateTime));
            startHourClone.add(this.storeServiceType.intervalTime, 'minutes');
        }
        hourList.push(endHour.format(DATES_FORMAT.hourMinuteDateTime));

        this.splitSegmentList = [];
        hourList.reduce((previousValue, currentValue) => {
            this.splitSegmentList.push(`${previousValue} - ${currentValue}`);
            return currentValue;
        });
        this._serviceTypeDetailForm.splitSegmentControl.patchValue(this.splitSegmentList.length);
        this._serviceTypeDetailForm.splitSegmentControl.disable();
    }

    openServiceTypeDetailDialog() {
        this._serviceTypeDetailDialog.open(this.splitSegmentList);
    }

    get serviceTypePath() {
        return ROUTER_PATH.opStores_StoreServiceTypeEdition();
    }

    cancelEditionEvent() {
        this.cancelEdition.emit();
    }

    saveEditionEvent() {
        const storeServiceTypeUpdate = {} as IDrugstoreServiceTypeUpdate;
        storeServiceTypeUpdate.enabled = this._serviceTypeDetailForm.stateControl.value;
        if (storeServiceTypeUpdate.enabled) {
            storeServiceTypeUpdate.startHour = DatesHelper.Date(this._serviceTypeDetailForm.startHourControl.value, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteSecond);
            storeServiceTypeUpdate.endHour = DatesHelper.Date(this._serviceTypeDetailForm.endHourControl.value, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteSecond);
            storeServiceTypeUpdate.paymentMethod = this._serviceTypeDetailForm.paymentMethodArray.value
                .filter((paymentMethod) => paymentMethod[this.controlNameList.paymentMethodChecked])
                .map((paymentMethod) => paymentMethod[this.controlNameList.paymentMethodName]);
        } else {
            storeServiceTypeUpdate.startHour = DatesHelper.Date(this.storeServiceType.startHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteSecond);
            storeServiceTypeUpdate.endHour = DatesHelper.Date(this.storeServiceType.endHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteSecond);
            storeServiceTypeUpdate.paymentMethod = this.storeServiceType.paymentMethodList;
        }
        this.saveEdition.emit(storeServiceTypeUpdate);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
