import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrugstoreServiceType } from '../../../../models/operations-drugstores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { IDrugstoreServiceTypeUpdate } from '@interfaces/drugstores/drugstores.interface';
import {
  DrugstoreServiceTypeControlName,
  OpDrugstoresEditionServiceTypeDetailFormCardFormService
} from './form/op-drugstores-edition-service-type-detail-form-card-form-service';
import { CPaymentMethodName, EPaymentMethod } from '@models/payment-method/payment-method.model';
import { OpDrugstoresEditionServiceTypeDetailDialogService } from '../op-drugstores-edition-service-type-detail-dialog/op-drugstores-edition-service-type-detail-dialog.service';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { minuteFormat } from '@helpers/date-name.helper';
import { CheckboxGroupControl } from '../../../../../operations-zones/views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/controls/checkbox-group.control';

@Component({
  selector: 'app-op-drugstores-edition-service-type-detail-form-card',
  templateUrl: './op-drugstores-edition-service-type-detail-form-card.component.html',
  styleUrls: ['./op-drugstores-edition-service-type-detail-form-card.component.sass'],
  providers: [
    OpDrugstoresEditionServiceTypeDetailFormCardFormService,
    OpDrugstoresEditionServiceTypeDetailDialogService
  ]
})
export class OpDrugstoresEditionServiceTypeDetailFormCardComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public stateValue = CStateValue;
  public serviceTypeName = CDeliveryServiceTypeName;
  public paymentMethodName = CPaymentMethodName;
  public controlNameList = DrugstoreServiceTypeControlName;
  public configurationPath = ROUTER_PATH.operationSettings;
  public serviceTypeCode = EDeliveryServiceType;
  public splitSegmentList: string[] = [];
  public paymentMethodList: EPaymentMethod[] = [];

  @Input() drugstoreDetail: DrugstoreDetail;
  @Input() drugstoreServiceType: DrugstoreServiceType;

  @Output() cancelEdition = new EventEmitter();
  @Output() saveEdition = new EventEmitter();

  constructor(
    private _serviceTypeDetailForm: OpDrugstoresEditionServiceTypeDetailFormCardFormService,
    private _serviceTypeDetailDialog: OpDrugstoresEditionServiceTypeDetailDialogService
  ) { }

  @Input('paymentMethodList')
  set _paymentMethodList(paymentMethodList: EPaymentMethod[]) {
    this.paymentMethodList = paymentMethodList;
    this.updatePaymentMethodListControl();
  }

  get form(): OpDrugstoresEditionServiceTypeDetailFormCardFormService {
    return this._serviceTypeDetailForm;
  }

  get serviceTypePath(): string {
    return ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition();
  }

  ngOnInit(): void {
    this.form.stateControl.patchValue(this.stateValue[this.drugstoreServiceType.state]);
    this.updateFormValues();
    this.updateStateControl();
    this.checkEditionByStateControl();
  }

  updateFormValues(): void {
    this.form.startHourControl.patchValue(this.drugstoreServiceType.startHour);
    this.form.endHourControl.patchValue(this.drugstoreServiceType.endHour);
    this.form.intervalTimeControl.patchValue(minuteFormat(this.drugstoreServiceType.intervalTime));
    this.form.intervalTimeControl.disable();
    this.form.paymentMethodArray.controls.forEach((paymentMethodGroup: CheckboxGroupControl) => {
      const checkedPaymentMethod = this.drugstoreServiceType.paymentMethodList
        .find((paymentMethod: EPaymentMethod) => paymentMethodGroup.valueControl?.value === paymentMethod);
      paymentMethodGroup.checkedControl?.patchValue(!!checkedPaymentMethod);
    });

    this.setSplitSegment();
    this.checkEditionByStateControl();
  }

  checkEditionByStateControl(): void {
    if (this.form.stateControl.value) {
      this.form.startHourControl.enable();
      this.form.endHourControl.enable();
      this.form.paymentMethodArray.enable();
    } else {
      this.form.startHourControl.disable();
      this.form.endHourControl.disable();
      this.form.paymentMethodArray.disable();
    }
  }

  updateStateControl(): void {
    const subscription = this.form.stateControl.valueChanges
      .subscribe(() => {
        if (this.form.stateControl.value === false) {
          this.updateFormValues();
        }
        this.checkEditionByStateControl();
      });
    this.subscriptions.add(subscription);
  }

  updatePaymentMethodListControl(): void {
    this.form.paymentMethodArray.clear();
    this.paymentMethodList.forEach((paymentMethod: EPaymentMethod) => {
      const paymentMethodGroup = this.form.createPaymentMethodGroup(paymentMethod);
      this.form.paymentMethodArray.push(paymentMethodGroup);
    });
    if (this.drugstoreServiceType) {
      this.updateFormValues();
    }
  }

  updateStartHourControl(time: number): void {
    this.form.startHourControl.patchValue(time);
    this.setSplitSegment();
  }

  updateEndHourControl(time: number): void {
    this.form.endHourControl.patchValue(time);
    this.setSplitSegment();
  }

  setSplitSegment(): void {
    const startHour = DatesHelper.Date(this.form.startHourControl.value, DATES_FORMAT.millisecond);
    const endHour = DatesHelper.Date(this.form.endHourControl.value, DATES_FORMAT.millisecond);
    const startHourClone = startHour.clone();

    const hourList = [];
    while (startHourClone.isBefore(endHour)) {
      hourList.push(startHourClone.format(DATES_FORMAT.hourMinuteDateTime));
      startHourClone.add(this.drugstoreServiceType.intervalTime, 'minutes');
    }
    hourList.push(endHour.format(DATES_FORMAT.hourMinuteDateTime));

    this.splitSegmentList = [];
    hourList.reduce((previousValue, currentValue) => {
      this.splitSegmentList.push(`${previousValue} - ${currentValue}`);
      return currentValue;
    });
    this.form.splitSegmentControl.patchValue(this.splitSegmentList.length);
    this.form.splitSegmentControl.disable();
  }

  openServiceTypeDetailDialog(): void {
    this._serviceTypeDetailDialog.open(this.splitSegmentList);
  }

  cancelEditionEvent(): void {
    this.cancelEdition.emit();
  }

  saveEditionEvent(): void {
    const iDrugstoreServiceTypeUpdate = {} as IDrugstoreServiceTypeUpdate;
    iDrugstoreServiceTypeUpdate.enabled = this.form.stateControl.value;
    if (iDrugstoreServiceTypeUpdate.enabled) {
      iDrugstoreServiceTypeUpdate.startHour = DatesHelper.Date(this.form.startHourControl.value, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteSecond);
      iDrugstoreServiceTypeUpdate.endHour = DatesHelper.Date(this.form.endHourControl.value, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteSecond);
      iDrugstoreServiceTypeUpdate.paymentMethod = this.form.paymentMethodArray.value
        .filter((paymentMethod) => paymentMethod[this.controlNameList.paymentMethodChecked])
        .map((paymentMethod) => paymentMethod[this.controlNameList.paymentMethodName]);
    } else {
      iDrugstoreServiceTypeUpdate.startHour = DatesHelper.Date(this.drugstoreServiceType.startHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteSecond);
      iDrugstoreServiceTypeUpdate.endHour = DatesHelper.Date(this.drugstoreServiceType.endHour, DATES_FORMAT.millisecond)
        .format(DATES_FORMAT.hourMinuteSecond);
      iDrugstoreServiceTypeUpdate.paymentMethod = this.drugstoreServiceType.paymentMethodList;
    }
    this.saveEdition.emit(iDrugstoreServiceTypeUpdate);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
