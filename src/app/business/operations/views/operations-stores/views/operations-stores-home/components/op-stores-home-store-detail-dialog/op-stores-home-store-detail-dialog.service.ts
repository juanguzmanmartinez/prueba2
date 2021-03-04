import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpStoresHomeStoreDetailDialogComponent } from './op-stores-home-store-detail-dialog.component';
import { IStore } from '../../../../models/operation-stores-responses.model';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpStoresHomeStoreDetailDialogService {

    constructor(private dialog: DialogService) {
    }

    openServiceHomeStoreDetailDialog(store: IStore): MatDialogRef<OpStoresHomeStoreDetailDialogComponent> {
        const dialogRef = this.dialog.open(OpStoresHomeStoreDetailDialogComponent);

        dialogRef.componentInstance.store = store;
        return dialogRef;
    }
}
