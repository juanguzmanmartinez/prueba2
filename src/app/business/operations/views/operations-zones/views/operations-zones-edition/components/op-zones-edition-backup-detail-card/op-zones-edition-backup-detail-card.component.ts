import { Component, Input, OnInit } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';

@Component({
  selector: 'app-op-zones-edition-backup-detail-card',
  templateUrl: './op-zones-edition-backup-detail-card.component.html',
  styleUrls: ['./op-zones-edition-backup-detail-card.component.sass']
})
export class OpZonesEditionBackupDetailCardComponent implements OnInit {

  @Input() zoneDetail: ZoneDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
