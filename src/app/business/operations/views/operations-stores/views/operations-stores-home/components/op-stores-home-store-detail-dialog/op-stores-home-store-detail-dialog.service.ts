import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpStoresHomeStoreDetailDialogComponent } from './op-stores-home-store-detail-dialog.component';
import { Store } from '../../../../models/operations-stores.model';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpStoresHomeStoreDetailDialogService {

    constructor(
        private _dialog: DialogService,
    ) {
    }

    open(store: Store): MatDialogRef<OpStoresHomeStoreDetailDialogComponent> {
        const dialogRef = this._dialog.open(OpStoresHomeStoreDetailDialogComponent);
        dialogRef.componentInstance.store = store;
        return dialogRef;
    }

}
