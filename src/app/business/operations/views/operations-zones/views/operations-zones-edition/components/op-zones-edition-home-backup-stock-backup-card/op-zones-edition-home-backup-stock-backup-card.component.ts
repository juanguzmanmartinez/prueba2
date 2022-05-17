import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-op-zones-edition-home-backup-stock-backup-card',
  templateUrl: './op-zones-edition-home-backup-stock-backup-card.component.html',
  styleUrls: ['./op-zones-edition-home-backup-stock-backup-card.component.sass']
})
export class OpZonesEditionHomeBackupStockBackupCardComponent {

  @Input() zoneBackupDetail: ZoneDetail;
  @Input() disabled: boolean;

  @Output() edit = new EventEmitter();

  get zoneEditionZoneBackup(): string {
    return !this.zoneBackupDetail ?
      'Sin zona backup' : `${this.zoneBackupDetail.name} - ${this.zoneBackupDetail.code}`;
  }

  get zoneEditionDrugstoreBackup(): string {
    return !this.zoneBackupDetail?.assignedStore ?
      'Sin local backup' : `${this.zoneBackupDetail.assignedStore.code} - ${this.zoneBackupDetail.assignedStore.name}`;
  }

  get stockBackupDisabled(): boolean {
    return !this.zoneBackupDetail || this.disabled;
  }

  get backupEditionPath(): string {
    return ROUTER_PATH.opZones_ZoneBackupEdition();
  }

  constructor() { }

  editEvent(): void {
    this.edit.emit();
  }
}
