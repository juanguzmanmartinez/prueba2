import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateTag, CStateValue } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { CZoneLabelColor } from '../../../../models/operations-zones-label.model';
import { CZoneTypeName } from '../../../../parameters/operations-zones-type.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CDeliveryTypeName } from '@models/service-type/delivery-service-type.model';

@Component({
  selector: 'app-op-zones-edition-home-zone-detail-card',
  templateUrl: './op-zones-edition-home-zone-detail-card.component.html',
  styleUrls: ['./op-zones-edition-home-zone-detail-card.component.sass'],
})
export class OpZonesEditionHomeZoneDetailCardComponent {
  public stateTag = CStateTag;
  public stateName = CStateName;
  public stateValue = CStateValue;
  public zoneTypeName = CZoneTypeName;
  public deliveryTypeName = CDeliveryTypeName;
  public companyName = CCompanyName;
  public channelName = CChannelName;
  public labelColor = CZoneLabelColor;
  public tagAppearance = ETagAppearance;

  @Input() zoneDetail: ZoneDetail;
  @Input() zoneBackupDetail: ZoneDetail;
  @Output() edit = new EventEmitter();

  get zoneEditionZoneBackup(): string {
    return !this.zoneDetail?.zoneBackup
      ? 'Sin zona backup'
      : this.stateValue[this.zoneDetail.zoneBackup.state]
      ? `${this.zoneBackupDetail?.name} - ${this.zoneBackupDetail?.code}`
      : this.stateName[this.zoneDetail.zoneBackup.state]();
  }

  get zoneEditionDrugstoreBackup(): string {
    return !this.zoneDetail?.zoneBackup
      ? 'Sin local backup'
      : this.stateValue[this.zoneDetail.zoneBackup.state]
      ? `${this.zoneDetail.zoneBackup.assignedStoreCode} - ${this.zoneDetail.zoneBackup.assignedStoreName}`
      : this.stateName[this.zoneDetail.zoneBackup.state]();
  }

  get zoneEditionPath(): string {
    return ROUTER_PATH.opZones_ZoneEdition();
  }
  get zoneStatus(): string {
    return this.zoneDetail.state == 'active'
      ? 'ellipse-success'
      : 'ellipse-danger';
  }
  constructor() {}

  editEvent(): void {
    this.edit.emit();
  }
}
