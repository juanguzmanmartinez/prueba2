import { Component, Input } from '@angular/core';
import { CStateValue } from '@models/state/state.model';
import { ZoneDetail } from '../../../../models/operations-zones.model';

@Component({
  selector: 'app-op-zones-edition-backup-detail-card',
  templateUrl: './op-zones-edition-backup-detail-card.component.html',
  styleUrls: ['./op-zones-edition-backup-detail-card.component.sass']
})
export class OpZonesEditionBackupDetailCardComponent {

  @Input() zoneDetail: ZoneDetail;

  get zoneEditionZoneBackup(): string {
    return !this.zoneDetail?.zoneBackup ?
      'Sin zona backup' : `${this.zoneDetail.zoneBackup.name} - ${this.zoneDetail.zoneBackup.code}`;
  }

  get zoneEditionDrugstoreBackup(): string {
    return !this.zoneDetail?.zoneBackup ?
      'Sin local backup' : `${this.zoneDetail.zoneBackup.assignedStoreCode} - ${this.zoneDetail.zoneBackup.assignedStoreName}`;
  }

  get zoneState(){
    return CStateValue[this.zoneDetail?.state];
  }

  constructor() { }

}
