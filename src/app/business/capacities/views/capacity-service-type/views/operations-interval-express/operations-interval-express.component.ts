import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IExpressIntervalTimeParams,
  IExpressIntervalTimeResponse,
} from '@interfaces/capacities/interval-time.interface';
import { ZoneBackupDetailControlName } from 'app/business/operations/views/operations-zones/views/operations-zones-edition/components/op-zones-edition-backup-detail-form-card/form/op-zones-edition-backup-detail-form-card-form.service';
import { Subscription } from 'rxjs';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { ExpressIntervalTime } from '../../models/express-interval-time.model';
import { IDrugStoreIntervalTimeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { IntervalTimeExpressFormService } from '../../store/interval-time-express-form.service';

@Component({
  selector: 'app-operations-interval-express',
  templateUrl: './operations-interval-express.component.html',
  styleUrls: ['./operations-interval-express.component.sass'],
})
export class OperationsIntervalExpressComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  drugStoreCode: string;
  drugStoreName: string;
  expressIntervalTime: ExpressIntervalTime;
  loading: boolean;
  public controlNameList = ZoneBackupDetailControlName;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _capacitiesService: OperationsCapacitiesImplementService,
    private _intervalTimeForm: IntervalTimeExpressFormService
  ) {
    this.loading = true;
    this._intervalTimeForm.initValues();
  }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams() {
    this.subscriptions.add(
      this._activatedRoute.queryParams.subscribe(
        (params: IDrugStoreIntervalTimeQueryParams) => {
          this.drugStoreCode = params.drugStoreCode;
          this.drugStoreName = params.drugStoreName;
          this.getCapacityIntervalTimeExpress();
        }
      )
    );
  }

  getCapacityIntervalTimeExpress() {
    const params: IExpressIntervalTimeParams = {
      localCode: this.drugStoreCode,
      serviceType: 'EXP',
    };

    this.subscriptions.add(
      this._capacitiesService
        .getCapacityIntervalTimeExpress$(params)
        .subscribe((res) => {
          this._intervalTimeForm.updateInvertalTimeForm(res);
          this.expressIntervalTime = res;
          this.loading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this._intervalTimeForm.intervalTimeForm.reset();
    this.subscriptions.unsubscribe();
  }
}
