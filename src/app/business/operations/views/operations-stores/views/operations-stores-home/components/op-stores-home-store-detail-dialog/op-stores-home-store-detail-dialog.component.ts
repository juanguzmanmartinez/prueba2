import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store, StoreDetail } from '../../../../models/operations-stores.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CCompanyName } from '@models/company/company.model';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CChannelName } from '@models/channel/channel.model';
import { CPaymentMethodName, EPaymentMethod } from '@models/payment-method/payment-method.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { forkJoin } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { HttpErrorResponse } from '@angular/common/http';

type DeliveryTable = { serviceType: string, paymentMethod: string };
type ZoneTable = { zoneCode: string, zoneName: string, backupZone: string, backupAssignedStore: string };

@Component({
    selector: 'app-op-stores-home-store-detail-dialog',
    templateUrl: './op-stores-home-store-detail-dialog.component.html',
    styleUrls: ['./op-stores-home-store-detail-dialog.component.sass']
})
export class OpStoresHomeStoreDetailDialogComponent implements OnInit {

    public tagAppearance = ETagAppearance;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    private serviceTypeName = CDeliveryServiceTypeName;
    private paymentMethodName = CPaymentMethodName;
    public tabIndexActive = 0;

    public storeDetailLoader = true;
    public storeDetail: StoreDetail;
    public paymentMethodList: EPaymentMethod[];
    public errorResponse: HttpErrorResponse;

    public deliveryDisplayedColumns: string[] = ['serviceType', 'paymentMethod'];
    public deliveryDataSource = new MatTableDataSource<DeliveryTable>([]);
    @ViewChild('deliverySort') deliverySort: MatSort;

    public zoneDisplayedColumns: string[] = ['zoneCode', 'zoneName', 'backupZone', 'backupAssignedStore', 'actions'];
    public zoneDataSource = new MatTableDataSource<ZoneTable>([]);
    @ViewChild('zoneSort') zoneSort: MatSort;
    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

    @Input() store: Store;

    constructor(
        private _operationsStoresImplement: OperationsStoresImplementService,
        private dialogRef: MatDialogRef<OpStoresHomeStoreDetailDialogComponent>,
    ) {
    }

    ngOnInit(): void {
        this.loadData(this.store.code);
    }

    loadData(storeCode: string): void {
        const paymentMethod$ = this._operationsStoresImplement.paymentMethodList;
        const storeDetail$ = this._operationsStoresImplement.getStoreDetail(storeCode);

        forkJoin([storeDetail$, paymentMethod$])
            .subscribe(([storeDetail, paymentMethodList]) => {
                    this.storeDetail = storeDetail;
                    this.paymentMethodList = paymentMethodList;
                    this.settingDataSource();
                    this.storeDetailLoader = false;
                }, (error) => {
                    this.storeDetail = null;
                    this.paymentMethodList = null;
                    this.storeDetailLoader = false;
                    this.errorResponse = error;
                }
            );
    }

    settingDataSource() {
        this.deliveryDataSource.data = this.storeDetail.serviceTypeList.map((serviceType): DeliveryTable => {
            const paymentMethodName = serviceType.paymentMethodList
                .map((paymentMethod) => this.paymentMethodName[paymentMethod]).join(' - ');
            return {serviceType: this.serviceTypeName[serviceType.code], paymentMethod: paymentMethodName};
        });

        this.zoneDataSource.data = this.storeDetail.zoneList.map((zone): ZoneTable => {
            return {
                zoneCode: zone.code,
                zoneName: zone.name,
                backupZone: zone.backupZone,
                backupAssignedStore: zone.backupAssignedStore
            };
        });
        this.deliveryDataSource.sort = this.deliverySort;
        this.zoneDataSource.sort = this.zoneSort;
        this.zoneDataSource.paginator = this.paginator.paginator;
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.storeDetail.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.storeDetail.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `De ${startHour} a ${endHour}`;
    }

    indexSelected(index) {
        this.tabIndexActive = index;
        if (index === 2) {
            this.dialogRef.updateSize('708px');
        } else {
            this.dialogRef.updateSize('526px');
        }
    }

}
