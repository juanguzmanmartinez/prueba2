import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CCompanyName } from '@models/company/company.model';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { CPaymentMethodName } from '@models/payment-method/payment-method.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-op-stores-home-store-detail-dialog',
    templateUrl: './op-stores-home-store-detail-dialog.component.html',
    styleUrls: ['./op-stores-home-store-detail-dialog.component.sass']
})
export class OpStoresHomeStoreDetailDialogComponent implements OnInit {
    public displayedColumns: string[] = ['zoneCode', 'zoneName'];
    public dataSource = new MatTableDataSource([]);

    public tagAppearance = ETagAppearance;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public serviceTypeName = CDeliveryServiceTypeName;
    public channelName = CChannelName;
    public paymentMethodName = CPaymentMethodName;


    @Input() storeDetail: StoreDetail;

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource.data = this.storeDetail.zoneList;
        this.dataSource.sortingDataAccessor = (data: StoreDetail, sortHeaderId: string) => {
            switch (sortHeaderId) {
                case 'zoneCode':
                    return data.code;
                case 'zoneName':
                    return data.name;
                default:
                    return data[sortHeaderId];
            }
        };
        this.dataSource.sort = this.sort;
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.storeDetail.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.storeDetail.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `De ${startHour} a ${endHour}`;
    }

}
