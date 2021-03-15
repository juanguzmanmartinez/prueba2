import { Injectable, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpStoresHomeStoreDetailDialogComponent } from './op-stores-home-store-detail-dialog.component';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { DialogService } from '@molecules/dialog/dialog.service';
import { DialogLoaderService } from '@molecules/dialog/views/dialog-loader/dialog-loader.service';
import { OperationsStoresImplementService } from '../../../../implements/operations-stores-implement.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class OpStoresHomeStoreDetailDialogService implements OnDestroy {
    private dialogDetailRef: MatDialogRef<OpStoresHomeStoreDetailDialogComponent>;
    private dialogLoaderRef: MatDialogRef<any>;
    private dialogStoreDetailSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private dialog: DialogService,
        private _dialogLoader: DialogLoaderService,
        private _operationsStoresImplement: OperationsStoresImplementService
    ) {
    }

    open(storeCode: string): Observable<boolean> {
        this.openDialogLoader();
        this.getStoreDetail(storeCode);
        return this.dialogStoreDetailSubject.asObservable();
    }

    openDialogStoreDetail(storeDetail: StoreDetail) {
        this.dialogDetailRef = this.dialog.open(OpStoresHomeStoreDetailDialogComponent);
        this.dialogDetailRef.componentInstance.storeDetail = storeDetail;
        this.dialogDetailRef.afterClosed()
            .pipe(take(1))
            .subscribe((closeResult: boolean) => {
                this.dialogStoreDetailSubject.next(closeResult);
            });
    }

    openDialogLoader(): void {
        this.dialogLoaderRef = this._dialogLoader.open();
    }

    getStoreDetail(storeCode: string) {
        this._operationsStoresImplement.getStoreDetail(storeCode)
            .subscribe((storeDetail: StoreDetail) => {
                this.openDialogStoreDetail(storeDetail);
                this.dialogLoaderRef.close();
            });
    }

    ngOnDestroy() {
        if (this.dialogLoaderRef) {
            this.dialogLoaderRef.close();
        }
        if (this.dialogDetailRef) {
            this.dialogDetailRef.close();
        }
        this.dialogStoreDetailSubject.complete();
    }
}
