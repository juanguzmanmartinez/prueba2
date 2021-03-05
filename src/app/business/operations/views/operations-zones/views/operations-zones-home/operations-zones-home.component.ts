import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { Zone } from '../../models/operations-zones.model';
import { OpZonesHomeZoneDetailDialogService } from './components/op-zones-home-zone-detail-dialog/op-zones-home-zone-detail-dialog.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { normalizeValue } from '@helpers/string.helper';
import { CStateName, CStateTag } from '@models/state/state.model';

@Component({
    selector: 'app-operations-zones-home',
    templateUrl: './operations-zones-home.component.html',
    styleUrls: ['./operations-zones-home.component.sass'],
    providers: [OpZonesHomeZoneDetailDialogService]
})
export class OperationsZonesHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;
    public stateTag = CStateTag;
    public stateName = CStateName;

    public searchInput = '';
    public tableLoader = true;

    public displayedColumns: string[] = ['selector', 'zoneId', 'zoneName', 'assignedStore', 'serviceType', 'zoneState', 'actions'];
    public dataSource = new MatTableDataSource([]);
    public rowSelection = new SelectionModel<Zone>(true, []);

    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _zoneDetailDialog: OpZonesHomeZoneDetailDialogService,
        private _operationsZonesImplement: OperationsZonesImplementService
    ) {
    }

    ngOnInit() {
        this._operationsZonesImplement.zoneList
            .subscribe((zoneList: Array<Zone>) => {
                    this.tableLoader = false;
                    this.dataSource.data = zoneList;
                    this.setDataSourceService();
                },
                () => {
                    this.tableLoader = false;
                });
    }

    setDataSourceService() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator.paginator;
        this.dataSource.filterPredicate = (data: Zone, filter: string) => {
            const filterNormalize = normalizeValue(filter);
            const idNormalize = normalizeValue(`${data.id}`);
            const nameNormalize = normalizeValue(data.name);
            const assignedStoreNameNormalize = normalizeValue(data.assignedStore ? data.assignedStore.name : '');
            const assignedStoreCodeNormalize = normalizeValue(data.assignedStoreCode);
            const serviceTypeNormalize = normalizeValue(data.serviceTypeList.map(serviceType => this.serviceTypeName[serviceType]).join(''));
            const stateNormalize = normalizeValue(this.stateName[data.state]());
            const valueArray = [idNormalize, nameNormalize, assignedStoreCodeNormalize, assignedStoreNameNormalize, serviceTypeNormalize, stateNormalize];

            const concatValue = normalizeValue(valueArray.join(''));
            const everyValue = valueArray.some(value => value.includes(filterNormalize));

            return concatValue.includes(filterNormalize) && everyValue;
        };
    }


    filterBySearchInput() {
        this.dataSource.filter = this.searchInput.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    isAllSelected() {
        const numSelected = this.rowSelection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.rowSelection.clear() :
            this.dataSource.data.forEach(row => this.rowSelection.select(row));
    }


    editRow(zoneId: number) {
        this._router.navigate([CONCAT_PATH.opZones_ZoneId(`${zoneId}`)]);
    }

    rowDetailDialog(zone: Zone) {
        const subscription = this._zoneDetailDialog.open(zone.id)
            .subscribe((zoneId) => {
                if (zoneId) {
                    this.editRow(zone.id);
                }
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
