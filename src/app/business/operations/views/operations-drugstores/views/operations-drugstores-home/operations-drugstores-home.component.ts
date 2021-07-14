import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OpDrugstoresHomeDrugstoreDetailDialogService } from './components/op-drugstores-home-drugstore-detail-dialog/op-drugstores-home-drugstore-detail-dialog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { OperationsDrugstoresImplementService } from '../../implements/operations-drugstores-implement.service';
import { Drugstore } from '../../models/operations-drugstores.model';
import { normalizeValue } from '@helpers/string.helper';
import { CChannelName } from '@models/channel/channel.model';
import { CCompanyIcon, CCompanyName } from '@models/company/company.model';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { exportCSVFile } from '@helpers/json-to-csv';
import { ExportDrugstoreList, ExportStoreListFileName, ExportStoreListHeader } from '../../models/operations-drugstores-export-data.model';
import { SortAlphanumeric, SortString } from '@helpers/sort.helper';

const ColumnNameList = {
    selector: 'selector',
    code: 'drugstoreCode',
    name: 'drugstoreName',
    company: 'drugstoreCompany',
    channel: 'drugstoreChannel',
    state: 'drugstoreState',
    actions: 'actions',
};

@Component({
    selector: 'app-operations-drugstores-home',
    templateUrl: './operations-drugstores-home.component.html',
    styleUrls: ['./operations-drugstores-home.component.scss'],
    providers: [OpDrugstoresHomeDrugstoreDetailDialogService]
})
export class OperationsDrugstoresHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public channelName = CChannelName;
    public companyIcon = CCompanyIcon;
    public companyName = CCompanyName;

    public searchInput = '';
    public drugstoresHomeLoader = true;
    public errorResponse: HttpErrorResponse;

    public columnNameList = ColumnNameList;
    public displayedColumns: string[] = [
        ColumnNameList.selector, ColumnNameList.code, ColumnNameList.name,
        ColumnNameList.company, ColumnNameList.channel, ColumnNameList.state, ColumnNameList.actions];
    public dataSource = new MatTableDataSource([]);
    public rowSelection = new SelectionModel<Drugstore>(true, []);

    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _drugstoreDetailDialog: OpDrugstoresHomeDrugstoreDetailDialogService,
        private _operationsDrugstoresImplement: OperationsDrugstoresImplementService
    ) {
    }

    ngOnInit() {
        this._operationsDrugstoresImplement.drugstoreList
            .subscribe((drugstoreList: Drugstore[]) => {
                this.drugstoresHomeLoader = false;
                this.dataSource.data = drugstoreList;
                this.setDataSourceService();
            }, (error) => {
                this.drugstoresHomeLoader = false;
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
        this.dataSource.filterPredicate = (data: Drugstore, filter: string) => {
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

        this.dataSource.sortData = (data: Drugstore[], sort: MatSort) => {
            return data.sort((a: Drugstore, b: Drugstore) => {
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
        const dataToExport = new ExportDrugstoreList(this.rowSelection.selected);
        exportCSVFile(dataToExport.data, ExportStoreListHeader, ExportStoreListFileName);
    }


    editRow(drugstoreCode: string) {
        this._router.navigate([ROUTER_PATH.opDrugstores_Drugstore(drugstoreCode)]);
    }

    editZoneRow(zoneCode: string) {
        this._router.navigate([ROUTER_PATH.opZones_Zone(zoneCode)]);
    }

    rowDetailDialog(drugstore: Drugstore) {
        const subscription = this._drugstoreDetailDialog.open(drugstore)
            .afterClosed()
            .subscribe((edition: boolean | string) => {
                if (typeof edition === 'boolean' && edition) {
                    this.editRow(drugstore.code);
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
