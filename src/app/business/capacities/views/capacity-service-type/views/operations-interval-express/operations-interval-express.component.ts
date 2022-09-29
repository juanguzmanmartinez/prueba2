import { Component, OnInit } from '@angular/core';
import { ZoneBackupDetailControlName } from 'app/business/operations/views/operations-zones/views/operations-zones-edition/components/op-zones-edition-backup-detail-form-card/form/op-zones-edition-backup-detail-form-card-form.service';

@Component({
  selector: 'app-operations-interval-express',
  templateUrl: './operations-interval-express.component.html',
  styleUrls: ['./operations-interval-express.component.sass'],
})
export class OperationsIntervalExpressComponent implements OnInit {
  public controlNameList = ZoneBackupDetailControlName;

  constructor() {}

  ngOnInit(): void {}
}
