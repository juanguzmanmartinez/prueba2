import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Drugstore, DrugstoreDetail } from '../../../../models/operations-drugstores.model';
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
import { OperationsDrugstoresImplementService } from '../../../../implements/operations-drugstores-implement.service';
import { forkJoin } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { HttpErrorResponse } from '@angular/common/http';

type DeliveryTable = { serviceType: string, paymentMethod: string };
type ZoneTable = { zoneCode: string, zoneName: string, backupZone: string, backupAssignedDrugstore: string };

@Component({
    selector: 'app-op-drugstores-home-drugstore-detail-dialog',
    templateUrl: './op-drugstores-home-drugstore-detail-dialog.component.html',
    styleUrls: ['./op-drugstores-home-drugstore-detail-dialog.component.sass']
})
export class OpDrugstoresHomeDrugstoreDetailDialogComponent implements OnInit {

    public tagAppearance = ETagAppearance;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    private serviceTypeName = CDeliveryServiceTypeName;
    private paymentMethodName = CPaymentMethodName;
    public tabIndexActive = 0;

    public drugstoreDetailLoader = true;
    public drugstoreDetail: DrugstoreDetail;
    public paymentMethodList: EPaymentMethod[];
    public errorResponse: HttpErrorResponse;

    public deliveryDisplayedColumns: string[] = ['serviceType', 'paymentMethod'];
    public deliveryDataSource = new MatTableDataSource<DeliveryTable>([]);
    @ViewChild('deliverySort') deliverySort: MatSort;

    public zoneDisplayedColumns: string[] = ['zoneCode', 'zoneName', 'backupZone', 'backupAssignedDrugstore', 'actions'];
    public zoneDataSource = new MatTableDataSource<ZoneTable>([]);
    @ViewChild('zoneSort') zoneSort: MatSort;
    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

    @Input() drugstore: Drugstore;

    constructor(
        private _operationsStoresImplement: OperationsDrugstoresImplementService,
        private dialogRef: MatDialogRef<OpDrugstoresHomeDrugstoreDetailDialogComponent>,
    ) {
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.drugstoreDetail.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.drugstoreDetail.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `De ${startHour} a ${endHour}`;
    }

    ngOnInit(): void {
        this.loadData(this.drugstore.code);
    }

    loadData(drugstoreCode: string): void {
        const paymentMethod$ = this._operationsStoresImplement.paymentMethodList;
        const drugstoreDetail$ = this._operationsStoresImplement.getDrugstoreDetail(drugstoreCode);

        forkJoin([drugstoreDetail$, paymentMethod$])
            .subscribe(([drugstoreDetail, paymentMethodList]) => {
                    this.drugstoreDetail = drugstoreDetail;
                    this.paymentMethodList = paymentMethodList;
                    this.settingDataSource();
                    this.drugstoreDetailLoader = false;
                }, (error) => {
                    this.drugstoreDetail = null;
                    this.paymentMethodList = null;
                    this.drugstoreDetailLoader = false;
                    this.errorResponse = error;
                }
            );
    }

    settingDataSource() {
        this.deliveryDataSource.data = this.drugstoreDetail.serviceTypeList.map((serviceType): DeliveryTable => {
            const paymentMethodName = serviceType.paymentMethodList
                .map((paymentMethod) => this.paymentMethodName[paymentMethod]).join(' - ');
            return {serviceType: this.serviceTypeName[serviceType.code], paymentMethod: paymentMethodName};
        });

        this.zoneDataSource.data = this.drugstoreDetail.zoneList.map((zone): ZoneTable => {
            return {
                zoneCode: zone.code,
                zoneName: zone.name,
                backupZone: zone.backupZone,
                backupAssignedDrugstore: zone.backupAssignedStore
            };
        });
        this.deliveryDataSource.sort = this.deliverySort;
        this.zoneDataSource.sort = this.zoneSort;
        this.zoneDataSource.paginator = this.paginator.paginator;
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
