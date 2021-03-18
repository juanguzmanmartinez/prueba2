import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpStoresStoreDetailDialogComponent } from './op-stores-store-detail-dialog.component';
import { IStore } from '../../modals/operation-stores-responses.modal';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpStoresStoreDetailDialogService {

    constructor(private dialog: DialogService) {
    }

    openServiceStoreDetailDialog(store: IStore): MatDialogRef<OpStoresStoreDetailDialogComponent> {
        const dialogRef = this.dialog.open(OpStoresStoreDetailDialogComponent);

        dialogRef.componentInstance.store = store;
        return dialogRef;
    }
}
