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
import { Store, StoreDetail } from '../../models/operations-stores.model';
import { normalizeValue } from '@helpers/string.helper';
import { CChannelName } from '@models/channel/channel.model';
import { CCompanyIcon, CCompanyName } from '@models/company/company.model';

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

    public displayedColumns: string[] = ['storeCode', 'storeName', 'company', 'channel', 'state', 'actions'];
    public dataSource = new MatTableDataSource([]);

    @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

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
            }, () => {
                this.storesHomeLoader = false;
            });
    }

    setDataSourceService() {
        this.dataSource.sortingDataAccessor = (data: StoreDetail, sortHeaderId: string) => {
            switch (sortHeaderId) {
                case 'storeCode':
                    return data.code;
                case 'storeName':
                    return data.name;
                case 'company':
                    return data.companyList.join('');
                case 'channel':
                    return data.channelList.join('');
                default:
                    return data[sortHeaderId];
            }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator.paginator;
        this.dataSource.filterPredicate = (data: Store, filter: string) => {
            const filterNormalize = normalizeValue(filter);
            const idNormalize = normalizeValue(data.code);
            const nameNormalize = normalizeValue(data.name);
            const companyNormalize = normalizeValue(data.companyList.map(company => this.companyName[company]).join(''));
            const channelNormalize = normalizeValue(data.channelList.join(''));
            const stateNormalize = normalizeValue(this.stateName[data.state]());
            const valueArray = [idNormalize, nameNormalize, companyNormalize, channelNormalize, stateNormalize];

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


    editRow(storeCode: string) {
        this._router.navigate([ROUTER_PATH.opStores_StoreId(storeCode)]);
    }

    rowDetailDialog(store: Store) {
        const subscription = this._storeDetailDialog.open(store.code)
            .subscribe((storeId: boolean) => {
                if (storeId) {
                    this.editRow(store.code);
                }
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
