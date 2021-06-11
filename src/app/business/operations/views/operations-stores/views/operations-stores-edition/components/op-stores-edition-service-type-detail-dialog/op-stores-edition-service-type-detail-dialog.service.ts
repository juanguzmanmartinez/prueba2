import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OpStoresEditionServiceTypeDetailDialogComponent } from './op-stores-edition-service-type-detail-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class OpStoresEditionServiceTypeDetailDialogService {
    constructor(
        private _dialog: DialogService,
    ) {
    }

    open(splitSegmentList: string[]): MatDialogRef<OpStoresEditionServiceTypeDetailDialogComponent> {
        const dialogRef = this._dialog.open(OpStoresEditionServiceTypeDetailDialogComponent);
        dialogRef.componentInstance.splitSegmentList = splitSegmentList;

        return dialogRef;
    }
}
