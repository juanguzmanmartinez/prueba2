import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OpStoresHomeStoreDetailDialogService } from './components/op-stores-home-store-detail-dialog/op-stores-home-store-detail-dialog.service';
import { IStore, STORES_LIST } from '../../models/operation-stores-responses.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

@Component({
    selector: 'app-operations-stores-home',
    templateUrl: './operations-stores-home.component.html',
    styleUrls: ['./operations-stores-home.component.scss'],
    providers: [OpStoresHomeStoreDetailDialogService]
})
export class OperationsStoresHomeComponent implements AfterViewInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    constructor(
        private _storeDetailDialog: OpStoresHomeStoreDetailDialogService,
        private _router: Router,
    ) {
    }

    displayedColumns: string[] = ['store', 'name', 'brand', 'channel', 'status', 'actions'];
    dataSource = new MatTableDataSource(STORES_LIST);

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }


    editStore(storeId: string) {
        this._router.navigate([CONCAT_PATH.opStores_StoreId(storeId)]);
    }

    storeDetailDialog(store: IStore) {
        const subscription = this._storeDetailDialog.openServiceHomeStoreDetailDialog(store)
            .afterClosed()
            .subscribe((editService) => {
                if (editService) {
                    this.editStore(store.store);
                }
            });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
