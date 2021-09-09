import { Component, OnInit } from '@angular/core';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';

@Component({
    selector: 'app-operations-capacity-report',
    templateUrl: './operations-capacity-report.component.html',
    styleUrls: ['./operations-capacity-report.component.sass']
})
export class OperationsCapacityReportComponent implements OnInit {

    constructor(
        private _operationsCapacityImplement: OperationsCapacitiesImplementService,
    ) {
    }

    public get drugstoreListReport(): string {
        return this._operationsCapacityImplement.drugstoreListReport;
    }

    public get drugstoreDetailReport(): string {
        return this._operationsCapacityImplement.drugstoreDetailReport;
    }

    ngOnInit(): void {
    }

}
