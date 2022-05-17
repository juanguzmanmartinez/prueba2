import { Component } from '@angular/core';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';

@Component({
  selector: 'app-operations-capacity-report',
  templateUrl: './operations-capacity-report.component.html',
  styleUrls: ['./operations-capacity-report.component.sass']
})
export class OperationsCapacityReportComponent {

  get drugstoreListReport(): string {
    return this._operationsCapacityImplement.drugstoreListReport;
  }

  get drugstoreDetailReport(): string {
    return this._operationsCapacityImplement.drugstoreDetailReport;
  }

  constructor(
    private _operationsCapacityImplement: OperationsCapacitiesImplementService,
  ) { }

}
