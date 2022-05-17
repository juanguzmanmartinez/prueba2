import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZoneBackup, ZoneDetail } from '../../../../models/operations-zones.model';
import { ZoneBackupServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { CStateValue } from '@models/state/state.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-op-zones-edition-home-backup-setting-tab',
  templateUrl: './op-zones-edition-home-backup-setting-tab.component.html',
  styleUrls: ['./op-zones-edition-home-backup-setting-tab.component.sass']
})
export class OpZonesEditionHomeBackupSettingTabComponent {

  public stateValue = CStateValue;

  @Input() zoneBackup: ZoneBackup;
  @Input() zoneBackupDetail: ZoneDetail;
  @Input() zoneBackupServiceTypeList: ZoneBackupServiceTypeList;

  @Output() editBackupZone = new EventEmitter();
  @Output() editServiceType = new EventEmitter<EDeliveryServiceType>();

  constructor() { }

  editBackupZonEvent(): void {
    this.editBackupZone.emit();
  }

  editServiceTypeEvent(serviceType: EDeliveryServiceType): void {
    this.editServiceType.emit(serviceType);
  }

  get zoneBackupPath(): string {
    return ROUTER_PATH.opZones_Zone(this.zoneBackupDetail.id);
  }
}
