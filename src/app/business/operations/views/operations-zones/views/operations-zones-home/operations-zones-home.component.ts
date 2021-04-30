import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { Zone } from '../../modals/operation-zones-responses.modal';
import { OpZonesHomeZoneDetailDialogService } from './components/op-zones-home-zone-detail-dialog/op-zones-home-zone-detail-dialog.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CDeliveryServiceTypeName } from '@models/capacities/capacities-service-type.model';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';

@Component({
    selector: 'app-operations-zones-home',
    templateUrl: './operations-zones-home.component.html',
    styleUrls: ['./operations-zones-home.component.sass'],
    providers: [OpZonesHomeZoneDetailDialogService]
})
export class OperationsZonesHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;

    public searchInput = '';

    displayedColumns: string[] = ['selector', 'zoneCode', 'zoneName', 'assignedStore', 'serviceType', 'zoneState', 'actions'];
    dataSource = new MatTableDataSource([]);
    rowSelection = new SelectionModel<Zone>(true, []);

    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _storeDetailDialog: OpZonesHomeZoneDetailDialogService,
        private _operationsZonesImplement: OperationsZonesImplementService
    ) {
    }

    ngOnInit() {
        this._operationsZonesImplement.zoneList
            .subscribe((zoneList: Array<Zone>) => {
                this.dataSource.data = zoneList;
                this.setDataSourceService();
            });
    }

    setDataSourceService() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator.paginator;
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


    editRow(zoneId: string) {
        this._router.navigate([CONCAT_PATH.opZones_ZoneId(zoneId)]);
    }

    rowDetailDialog(store: Zone) {
        const subscription = this._storeDetailDialog.openHomeZoneDetailDialog(store)
            .afterClosed()
            .subscribe((editService) => {
                if (editService) {
                    this.editRow(store.code);
                }
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
