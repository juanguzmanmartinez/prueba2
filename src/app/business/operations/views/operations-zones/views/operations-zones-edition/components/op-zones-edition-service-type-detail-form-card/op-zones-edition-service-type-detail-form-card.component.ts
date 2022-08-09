import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CDeliveryServiceTypeName,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import {
  OpZonesEditionServiceTypeDetailFormCardFormService,
  ZoneServiceTypeControlName,
} from './form/op-zones-edition-service-type-detail-form-card-form.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CStateValue } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { Subscription } from 'rxjs';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { IZoneServiceTypeUpdate } from '@interfaces/zones/zones.interface';
import { OpZonesEditionServiceTypeDetailDialogService } from '../op-zones-edition-service-type-detail-dialog/op-zones-edition-service-type-detail-dialog.service';
import { ZonesDrugstoreServiceType } from '../../../../models/operations-zones-store.model';
import { ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import { AlertService } from '@molecules/alert/alert.service';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { minuteFormat } from '@helpers/date-name.helper';
import { ETagAppearance } from '@models/tag/tag.model';
import { CChannelColor, CChannelName } from '@models/channel/channel.model';
import {
  CCompanyColor,
  CCompanyIcon,
  CCompanyName,
} from '@models/company/company.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-op-zones-edition-service-type-detail-form-card',
  templateUrl:
    './op-zones-edition-service-type-detail-form-card.component.html',
  styleUrls: [
    './op-zones-edition-service-type-detail-form-card.component.sass',
  ],
  providers: [
    OpZonesEditionServiceTypeDetailFormCardFormService,
    OpZonesEditionServiceTypeDetailDialogService,
  ],
})
export class OpZonesEditionServiceTypeDetailFormCardComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  public serviceTypeCode = EDeliveryServiceType;
  public serviceTypeName = CDeliveryServiceTypeName;
  public controlNameList = ZoneServiceTypeControlName;
  public configurationPath = ROUTER_PATH.operationSettings;
  public tagAppearance = ETagAppearance;
  public showCustomAmount: boolean;

  private stateValue = CStateValue;
  private channelName = CChannelName;
  private companyIcon = CCompanyIcon;
  private channelColor = CChannelColor;
  private companyName = CCompanyName;
  private companyColor = CCompanyColor;

  public splitSegmentList: string[] = [];

  @Input() zoneDetail: ZoneDetail;
  @Input() zoneServiceType: ZoneServiceType;
  @Input() zonesStoreServiceType: ZonesDrugstoreServiceType;

  @Output() cancelEdition = new EventEmitter();
  @Output() saveEdition = new EventEmitter();

  get segmentCompanyName(): string {
    return this.companyName[this.zoneServiceType.company];
  }

  get segmentCompanyIcon(): string {
    return this.companyIcon[this.zoneServiceType.company];
  }

  get segmentCompanyColor(): string {
    return this.companyColor[this.zoneServiceType.company];
  }

  get segmentChannelName(): string {
    return this.channelName[this.zoneServiceType.channel];
  }

  get segmentChannelColor(): string {
    return this.channelColor[this.zoneServiceType.channel];
  }

  get form$(): FormGroup {
    return this._serviceTypeDetailForm.form$;
  }

  get zoneServiceTypePath(): string {
    return ROUTER_PATH.opZones_ZoneServiceTypeEdition();
  }

  constructor(
    public _serviceTypeDetailForm: OpZonesEditionServiceTypeDetailFormCardFormService,
    private _serviceTypeDetailDialog: OpZonesEditionServiceTypeDetailDialogService,
    private _alert: AlertService
  ) {
    this.showCustomAmount = false;
  }

  ngOnInit(): void {
    this._serviceTypeDetailForm.stateControl.patchValue(
      this.stateValue[this.zoneServiceType.state]
    );
    this.updateFormValues();
    this.updateStateControl();
    this.checkEditionByStateControl();

    console.log(this.zoneDetail);
    console.log(this.zoneServiceType);
  }

  updateFormValues(): void {
    this._serviceTypeDetailForm.startHourControl.patchValue(
      this.zoneServiceType.startHour
    );
    this._serviceTypeDetailForm.startHourControl.disable();
    this._serviceTypeDetailForm.endHourControl.patchValue(
      this.zoneServiceType.endHour
    );
    this._serviceTypeDetailForm.segmentGapControl.patchValue(
      this.zoneServiceType.segmentGap
    );
    this._serviceTypeDetailForm.intervalTimeControl.patchValue(
      minuteFormat(this.zoneServiceType.intervalTime)
    );
    this._serviceTypeDetailForm.intervalTimeControl.disable();

    this.setSplitSegment();
    this.checkEditionByStateControl();
  }

  updateStateControl(): void {
    const subscription =
      this._serviceTypeDetailForm.stateControl.valueChanges.subscribe(() => {
        if (this._serviceTypeDetailForm.stateControl.value === false) {
          this.updateFormValues();
        }
        if (
          !this.stateValue[this.zonesStoreServiceType.state] &&
          this._serviceTypeDetailForm.stateControl.value
        ) {
          this._serviceTypeDetailForm.stateControl.setValue(false);
          this._alert.alertWarning(
            OperationMessages.warningServiceTypeDependency(
              this.serviceTypeName[this.zoneServiceType.code],
              this.zoneDetail.assignedStore.name
            )
          );
        }
        this.checkEditionByStateControl();
      });
    this.subscriptions.add(subscription);
  }

  checkEditionByStateControl(): void {
    if (this._serviceTypeDetailForm.stateControl.value) {
      this._serviceTypeDetailForm.endHourControl.enable();
      this._serviceTypeDetailForm.segmentGapControl.enable();
    } else {
      this._serviceTypeDetailForm.startHourControl.disable();
      this._serviceTypeDetailForm.endHourControl.disable();
      this._serviceTypeDetailForm.segmentGapControl.disable();
    }

    if (this.zoneServiceType.code === EDeliveryServiceType.ret) {
      this._serviceTypeDetailForm.segmentGapControl.disable();
    }
  }

  updateStartHourControl(time: number): void {
    this._serviceTypeDetailForm.startHourControl.patchValue(time);
    this.setSplitSegment();
  }

  updateEndHourControl(time: number): void {
    this._serviceTypeDetailForm.endHourControl.patchValue(time);
    this.setSplitSegment();
  }

  setSplitSegment(): void {
    const startHour = DatesHelper.Date(
      this._serviceTypeDetailForm.startHourControl.value,
      DATES_FORMAT.millisecond
    );
    const endHour = DatesHelper.Date(
      this._serviceTypeDetailForm.endHourControl.value,
      DATES_FORMAT.millisecond
    );
    const startHourClone = startHour.clone();

    const hourList = [];
    while (startHourClone.isBefore(endHour)) {
      hourList.push(startHourClone.format(DATES_FORMAT.hourMinuteDateTime));
      startHourClone.add(this.zoneServiceType.intervalTime, 'minutes');
    }
    hourList.push(endHour.format(DATES_FORMAT.hourMinuteDateTime));

    this.splitSegmentList = [];
    hourList.reduce((previousValue, currentValue) => {
      this.splitSegmentList.push(`${previousValue} - ${currentValue}`);
      return currentValue;
    });
    this._serviceTypeDetailForm.splitSegmentControl.patchValue(
      this.splitSegmentList.length
    );
    this._serviceTypeDetailForm.splitSegmentControl.disable();
  }

  openServiceTypeDetailDialog(): void {
    this._serviceTypeDetailDialog.open(this.splitSegmentList);
  }

  cancelEditionEvent(): void {
    this.cancelEdition.emit();
  }

  saveEditionEvent(): void {
    const zoneServiceTypeUpdate = {} as IZoneServiceTypeUpdate;
    zoneServiceTypeUpdate.enabled =
      this._serviceTypeDetailForm.stateControl.value;
    // zoneServiceTypeUpdate.channel = this.zoneServiceType.channel;
    // zoneServiceTypeUpdate.companyCode = this.zoneServiceType.company;
    zoneServiceTypeUpdate.serviceTypeId = this.zoneServiceType.id;
    zoneServiceTypeUpdate.intervalTime = this.zoneServiceType.intervalTime;
    zoneServiceTypeUpdate.zoneId = this.zoneDetail.id;
    zoneServiceTypeUpdate.service = this.zoneServiceType.code;
    zoneServiceTypeUpdate.serviceCost =
      this._serviceTypeDetailForm.customAmountControl.value;

    if (zoneServiceTypeUpdate.enabled) {
      zoneServiceTypeUpdate.startHour = DatesHelper.Date(
        this._serviceTypeDetailForm.startHourControl.value,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteSecond);
      zoneServiceTypeUpdate.endHour = DatesHelper.Date(
        this._serviceTypeDetailForm.endHourControl.value,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteSecond);
      zoneServiceTypeUpdate.segmentGap =
        this._serviceTypeDetailForm.segmentGapControl.value;
    } else {
      zoneServiceTypeUpdate.startHour = DatesHelper.Date(
        this.zoneServiceType.startHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteSecond);
      zoneServiceTypeUpdate.endHour = DatesHelper.Date(
        this.zoneServiceType.endHour,
        DATES_FORMAT.millisecond
      ).format(DATES_FORMAT.hourMinuteSecond);
      zoneServiceTypeUpdate.segmentGap = this.zoneServiceType.segmentGap;
    }

    this.saveEdition.emit(zoneServiceTypeUpdate);
  }

  showInput(): void {
    this.showCustomAmount = true;
  }
  hideInput(): void {
    this.showCustomAmount = false;
    this._serviceTypeDetailForm.customAmountControl.setValue(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
