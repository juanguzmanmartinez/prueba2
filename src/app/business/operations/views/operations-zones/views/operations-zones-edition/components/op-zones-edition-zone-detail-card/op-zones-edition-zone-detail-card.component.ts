import { Component, Input } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName, CStateValue } from '@models/state/state.model';

@Component({
  selector: 'app-op-zones-edition-zone-detail-card',
  templateUrl: './op-zones-edition-zone-detail-card.component.html',
  styleUrls: ['./op-zones-edition-zone-detail-card.component.sass']
})
export class OpZonesEditionZoneDetailCardComponent {

  private stateValue = CStateValue;
  private stateName = CStateName;

  @Input() zoneDetail: ZoneDetail;

  get zoneEditionZoneBackup(): string {
    return !this.zoneDetail?.zoneBackup ?
      'Sin zona backup' : this.stateValue[this.zoneDetail.zoneBackup.state] ?
        `${this.zoneDetail.zoneBackup.name} - ${this.zoneDetail.zoneBackup.code}` :
        this.stateName[this.zoneDetail.zoneBackup.state]();
  }

  get zoneEditionDrugstoreBackup(): string {
    return !this.zoneDetail?.zoneBackup ?
      'Sin local backup' : this.stateValue[this.zoneDetail.zoneBackup.state] ?
        `${this.zoneDetail.zoneBackup.assignedStoreCode} - ${this.zoneDetail.zoneBackup.assignedStoreName}` :
        this.stateName[this.zoneDetail.zoneBackup.state]();
  }

  constructor() { }

}
