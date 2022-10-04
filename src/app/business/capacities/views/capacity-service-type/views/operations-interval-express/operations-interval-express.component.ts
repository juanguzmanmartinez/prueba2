import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoneBackupDetailControlName } from 'app/business/operations/views/operations-zones/views/operations-zones-edition/components/op-zones-edition-backup-detail-form-card/form/op-zones-edition-backup-detail-form-card-form.service';
import { Subscription } from 'rxjs';
import { IDrugStoreIntervalTimeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';

@Component({
  selector: 'app-operations-interval-express',
  templateUrl: './operations-interval-express.component.html',
  styleUrls: ['./operations-interval-express.component.sass'],
})
export class OperationsIntervalExpressComponent implements OnInit {
  private subscriptions = new Subscription();
  drugStoreCode: string;
  drugStoreName: string;
  public controlNameList = ZoneBackupDetailControlName;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams() {
    this.subscriptions.add(
      this._activatedRoute.queryParams.subscribe(
        (params: IDrugStoreIntervalTimeQueryParams) => {
          this.drugStoreCode = params.drugStoreCode;
          this.drugStoreName = params.drugStoreName;
        }
      )
    );
  }
}
