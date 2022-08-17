import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ZoneBackup,
  ZoneDetail,
} from '../../../../models/operations-zones.model';
import {
  CDeliveryServiceTypeName,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceType } from '../../../../models/operations-zones-service-type.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import {
  OpZonesEditionBackupServiceTypeDetailFormCardFormService,
  ZoneBackupServiceTypeDetailControlName,
} from './form/op-zones-edition-backup-service-type-detail-form-card-form.service';
import {
  CGStateSettingByState,
  CGStateSettingByValue,
  CStateValue,
  EStateSetting,
} from '@models/state/state.model';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-op-zones-edition-backup-service-type-detail-form-card',
  templateUrl:
    './op-zones-edition-backup-service-type-detail-form-card.component.html',
  styleUrls: [
    './op-zones-edition-backup-service-type-detail-form-card.component.sass',
  ],
  providers: [OpZonesEditionBackupServiceTypeDetailFormCardFormService],
})
export class OpZonesEditionBackupServiceTypeDetailFormCardComponent
  implements OnInit
{
  private serviceTypeName = CDeliveryServiceTypeName;

  public serviceType: EDeliveryServiceType;
  public controlNameList = ZoneBackupServiceTypeDetailControlName;
  public stateValue = CStateValue;
  public showCustomAmount: boolean;
  public isCostDefault: boolean;

  @Input() zoneBackup: ZoneBackup;
  @Input() zoneBackupDetail: ZoneDetail;
  @Input() zoneBackupServiceType: ZoneBackupServiceType;

  @Output() cancelEdition = new EventEmitter();
  @Output() saveEdition = new EventEmitter<IZoneBackupUpdate>();

  get form(): OpZonesEditionBackupServiceTypeDetailFormCardFormService {
    return this._editionBackupServiceTypeDetailForm;
  }

  get segmentName(): string {
    return this.serviceTypeName[this.zoneBackupServiceType.code];
  }

  get zoneBackupPath(): string {
    return ROUTER_PATH.opZones_Zone(this.zoneBackupDetail.id);
  }

  get form$(): FormGroup {
    return this._editionBackupServiceTypeDetailForm.form$;
  }

  get zoneBackupServiceTypePath(): string {
    switch (this.zoneBackupServiceType.code) {
      case EDeliveryServiceType.amPm:
        return ROUTER_PATH.opZones_ZoneBackupAmPmEdition();
      case EDeliveryServiceType.scheduled:
        return ROUTER_PATH.opZones_ZoneBackupScheduledEdition();
    }
  }

  get defaultServiceCost(): string {
    const zoneBackupDetail = this.zoneBackupDetail.serviceTypeList.find(
      (service) => service.id === this.zoneBackupServiceType.id
    );

    // if (zoneBackupDetail.flagServiceType === 'D') {
    //   return zoneBackupDetail.serviceCost.toFixed(2);
    // }

    return zoneBackupDetail.serviceCostDefault.toFixed(2);
  }

  constructor(
    public _editionBackupServiceTypeDetailForm: OpZonesEditionBackupServiceTypeDetailFormCardFormService
  ) {
    this.showCustomAmount = false;
  }

  ngOnInit(): void {
    this._editionBackupServiceTypeDetailForm.stateControl.patchValue(
      this.stateValue[this.zoneBackupServiceType.forceService]
    );
    this.updateFormValues();
  }

  updateFormValues(): void {
    if (this.zoneBackupServiceType.flagServiceType === 'D') {
      this.isCostDefault = true;
      this._editionBackupServiceTypeDetailForm.customAmountControl.patchValue(
        0
      );
      this._editionBackupServiceTypeDetailForm.customAmountRadioControl.patchValue(
        false
      );
    } else {
      this.isCostDefault = false;
      this._editionBackupServiceTypeDetailForm.customAmountControl.patchValue(
        `S/ ${this.zoneBackupServiceType.serviceCost.toFixed(2)}`
      );
      this._editionBackupServiceTypeDetailForm.customAmountRadioControl.patchValue(
        true
      );

      this.showInput();
    }
  }

  showInput(): void {
    this.showCustomAmount = true;
    this._editionBackupServiceTypeDetailForm.setServiceCostValidator();
  }

  hideInput(): void {
    this.showCustomAmount = false;
    this._editionBackupServiceTypeDetailForm.customAmountControl.setValue(
      'S/ 0.00'
    );
    this._editionBackupServiceTypeDetailForm.clearServiceCostValidator();
  }

  formatCustomAmount(customAmountText: string): number {
    const amountSplitted = customAmountText.split(' ');
    let customNumber = 0;
    if (amountSplitted.length === 1) {
      const amountNotDot = amountSplitted[0];
      customNumber = Number(amountNotDot);
      console.log('customNumber', customNumber);
    }

    if (amountSplitted.length > 1) {
      const amountNotDot = amountSplitted[1].split('.');
      console.log('amountNotDot', amountNotDot);
      const amountAll = amountNotDot.join('');
      customNumber = Number(amountAll);
      console.log('customNumber', customNumber);
    }

    return customNumber / 100;
  }

  getErrorServiceCost() {
    return (
      this._editionBackupServiceTypeDetailForm.customAmountControl.invalid &&
      this._editionBackupServiceTypeDetailForm.customAmountControl.touched
    );
  }

  cancelEditionEvent(): void {
    this.cancelEdition.emit();
  }

  saveEditionEvent(): void {
    const zoneBackupUpdate = {} as IZoneBackupUpdate;
    zoneBackupUpdate.zoneId = this.zoneBackupDetail.id;
    zoneBackupUpdate.preferableLocalBackupToShow = EStateSetting.true;
    zoneBackupUpdate.forceServiceAMPM =
      this.zoneBackupServiceType.code === EDeliveryServiceType.amPm
        ? CGStateSettingByValue(
            this._editionBackupServiceTypeDetailForm.stateControl.value
          )
        : CGStateSettingByState(this.zoneBackup.forceServiceAMPM);
    zoneBackupUpdate.forceServicePROG =
      this.zoneBackupServiceType.code === EDeliveryServiceType.scheduled
        ? CGStateSettingByValue(
            this._editionBackupServiceTypeDetailForm.stateControl.value
          )
        : CGStateSettingByState(this.zoneBackup.forceServiceSCHEDULED);

    zoneBackupUpdate.serviceTypeId = this.zoneBackupServiceType.id;
    zoneBackupUpdate.serviceCost = !this.showCustomAmount
      ? null
      : this.formatCustomAmount(
          this._editionBackupServiceTypeDetailForm.customAmountControl.value
        );
    zoneBackupUpdate.service = this.zoneBackupServiceType.code;
    console.log('zoneBackupUpdate', zoneBackupUpdate);
    this.saveEdition.emit(zoneBackupUpdate);
  }
}
