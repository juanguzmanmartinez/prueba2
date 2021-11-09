import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpDrugstoresHomeDrugstoreDetailDialogComponent } from './op-drugstores-home-drugstore-detail-dialog.component';
import { Drugstore } from '../../../../models/operations-drugstores.model';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpDrugstoresHomeDrugstoreDetailDialogService {

    constructor(
        private _dialog: DialogService,
    ) {
    }

    open(drugstore: Drugstore): MatDialogRef<OpDrugstoresHomeDrugstoreDetailDialogComponent> {
        const dialogRef = this._dialog.open(OpDrugstoresHomeDrugstoreDetailDialogComponent);
        dialogRef.componentInstance.drugstore = drugstore;
        return dialogRef;
    }

}
