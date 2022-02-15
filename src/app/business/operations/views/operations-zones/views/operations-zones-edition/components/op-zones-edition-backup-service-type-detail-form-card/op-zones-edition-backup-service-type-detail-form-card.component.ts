import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneBackup, ZoneDetail } from '../../../../models/operations-zones.model';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceType } from '../../../../models/operations-zones-service-type.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import {
  OpZonesEditionBackupServiceTypeDetailFormCardFormService,
  ZoneBackupServiceTypeDetailControlName
} from './form/op-zones-edition-backup-service-type-detail-form-card-form.service';
import { CGStateSettingByState, CGStateSettingByValue, CStateValue, EStateSetting } from '@models/state/state.model';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';

@Component({
  selector: 'app-op-zones-edition-backup-service-type-detail-form-card',
  templateUrl: './op-zones-edition-backup-service-type-detail-form-card.component.html',
  styleUrls: ['./op-zones-edition-backup-service-type-detail-form-card.component.sass'],
  providers: [OpZonesEditionBackupServiceTypeDetailFormCardFormService]
})
export class OpZonesEditionBackupServiceTypeDetailFormCardComponent implements OnInit {

  private serviceTypeName = CDeliveryServiceTypeName;

  public serviceType: EDeliveryServiceType;
  public controlNameList = ZoneBackupServiceTypeDetailControlName;
  public stateValue = CStateValue;

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

  get zoneBackupServiceTypePath(): string {
    switch (this.zoneBackupServiceType.code) {
      case EDeliveryServiceType.amPm:
        return ROUTER_PATH.opZones_ZoneBackupAmPmEdition();
      case EDeliveryServiceType.scheduled:
        return ROUTER_PATH.opZones_ZoneBackupScheduledEdition();
    }
  }

  constructor(
    public _editionBackupServiceTypeDetailForm: OpZonesEditionBackupServiceTypeDetailFormCardFormService
  ) { }

  ngOnInit(): void {
    this._editionBackupServiceTypeDetailForm.stateControl.patchValue(this.stateValue[this.zoneBackupServiceType.forceService]);
  }

  cancelEditionEvent(): void {
    this.cancelEdition.emit();
  }

  saveEditionEvent(): void {
    const zoneBackupUpdate = {} as IZoneBackupUpdate;
    zoneBackupUpdate.zoneId = this.zoneBackupDetail.id;
    zoneBackupUpdate.preferableLocalBackupToShow = EStateSetting.true;
    zoneBackupUpdate.forceServiceAMPM = this.zoneBackupServiceType.code === EDeliveryServiceType.amPm ?
      CGStateSettingByValue(this._editionBackupServiceTypeDetailForm.stateControl.value) :
      CGStateSettingByState(this.zoneBackup.forceServiceAMPM);
    zoneBackupUpdate.forceServicePROG = this.zoneBackupServiceType.code === EDeliveryServiceType.scheduled ?
      CGStateSettingByValue(this._editionBackupServiceTypeDetailForm.stateControl.value) :
      CGStateSettingByState(this.zoneBackup.forceServiceSCHEDULED);
    this.saveEdition.emit(zoneBackupUpdate);
  }
}
