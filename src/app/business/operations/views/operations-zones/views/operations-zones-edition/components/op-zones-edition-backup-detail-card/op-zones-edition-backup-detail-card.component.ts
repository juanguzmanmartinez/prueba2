import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';

@Component({
  selector: 'app-op-zones-edition-backup-detail-card',
  templateUrl: './op-zones-edition-backup-detail-card.component.html',
  styleUrls: ['./op-zones-edition-backup-detail-card.component.sass']
})
export class OpZonesEditionBackupDetailCardComponent implements OnInit {

  @Input() zoneDetail: ZoneDetail;

  constructor() {
  }

  ngOnInit(): void {
  }

  get zoneEditionZoneBackup() {
    return !this.zoneDetail?.zoneBackup ?
        'Sin zona backup' : `${this.zoneDetail.zoneBackup.name} - ${this.zoneDetail.zoneBackup.code}`;
  }

  get zoneEditionDrugstoreBackup() {
    return !this.zoneDetail?.zoneBackup ?
        'Sin local backup' : `${this.zoneDetail.zoneBackup.assignedStoreCode} - ${this.zoneDetail.zoneBackup.assignedStoreName}`;
  }

}
