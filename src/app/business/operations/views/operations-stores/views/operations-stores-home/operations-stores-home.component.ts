import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OpStoresHomeStoreDetailDialogService } from './components/op-stores-home-store-detail-dialog/op-stores-home-store-detail-dialog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { OperationsStoresImplementService } from '../../implements/operations-stores-implement.service';
import { Store } from '../../models/operations-stores.model';
import { normalizeValue } from '@helpers/string.helper';
import { CChannelName } from '@models/channel/channel.model';
import { CCompanyIcon, CCompanyName } from '@models/company/company.model';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { exportCSVFile } from '@helpers/json-to-csv';
import { ExportStoreList, ExportStoreListFileName, ExportStoreListHeader } from '../../models/operations-stores-export-data.model';
import { SortAlphanumeric, SortString } from '@helpers/sort.helper';

const ColumnNameList = {
    selector: 'selector',
    code: 'storeCode',
    name: 'storeName',
    company: 'storeCompany',
    channel: 'storeChannel',
    state: 'storeState',
    actions: 'actions',
};

@Component({
    selector: 'app-operations-stores-home',
    templateUrl: './operations-stores-home.component.html',
    styleUrls: ['./operations-stores-home.component.scss'],
    providers: [OpStoresHomeStoreDetailDialogService]
})
export class OperationsStoresHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public channelName = CChannelName;
    public companyIcon = CCompanyIcon;
    public companyName = CCompanyName;

    public searchInput = '';
    public storesHomeLoader = true;
    public errorResponse: HttpErrorResponse;

    public columnNameList = ColumnNameList;
    public displayedColumns: string[] = [
        ColumnNameList.selector, ColumnNameList.code, ColumnNameList.name,
        ColumnNameList.company, ColumnNameList.channel, ColumnNameList.state, ColumnNameList.actions];
    public dataSource = new MatTableDataSource([]);
    public rowSelection = new SelectionModel<Store>(true, []);

    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _storeDetailDialog: OpStoresHomeStoreDetailDialogService,
        private _operationsStoresImplement: OperationsStoresImplementService
    ) {
    }

    ngOnInit() {
        this._operationsStoresImplement.storeList
            .subscribe((storeList: Store[]) => {
                this.storesHomeLoader = false;
                this.dataSource.data = storeList;
                this.setDataSourceService();
            }, (error) => {
                this.storesHomeLoader = false;
                this.errorResponse = error;
            });
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

    setDataSourceService() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator.paginator;
        this.dataSource.filterPredicate = (data: Store, filter: string) => {
            const filterNormalize = normalizeValue(filter);
            const idNormalize = normalizeValue(data.code);
            const nameNormalize = normalizeValue(data.name);
            const companyNormalize = normalizeValue(data.companyList.map(company => this.companyName[company]).join(''));
            const channelNormalize = normalizeValue(data.channelList.map(channel => this.channelName[channel]).join(''));
            const stateNormalize = normalizeValue(this.stateName[data.state]());
            const valueArray = [idNormalize, nameNormalize, companyNormalize, channelNormalize, stateNormalize];

            const concatValue = normalizeValue(valueArray.join(''));
            const everyValue = valueArray.some(value => value.includes(filterNormalize));
            return concatValue.includes(filterNormalize) && everyValue;
        };

        this.dataSource.sortData = (data: Store[], sort: MatSort) => {
            return data.sort((a: Store, b: Store) => {
                switch (sort.active) {
                    case ColumnNameList.code:
                        return SortAlphanumeric(a.code, b.code, sort.direction);
                    case ColumnNameList.name:
                        return SortAlphanumeric(a.name, b.name, sort.direction);
                    case ColumnNameList.company:
                        const companyListNameA = a.companyList
                            .map(company => this.companyName[company]).join('');
                        const companyListNameB = b.companyList
                            .map(company => this.companyName[company]).join('');
                        return SortString(companyListNameA, companyListNameB, sort.direction);
                    case ColumnNameList.channel:
                        const channelListNameA = a.channelList
                            .map(channel => this.channelName[channel]).join('');
                        const channelListNameB = b.channelList
                            .map(channel => this.channelName[channel]).join('');
                        return SortString(channelListNameA, channelListNameB, sort.direction);
                    case ColumnNameList.state:
                        const stateNameA = this.stateName[a.state]();
                        const stateNameB = this.stateName[b.state]();
                        return SortString(stateNameA, stateNameB, sort.direction);
                    default:
                        const defaultA = a[sort.active];
                        const defaultB = b[sort.active];
                        return SortAlphanumeric(defaultA, defaultB, sort.direction);
                }
            });
        };
    }

    filterBySearchInput() {
        this.dataSource.filter = this.searchInput.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    saveSelectedDataInCsv() {
        const dataToExport = new ExportStoreList(this.rowSelection.selected);
        exportCSVFile(dataToExport.data, ExportStoreListHeader, ExportStoreListFileName);
    }


    editRow(storeCode: string) {
        this._router.navigate([ROUTER_PATH.opStores_Store(storeCode)]);
    }

    editZoneRow(zoneCode: string) {
        this._router.navigate([ROUTER_PATH.opZones_Zone(zoneCode)]);
    }

    rowDetailDialog(store: Store) {
        const subscription = this._storeDetailDialog.open(store)
            .afterClosed()
            .subscribe((edition: boolean | string) => {
                if (typeof edition === 'boolean' && edition) {
                    this.editRow(store.code);
                } else if (typeof edition === 'string' && edition) {
                    this.editZoneRow(edition);
                }
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
