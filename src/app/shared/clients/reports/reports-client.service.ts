import { Injectable } from '@angular/core';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';

@Injectable()
export class ReportsClientService {
    private readonly DRUGSTORE_LIST_REPORT = EndpointsParameter.DRUGSTORE_LIST_REPORT;
    private readonly DRUGSTORE_DETAIL_REPORT = EndpointsParameter.DRUGSTORE_DETAIL_REPORT;

    constructor() {
    }

    drugstoreListReport(): string {
        return this.DRUGSTORE_LIST_REPORT;
    }

    drugstoreDetailReport(): string {
        return this.DRUGSTORE_DETAIL_REPORT;
    }
}
